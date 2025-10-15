/**
 * OpenAI Realtime API Type Definitions
 * @see https://platform.openai.com/docs/guides/realtime
 */

// ============================================================================
// Session Configuration
// ============================================================================

export interface RealtimeSessionConfig {
  model: 'gpt-4o-realtime-preview-2024-10-01';
  modalities: ('text' | 'audio')[];
  instructions: string;
  voice: 'alloy' | 'echo' | 'shimmer';
  input_audio_format: 'pcm16' | 'g711_ulaw' | 'g711_alaw';
  output_audio_format: 'pcm16' | 'g711_ulaw' | 'g711_alaw';
  input_audio_transcription?: {
    model: 'whisper-1';
  };
  turn_detection?: {
    type: 'server_vad';
    threshold?: number;
    prefix_padding_ms?: number;
    silence_duration_ms?: number;
  } | null;
  tools?: RealtimeTool[];
  tool_choice?: 'auto' | 'none' | 'required' | { type: 'function'; name: string };
  temperature?: number;
  max_response_output_tokens?: number | 'inf';
}

export interface RealtimeTool {
  type: 'function';
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

// ============================================================================
// WebSocket Events (Client → Server)
// ============================================================================

export type RealtimeClientEvent =
  | SessionUpdateEvent
  | InputAudioBufferAppendEvent
  | InputAudioBufferCommitEvent
  | InputAudioBufferClearEvent
  | ConversationItemCreateEvent
  | ConversationItemTruncateEvent
  | ConversationItemDeleteEvent
  | ResponseCreateEvent
  | ResponseCancelEvent;

export interface SessionUpdateEvent {
  type: 'session.update';
  session: Partial<RealtimeSessionConfig>;
}

export interface InputAudioBufferAppendEvent {
  type: 'input_audio_buffer.append';
  audio: string; // base64 encoded audio
}

export interface InputAudioBufferCommitEvent {
  type: 'input_audio_buffer.commit';
}

export interface InputAudioBufferClearEvent {
  type: 'input_audio_buffer.clear';
}

export interface ConversationItemCreateEvent {
  type: 'conversation.item.create';
  item: ConversationItem;
}

export interface ConversationItemTruncateEvent {
  type: 'conversation.item.truncate';
  item_id: string;
  content_index: number;
  audio_end_ms: number;
}

export interface ConversationItemDeleteEvent {
  type: 'conversation.item.delete';
  item_id: string;
}

export interface ResponseCreateEvent {
  type: 'response.create';
  response?: {
    modalities?: ('text' | 'audio')[];
    instructions?: string;
    voice?: 'alloy' | 'echo' | 'shimmer';
    output_audio_format?: 'pcm16' | 'g711_ulaw' | 'g711_alaw';
    tools?: RealtimeTool[];
    tool_choice?: string;
    temperature?: number;
    max_output_tokens?: number | 'inf';
  };
}

export interface ResponseCancelEvent {
  type: 'response.cancel';
}

// ============================================================================
// WebSocket Events (Server → Client)
// ============================================================================

export type RealtimeServerEvent =
  | ErrorEvent
  | SessionCreatedEvent
  | SessionUpdatedEvent
  | ConversationCreatedEvent
  | InputAudioBufferCommittedEvent
  | InputAudioBufferClearedEvent
  | InputAudioBufferSpeechStartedEvent
  | InputAudioBufferSpeechStoppedEvent
  | ConversationItemCreatedEvent
  | ConversationItemInputAudioTranscriptionCompletedEvent
  | ConversationItemInputAudioTranscriptionFailedEvent
  | ConversationItemTruncatedEvent
  | ConversationItemDeletedEvent
  | ResponseCreatedEvent
  | ResponseDoneEvent
  | ResponseOutputItemAddedEvent
  | ResponseOutputItemDoneEvent
  | ResponseContentPartAddedEvent
  | ResponseContentPartDoneEvent
  | ResponseTextDeltaEvent
  | ResponseTextDoneEvent
  | ResponseAudioTranscriptDeltaEvent
  | ResponseAudioTranscriptDoneEvent
  | ResponseAudioDeltaEvent
  | ResponseAudioDoneEvent
  | ResponseFunctionCallArgumentsDeltaEvent
  | ResponseFunctionCallArgumentsDoneEvent
  | RateLimitsUpdatedEvent;

export interface ErrorEvent {
  type: 'error';
  error: {
    type: string;
    code: string;
    message: string;
    param?: string;
    event_id?: string;
  };
}

export interface SessionCreatedEvent {
  type: 'session.created';
  session: RealtimeSession;
}

export interface SessionUpdatedEvent {
  type: 'session.updated';
  session: RealtimeSession;
}

export interface ConversationCreatedEvent {
  type: 'conversation.created';
  conversation: {
    id: string;
    object: 'realtime.conversation';
  };
}

export interface InputAudioBufferCommittedEvent {
  type: 'input_audio_buffer.committed';
  previous_item_id: string;
  item_id: string;
}

export interface InputAudioBufferClearedEvent {
  type: 'input_audio_buffer.cleared';
}

export interface InputAudioBufferSpeechStartedEvent {
  type: 'input_audio_buffer.speech_started';
  audio_start_ms: number;
  item_id: string;
}

export interface InputAudioBufferSpeechStoppedEvent {
  type: 'input_audio_buffer.speech_stopped';
  audio_end_ms: number;
  item_id: string;
}

export interface ConversationItemCreatedEvent {
  type: 'conversation.item.created';
  previous_item_id: string;
  item: ConversationItem;
}

export interface ConversationItemInputAudioTranscriptionCompletedEvent {
  type: 'conversation.item.input_audio_transcription.completed';
  item_id: string;
  content_index: number;
  transcript: string;
}

export interface ConversationItemInputAudioTranscriptionFailedEvent {
  type: 'conversation.item.input_audio_transcription.failed';
  item_id: string;
  content_index: number;
  error: {
    type: string;
    code: string;
    message: string;
  };
}

export interface ConversationItemTruncatedEvent {
  type: 'conversation.item.truncated';
  item_id: string;
  content_index: number;
  audio_end_ms: number;
}

export interface ConversationItemDeletedEvent {
  type: 'conversation.item.deleted';
  item_id: string;
}

export interface ResponseCreatedEvent {
  type: 'response.created';
  response: Response;
}

export interface ResponseDoneEvent {
  type: 'response.done';
  response: Response;
}

export interface ResponseOutputItemAddedEvent {
  type: 'response.output_item.added';
  response_id: string;
  output_index: number;
  item: ConversationItem;
}

export interface ResponseOutputItemDoneEvent {
  type: 'response.output_item.done';
  response_id: string;
  output_index: number;
  item: ConversationItem;
}

export interface ResponseContentPartAddedEvent {
  type: 'response.content_part.added';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  part: ContentPart;
}

export interface ResponseContentPartDoneEvent {
  type: 'response.content_part.done';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  part: ContentPart;
}

export interface ResponseTextDeltaEvent {
  type: 'response.text.delta';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  delta: string;
}

export interface ResponseTextDoneEvent {
  type: 'response.text.done';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  text: string;
}

export interface ResponseAudioTranscriptDeltaEvent {
  type: 'response.audio_transcript.delta';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  delta: string;
}

export interface ResponseAudioTranscriptDoneEvent {
  type: 'response.audio_transcript.done';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  transcript: string;
}

export interface ResponseAudioDeltaEvent {
  type: 'response.audio.delta';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  delta: string; // base64 encoded audio chunk
}

export interface ResponseAudioDoneEvent {
  type: 'response.audio.done';
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
}

export interface ResponseFunctionCallArgumentsDeltaEvent {
  type: 'response.function_call_arguments.delta';
  response_id: string;
  item_id: string;
  output_index: number;
  call_id: string;
  delta: string;
}

export interface ResponseFunctionCallArgumentsDoneEvent {
  type: 'response.function_call_arguments.done';
  response_id: string;
  item_id: string;
  output_index: number;
  call_id: string;
  arguments: string;
}

export interface RateLimitsUpdatedEvent {
  type: 'rate_limits.updated';
  rate_limits: RateLimit[];
}

// ============================================================================
// Domain Models
// ============================================================================

export interface RealtimeSession {
  id: string;
  object: 'realtime.session';
  model: string;
  modalities: string[];
  instructions: string;
  voice: string;
  input_audio_format: string;
  output_audio_format: string;
  input_audio_transcription?: {
    model: string;
  };
  turn_detection?: {
    type: string;
    threshold?: number;
    prefix_padding_ms?: number;
    silence_duration_ms?: number;
  } | null;
  tools: RealtimeTool[];
  tool_choice: string;
  temperature: number;
  max_response_output_tokens: number | string;
}

export interface ConversationItem {
  id: string;
  object: 'realtime.item';
  type: 'message' | 'function_call' | 'function_call_output';
  status: 'completed' | 'in_progress' | 'incomplete';
  role: 'user' | 'assistant' | 'system';
  content: ContentPart[];
}

export interface ContentPart {
  type: 'input_text' | 'input_audio' | 'text' | 'audio';
  text?: string;
  audio?: string; // base64
  transcript?: string;
}

export interface Response {
  id: string;
  object: 'realtime.response';
  status: 'in_progress' | 'completed' | 'cancelled' | 'failed' | 'incomplete';
  status_details?: {
    type: string;
    reason?: string;
    error?: any;
  };
  output: ConversationItem[];
  usage?: {
    total_tokens: number;
    input_tokens: number;
    output_tokens: number;
    input_token_details?: {
      cached_tokens: number;
      text_tokens: number;
      audio_tokens: number;
    };
    output_token_details?: {
      text_tokens: number;
      audio_tokens: number;
    };
  };
}

export interface RateLimit {
  name: string;
  limit: number;
  remaining: number;
  reset_seconds: number;
}

// ============================================================================
// Service State
// ============================================================================

export interface RealtimeServiceState {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  isCapSpeaking: boolean;
  isUserSpeaking: boolean;
  error: Error | null;
  transcript: string;
  sessionId: string | null;
}

// ============================================================================
// Hooks Interface
// ============================================================================

export interface UseRealtimeVoiceReturn {
  // State
  isConnected: boolean;
  isCapSpeaking: boolean;
  isUserSpeaking: boolean;
  transcript: string;
  error: Error | null;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => void;
  interrupt: () => void;
  
  // Status
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
}
