# Voice AI Implementation Guide for Cap

## Option 1: OpenAI Realtime API (Speech-to-Speech)

### Overview
The Realtime API enables low-latency, multimodal conversational experiences with voice input/output, natural interruptions, and function calling.

### Architecture
```
User's Voice Input
      ↓
OpenAI Realtime API (WebSocket)
      ↓
GPT-4o-realtime-preview
      ↓
[Optional] Function Calls (analyzeDeal, saveLead, etc.)
      ↓
Voice Output (Natural speech)
```

### Step 1: Enable Realtime API Access
```bash
# Check access at: https://platform.openai.com/api-keys
# Realtime API requires specific model access
# Cost: $0.06/min input audio, $0.24/min output audio
```

### Step 2: Create Realtime Voice Component

```typescript
// src/components/CapVoiceChat.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function CapVoiceChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const initializeRealtimeAPI = async () => {
      // Get ephemeral token from your backend
      const response = await fetch('/api/realtime-token');
      const { token } = await response.json();

      // Connect to Realtime API
      const ws = new WebSocket(
        'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'OpenAI-Beta': 'realtime=v1'
          }
        }
      );

      ws.onopen = () => {
        console.log('Connected to Realtime API');
        setIsConnected(true);

        // Send session configuration
        ws.send(JSON.stringify({
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: `You are Cap, the Loan Companion for Capital Bridge Solutions...
            [Your full system prompt here]`,
            voice: 'alloy', // Options: alloy, echo, shimmer, ash, ballad, coral, sage, verse
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: {
              model: 'whisper-1'
            },
            turn_detection: {
              type: 'server_vad', // Voice Activity Detection
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500
            },
            tools: [
              {
                type: 'function',
                name: 'analyzeDeal',
                description: 'Analyze investment property deal',
                parameters: {
                  type: 'object',
                  properties: {
                    purchasePrice: { type: 'number' },
                    monthlyRent: { type: 'number' },
                    downPaymentPercent: { type: 'number' },
                    interestRate: { type: 'number' },
                    loanTermYears: { type: 'number' }
                  },
                  required: ['purchasePrice', 'monthlyRent', 'downPaymentPercent']
                }
              },
              {
                type: 'function',
                name: 'saveLead',
                description: 'Save investor lead to database',
                parameters: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    phone: { type: 'string' },
                    email: { type: 'string' },
                    productType: { type: 'string' }
                  },
                  required: ['name', 'phone', 'email']
                }
              }
            ]
          }
        }));
      };

      ws.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'conversation.item.created':
            if (message.item.type === 'message' && message.item.role === 'assistant') {
              setTranscript(prev => prev + '\nCap: ' + message.item.content[0].text);
            }
            break;

          case 'response.audio.delta':
            // Play audio chunk
            await playAudioChunk(message.delta);
            break;

          case 'response.function_call_arguments.done':
            // Handle function call
            await handleFunctionCall(message.name, JSON.parse(message.arguments));
            break;

          case 'input_audio_buffer.speech_started':
            console.log('User started speaking');
            break;

          case 'input_audio_buffer.speech_stopped':
            console.log('User stopped speaking');
            break;
        }
      };

      wsRef.current = ws;
    };

    initializeRealtimeAPI();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcm16 = convertFloat32ToPCM16(inputData);
          
          // Send audio to Realtime API
          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: arrayBufferToBase64(pcm16)
          }));
        }
      };

      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsRecording(false);

    // Commit audio buffer
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({
        type: 'input_audio_buffer.commit'
      }));
    }
  };

  const handleFunctionCall = async (name: string, args: any) => {
    let result;

    switch (name) {
      case 'analyzeDeal':
        const response = await fetch('/api/analyze-deal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args)
        });
        result = await response.json();
        break;

      case 'saveLead':
        const leadResponse = await fetch('/api/agent/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'saveLead',
            data: args
          })
        });
        result = await leadResponse.json();
        break;

      default:
        result = { error: 'Unknown function' };
    }

    // Send function result back
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: args.call_id,
          output: JSON.stringify(result)
        }
      }));
    }
  };

  const playAudioChunk = async (base64Audio: string) => {
    // Decode and play audio
    const audioData = base64ToArrayBuffer(base64Audio);
    const audioContext = new AudioContext({ sampleRate: 24000 });
    const audioBuffer = await audioContext.decodeAudioData(audioData);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">🎙️ Talk to Cap</h3>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>

        {/* Transcript */}
        <div className="h-64 overflow-y-auto mb-4 p-3 bg-gray-50 rounded">
          <pre className="text-sm whitespace-pre-wrap">{transcript || 'Start talking...'}</pre>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={!isConnected}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300"
            >
              🎤 Start Talking
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 animate-pulse"
            >
              ⏸️ Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Utility functions
function convertFloat32ToPCM16(float32Array: Float32Array): ArrayBuffer {
  const pcm16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return pcm16.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
```

### Step 3: Create Backend Token Endpoint

```typescript
// src/app/api/realtime-token/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Generate ephemeral token for Realtime API
    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview-2024-10-01',
        voice: 'alloy'
      })
    });

    const data = await response.json();
    
    return NextResponse.json({
      token: data.client_secret.value,
      expires_at: data.client_secret.expires_at
    });
  } catch (error) {
    console.error('Error generating realtime token:', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}
```

---

## Option 2: Web Speech API (Browser-Based)

### Overview
Use browser's built-in speech recognition and synthesis. Free, but less natural.

```typescript
// src/components/WebSpeechCapChat.tsx
'use client';

import { useState, useEffect } from 'react';

export function WebSpeechCapChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = async (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          setTranscript(transcriptText);
          
          // Send to Cap API
          const response = await fetch('/api/agent/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [{ role: 'user', content: transcriptText }]
            })
          });
          
          const data = await response.json();
          const capResponse = data.choices[0].message.content;
          
          // Speak Cap's response
          speakText(capResponse);
        }
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Find best voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English')) 
                        || voices.find(v => v.lang === 'en-US')
                        || voices[0];
    utterance.voice = preferredVoice;
    
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="voice-chat">
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? '🔴 Stop' : '🎤 Talk to Cap'}
      </button>
      <div className="transcript">{transcript}</div>
    </div>
  );
}
```

---

## Option 3: Voice AI Platforms (Phone Calls)

### A. Vapi.ai (Recommended for Voice Calls)

```typescript
// src/app/api/vapi-webhook/route.ts
import { NextResponse } from 'next/server';
import { analyzeDeal } from '@/lib/dealAnalyzer';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  
  switch (body.message.type) {
    case 'function-call':
      if (body.message.functionCall.name === 'analyzeDeal') {
        const args = body.message.functionCall.parameters;
        const result = analyzeDeal(args);
        
        return NextResponse.json({
          result: result,
          summary: `The property has a DSCR of ${result.metrics.dscr.toFixed(2)} and cash flows $${result.monthly.cashFlow}/month.`
        });
      }
      
      if (body.message.functionCall.name === 'saveLead') {
        const lead = await prisma.lead.create({
          data: body.message.functionCall.parameters
        });
        
        return NextResponse.json({
          result: { success: true, leadId: lead.id }
        });
      }
      break;
  }
  
  return NextResponse.json({ status: 'ok' });
}
```

**Vapi.ai Setup:**
1. Sign up at https://vapi.ai
2. Create assistant with Cap's personality
3. Add function tools (analyzeDeal, saveLead)
4. Get phone number
5. Configure webhook to your API

**Cost:** ~$0.05/min

---

### B. Bland.ai (AI Phone Calling)

```javascript
// Call outbound with Bland.ai
const makeOutboundCall = async (leadPhone) => {
  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.BLAND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: leadPhone,
      task: `You are Cap from Capital Bridge Solutions. The lead requested info about DSCR loans. 
             Qualify them by asking about property type, location, and loan amount. 
             If they're interested, schedule a call with a loan officer.`,
      voice: 'nat',
      model: 'enhanced',
      webhook: 'https://yourdomain.com/api/bland-webhook'
    })
  });
  
  return response.json();
};
```

---

## Comparison Table

| Feature | OpenAI Realtime | Web Speech API | Vapi.ai | Bland.ai |
|---------|----------------|----------------|---------|----------|
| **Latency** | ~300ms (Best) | ~500ms | ~400ms | ~400ms |
| **Quality** | Excellent | Good | Excellent | Excellent |
| **Cost** | $0.06-0.24/min | Free | $0.05/min | $0.09/min |
| **Function Calls** | ✅ Native | ✅ Custom | ✅ Native | ✅ Native |
| **Phone Calls** | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Interruptions** | ✅ Natural | ❌ Limited | ✅ Yes | ✅ Yes |
| **Setup Complexity** | Medium | Easy | Easy | Easy |
| **Best For** | Web/ChatGPT | Quick prototype | Inbound calls | Outbound calls |

---

## Recommended Architecture

### For Website (ChatGPT-like):
```
OpenAI Realtime API
  ↓
WebSocket Connection
  ↓
Cap's System Prompt + Tools
  ↓
Voice In → Voice Out (seamless)
```

### For Phone Calls:
```
Vapi.ai Phone Number
  ↓
Cap's Personality + Instructions
  ↓
Webhook to Your API
  ↓
Function Tools (analyzeDeal, saveLead)
  ↓
Lead Captured in Database
```

---

## Next Steps

1. **Start with OpenAI Realtime API** for web (best quality)
2. **Add Vapi.ai** for inbound phone calls
3. **Use Bland.ai** for outbound lead follow-ups

Want me to implement any of these?
