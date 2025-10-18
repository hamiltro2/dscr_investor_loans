# 🎙️ OpenAI Realtime API Implementation Guide - Part 1
## Complete Technical Documentation for Replication

**Project:** Cap - AI Loan Companion  
**Technology:** OpenAI Realtime API (Voice-to-Voice)  
**Status:** Production-Ready  

---

## 1️⃣ **OPENAI API SPECIFICATIONS**

### **Endpoint:**
```
wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01
```

### **Model:**
```typescript
MODEL = 'gpt-4o-realtime-preview-2024-10-01'
```

### **Authentication:**
```typescript
Authorization: Bearer ${OPENAI_API_KEY}
OpenAI-Beta: realtime=v1
```

### **Audio Configuration:**
```typescript
{
  turn_detection: {
    type: 'server_vad',        // Server-side Voice Activity Detection
    threshold: 0.5,
    prefix_padding_ms: 300,
    silence_duration_ms: 500
  },
  input_audio_format: 'pcm16',   // 16-bit PCM
  output_audio_format: 'pcm16',  // 16-bit PCM  
  sample_rate: 24000             // 24kHz
}
```

### **Voice Configuration:**
```typescript
{
  voice: 'alloy',                // Options: alloy, echo, shimmer
  modalities: ['text', 'audio'],
  temperature: 0.8
}
```

---

## 2️⃣ **WEBSOCKET CONNECTION CODE**

```typescript
const connectToRealtimeAPI = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const MODEL = 'gpt-4o-realtime-preview-2024-10-01';
  
  const ws = new WebSocket(
    `wss://api.openai.com/v1/realtime?model=${MODEL}`,
    ['realtime', `openai-insecure-api-key.${API_KEY}`, 'openai-beta.realtime-v1']
  );
  
  wsRef.current = ws;
  
  ws.onopen = () => {
    console.log('✅ Connected');
    setIsConnected(true);
    
    // Configure session
    ws.send(JSON.stringify({
      type: 'session.update',
      session: {
        modalities: ['text', 'audio'],
        instructions: SYSTEM_PROMPT,
        voice: 'alloy',
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500
        },
        tools: TOOLS_SCHEMA,
        temperature: 0.8
      }
    }));
  };
  
  ws.onmessage = async (event) => {
    const message = JSON.parse(event.data);
    await handleRealtimeMessage(message);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    setError('Connection error');
  };
};
```

---

## 3️⃣ **MICROPHONE AUDIO CAPTURE**

```typescript
const startRecording = async () => {
  // Request microphone
  const stream = await navigator.mediaDevices.getUserMedia({ 
    audio: {
      channelCount: 1,
      sampleRate: 24000,
      echoCancellation: true,
      noiseSuppression: true
    } 
  });
  
  mediaStreamRef.current = stream;
  
  // Create audio context
  const audioContext = new AudioContext({ sampleRate: 24000 });
  audioContextRef.current = audioContext;
  
  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(4096, 1, 1);
  
  processor.onaudioprocess = (e) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const inputData = e.inputBuffer.getChannelData(0);
      
      // Convert Float32 to Int16 (PCM16)
      const pcm16 = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) {
        const s = Math.max(-1, Math.min(1, inputData[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      
      // Convert to base64
      const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
      
      // Send to OpenAI
      wsRef.current.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: base64
      }));
    }
  };
  
  source.connect(processor);
  processor.connect(audioContext.destination);
  
  setIsRecording(true);
};
```

---

## 4️⃣ **AUDIO PLAYBACK**

```typescript
const playAudioChunk = async (base64Audio: string) => {
  if (!base64Audio) return;
  
  // Create/reuse audio context
  if (!playbackContextRef.current) {
    playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
    nextPlayTimeRef.current = playbackContextRef.current.currentTime;
  }
  
  const audioContext = playbackContextRef.current;
  
  // Decode base64 to PCM
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Convert PCM16 to Float32
  const pcm16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(pcm16.length);
  for (let i = 0; i < pcm16.length; i++) {
    float32[i] = pcm16[i] / 32768.0;
  }
  
  // Create audio buffer
  const audioBuffer = audioContext.createBuffer(1, float32.length, 24000);
  audioBuffer.getChannelData(0).set(float32);
  
  // Schedule playback
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  
  // Track source
  audioSourcesRef.current.push(source);
  
  // Auto-cleanup
  source.onended = () => {
    const index = audioSourcesRef.current.indexOf(source);
    if (index > -1) audioSourcesRef.current.splice(index, 1);
  };
  
  // Catch up if behind
  const now = audioContext.currentTime;
  if (nextPlayTimeRef.current < now) {
    nextPlayTimeRef.current = now;
  }
  
  source.start(nextPlayTimeRef.current);
  nextPlayTimeRef.current += audioBuffer.duration;
};
```

---

## 5️⃣ **INTERRUPTION HANDLING**

```typescript
const stopAllAudio = () => {
  // Stop all playing audio
  audioSourcesRef.current.forEach(source => {
    try {
      source.stop();
      source.disconnect();
    } catch (error) {
      // Already stopped
    }
  });
  
  audioSourcesRef.current = [];
  
  if (playbackContextRef.current) {
    nextPlayTimeRef.current = playbackContextRef.current.currentTime;
  }
};

// When user speaks (interruption):
case 'input_audio_buffer.speech_started':
  stopAllAudio();
  setIsSpeaking(false);
  
  // Only cancel if response is active
  if (activeResponseRef.current && wsRef.current) {
    wsRef.current.send(JSON.stringify({ type: 'response.cancel' }));
    activeResponseRef.current = false;
  }
  
  setIsRecording(true);
  break;
```

---

## 6️⃣ **SYSTEM PROMPT**

```typescript
const SYSTEM_PROMPT = `You are Cap, an AI loan companion for Capital Bridge Solutions.

Personality:
- Professional yet friendly
- Knowledgeable about real estate
- Natural speaking style

Capabilities:
1. Analyze property deals
2. Search knowledge base
3. Research market data
4. Qualify and save leads
5. Score leads and generate offers
6. Schedule calls

Keep responses under 3 sentences unless providing analysis.`;
```

---

## 📄 **See Part 2 for:**
- Tool/Function schemas
- Message handling
- Error handling
- Best practices
- Replication checklist
