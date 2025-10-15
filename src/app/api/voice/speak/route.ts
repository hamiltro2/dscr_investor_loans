/**
 * Voice Synthesis API
 * Converts text to speech using OpenAI TTS
 * 
 * Default voice: 'echo' - Natural, conversational male voice
 * Options: 'alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'
 */

import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'echo' } = await req.json();

    if (!text || typeof text !== 'string') {
      return Response.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    // Limit text length to prevent abuse (max ~4000 chars)
    const truncatedText = text.slice(0, 4000);

    // Generate speech using TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
      input: truncatedText,
      speed: 1.0,
    });

    // Convert to buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new Response(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return Response.json(
      { 
        error: 'Failed to generate speech',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const maxDuration = 30; // 30 seconds max
