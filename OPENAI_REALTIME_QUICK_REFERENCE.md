# ⚡ OpenAI Realtime API - Quick Reference Guide

**Copy-paste code snippets for rapid implementation**

---

## 🔧 **ESSENTIAL SPECIFICATIONS**

```typescript
// API Details
ENDPOINT: wss://api.openai.com/v1/realtime
MODEL: gpt-4o-realtime-preview-2024-10-01
AUDIO_FORMAT: pcm16
SAMPLE_RATE: 24000
CHANNELS: 1 (mono)
BIT_DEPTH: 16
```

---

## 🎯 **MINIMAL WORKING EXAMPLE**

```typescript
'use client';
import { useState, useRef } from 'react';

export function VoiceChat() {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  
  const connect = async () => {
    const ws = new WebSocket(
      `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01`,
      ['realtime', `openai-insecure-api-key.${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, 'openai-beta.realtime-v1']
    );
    
    wsRef.current = ws;
    
    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: 'session.update',
        session: {
          modalities: ['text', 'audio'],
          voice: 'alloy',
          input_audio_format: 'pcm16',
          output_audio_format: 'pcm16',
          turn_detection: { type: 'server_vad' }
        }
      }));
    };
    
    ws.onmessage = async (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'response.audio.delta' && msg.delta) {
        await playAudio(msg.delta);
      }
    };
  };
  
  const playAudio = async (base64: string) => {
    if (!playbackContextRef.current) {
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }
    
    const ctx = playbackContextRef.current;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    
    const pcm16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768.0;
    
    const buffer = ctx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    
    if (nextPlayTimeRef.current < ctx.currentTime) {
      nextPlayTimeRef.current = ctx.currentTime;
    }
    
    source.start(nextPlayTimeRef.current);
    nextPlayTimeRef.current += buffer.duration;
  };
  
  return (
    <button onClick={connect} disabled={isConnected}>
      {isConnected ? 'Connected' : 'Connect'}
    </button>
  );
}
```

---

## 🎤 **MICROPHONE CAPTURE**

```typescript
const startMicrophone = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ 
    audio: { channelCount: 1, sampleRate: 24000 } 
  });
  
  const ctx = new AudioContext({ sampleRate: 24000 });
  const source = ctx.createMediaStreamSource(stream);
  const processor = ctx.createScriptProcessor(4096, 1, 1);
  
  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0);
    const pcm16 = new Int16Array(input.length);
    
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
    
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: base64
      }));
    }
  };
  
  source.connect(processor);
  processor.connect(ctx.destination);
};
```

---

## 🛠️ **FUNCTION CALLING**

```typescript
// Add to session.update
tools: [
  {
    type: 'function',
    name: 'searchDatabase',
    description: 'Search your database',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' }
      },
      required: ['query']
    }
  }
]

// Handle function calls
case 'response.function_call_arguments.done':
  const args = JSON.parse(message.arguments);
  const result = await executeFunction(message.name, args);
  
  wsRef.current.send(JSON.stringify({
    type: 'conversation.item.create',
    item: {
      type: 'function_call_output',
      call_id: message.call_id,
      output: JSON.stringify(result)
    }
  }));
  
  wsRef.current.send(JSON.stringify({ type: 'response.create' }));
  break;
```

---

## 🔄 **INTERRUPTION HANDLING**

```typescript
const audioSourcesRef = useRef<AudioBufferSourceNode[]>([]);
const activeResponseRef = useRef<boolean>(false);

const stopAllAudio = () => {
  audioSourcesRef.current.forEach(source => {
    try { source.stop(); source.disconnect(); } catch {}
  });
  audioSourcesRef.current = [];
};

// In message handler:
case 'input_audio_buffer.speech_started':
  stopAllAudio();
  if (activeResponseRef.current && wsRef.current) {
    wsRef.current.send(JSON.stringify({ type: 'response.cancel' }));
    activeResponseRef.current = false;
  }
  break;

case 'response.created':
  activeResponseRef.current = true;
  stopAllAudio();
  break;

case 'response.done':
case 'response.cancelled':
  activeResponseRef.current = false;
  break;
```

---

## 📝 **SYSTEM PROMPT TEMPLATE**

```typescript
const SYSTEM_PROMPT = `You are [NAME], an AI assistant for [COMPANY].

Personality:
- [Trait 1]
- [Trait 2]
- Natural speaking style (use contractions, be concise)

Capabilities:
1. [Capability 1]
2. [Capability 2]
3. [Capability 3]

Instructions:
- Keep responses under 3 sentences unless providing detailed analysis
- Use tools when appropriate
- Be helpful and solution-oriented

[Industry-specific context]`;
```

---

## 🎧 **AUDIO PLAYBACK (With Source Tracking)**

```typescript
const playAudioChunk = async (base64Audio: string) => {
  if (!playbackContextRef.current) {
    playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
    nextPlayTimeRef.current = playbackContextRef.current.currentTime;
  }
  
  const ctx = playbackContextRef.current;
  
  // Decode
  const binary = atob(base64Audio);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  
  // Convert PCM16 to Float32
  const pcm16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(pcm16.length);
  for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768.0;
  
  // Create buffer
  const buffer = ctx.createBuffer(1, float32.length, 24000);
  buffer.getChannelData(0).set(float32);
  
  // Create and track source
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  
  audioSourcesRef.current.push(source);
  source.onended = () => {
    const idx = audioSourcesRef.current.indexOf(source);
    if (idx > -1) audioSourcesRef.current.splice(idx, 1);
  };
  
  // Schedule
  const now = ctx.currentTime;
  if (nextPlayTimeRef.current < now) nextPlayTimeRef.current = now;
  
  source.start(nextPlayTimeRef.current);
  nextPlayTimeRef.current += buffer.duration;
};
```

---

## ⚠️ **ERROR HANDLING**

```typescript
case 'error':
  const errorCode = message.error?.code;
  
  // Suppress benign errors
  if (errorCode === 'response_cancel_not_active' || 
      errorCode === 'conversation_already_has_active_response') {
    console.log('⚠️ Benign error (expected)');
    break;
  }
  
  // Real errors
  console.error('API error:', message.error);
  setError(message.error?.message || 'Connection error');
  break;
```

---

## 📊 **COMPLETE EVENT TYPES**

```typescript
// Session
'session.created'
'session.updated'

// Input Audio
'input_audio_buffer.speech_started'
'input_audio_buffer.speech_stopped'
'input_audio_buffer.committed'

// Response
'response.created'
'response.done'
'response.cancelled'
'response.audio.delta'          // Audio chunks
'response.audio_transcript.delta'
'response.text.delta'           // Text transcript

// Function Calls
'response.function_call_arguments.done'

// Conversation
'conversation.item.created'
'conversation.item.added'
'conversation.item.done'

// Errors
'error'
'rate_limits.updated'
```

---

## 🚀 **SESSION CONFIGURATION**

```typescript
ws.send(JSON.stringify({
  type: 'session.update',
  session: {
    modalities: ['text', 'audio'],
    instructions: SYSTEM_PROMPT,
    voice: 'alloy',  // or 'echo', 'shimmer'
    input_audio_format: 'pcm16',
    output_audio_format: 'pcm16',
    input_audio_transcription: { model: 'whisper-1' },  // Optional
    turn_detection: {
      type: 'server_vad',
      threshold: 0.5,
      prefix_padding_ms: 300,
      silence_duration_ms: 500
    },
    tools: TOOLS_ARRAY,
    tool_choice: 'auto',  // or 'none', 'required', or specific tool
    temperature: 0.8,
    max_response_output_tokens: 4096
  }
}));
```

---

## 💾 **ENVIRONMENT VARIABLES**

```bash
# .env.local
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-...
```

---

## 📦 **NPM PACKAGES**

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0"
  }
}
```

*Note: No additional packages needed for basic implementation!*

---

## 🌐 **BROWSER COMPATIBILITY**

```
✅ Chrome 80+
✅ Edge 80+
✅ Safari 14+
⚠️ Firefox (limited)
❌ IE (not supported)
```

---

## 🎯 **KEY SUCCESS FACTORS**

1. **Use `server_vad`** - Don't implement client-side VAD
2. **Track audio sources** - Essential for interruptions
3. **Track response state** - Prevent unnecessary cancellations
4. **Schedule audio** - Use `nextPlayTimeRef` for seamless playback
5. **Separate contexts** - One for input, one for output
6. **Keep prompts short** - Under 500 words
7. **Suppress benign errors** - Race conditions are normal

---

## ⚡ **PERFORMANCE TIPS**

```typescript
// Reuse contexts
if (!playbackContextRef.current) {
  playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
}

// Batch audio processing
const processor = audioContext.createScriptProcessor(4096, 1, 1);

// Clean up
source.onended = () => {
  audioSourcesRef.current.splice(index, 1);
};
```

---

## 📞 **TESTING CHECKLIST**

- [ ] WebSocket connects successfully
- [ ] Microphone captures audio
- [ ] Audio plays back smoothly
- [ ] Interruptions work cleanly
- [ ] No console errors
- [ ] Function calls execute
- [ ] Mobile works
- [ ] Error recovery works

---

## 🔗 **USEFUL LINKS**

- Realtime API Docs: https://platform.openai.com/docs/guides/realtime
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- GitHub Example: https://github.com/openai/openai-realtime-console

---

**Copy these snippets and adapt to your use case. This is production-tested code.** ✅
