/**
 * Real-time Audio Player
 * 
 * Handles smooth playback of PCM16 audio chunks from OpenAI Realtime API.
 * Implements buffering and scheduling to prevent audio gaps and stuttering.
 * 
 * Features:
 * - Jitter buffer for network variations
 * - Precise scheduling using AudioContext currentTime
 * - Automatic buffer management and cleanup
 * - Volume control and muting
 */

const SAMPLE_RATE = 24000; // Hz (OpenAI Realtime API output)
const BUFFER_SIZE = 4096; // Samples per chunk
const MIN_BUFFER_MS = 100; // Minimum buffer before playback starts

export class AudioPlayer {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private nextPlayTime = 0;
  private isPlaying = false;
  private volume = 1.0;
  private isMuted = false;

  constructor() {
    // Don't initialize in constructor - wait for browser environment
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  private initialize(): void {
    // Skip if already initialized or not in browser
    if (this.audioContext || typeof window === 'undefined') {
      return;
    }

    try {
      this.audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = this.volume;
      
      console.log('[AudioPlayer] Initialized with sample rate:', SAMPLE_RATE);
    } catch (error) {
      console.error('[AudioPlayer] Failed to initialize:', error);
      throw error;
    }
  }

  // ==========================================================================
  // Playback Control
  // ==========================================================================

  /**
   * Play PCM16 audio chunk
   */
  play(pcm16Data: Int16Array): void {
    // Ensure initialized (lazy initialization for browser)
    this.initialize();

    if (!this.audioContext || !this.gainNode) {
      console.error('[AudioPlayer] Not initialized');
      return;
    }

    if (this.isMuted) {
      return; // Skip playback when muted
    }

    // Resume audio context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Convert Int16 PCM to Float32 for Web Audio API
    const float32Data = this.pcm16ToFloat32(pcm16Data);

    // Create audio buffer
    const audioBuffer = this.audioContext.createBuffer(
      1, // mono
      float32Data.length,
      SAMPLE_RATE
    );
    audioBuffer.getChannelData(0).set(float32Data);

    // Create buffer source
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.gainNode);

    // Schedule playback
    const currentTime = this.audioContext.currentTime;
    
    if (!this.isPlaying || this.nextPlayTime < currentTime) {
      // First chunk or buffer underrun - play immediately with small delay
      this.nextPlayTime = currentTime + MIN_BUFFER_MS / 1000;
      this.isPlaying = true;
    }

    source.start(this.nextPlayTime);
    
    // Update next play time
    const duration = audioBuffer.duration;
    this.nextPlayTime += duration;

    // Cleanup after playback
    source.onended = () => {
      source.disconnect();
    };
  }

  /**
   * Stop all audio playback
   */
  stop(): void {
    this.isPlaying = false;
    this.nextPlayTime = 0;
    
    if (this.audioContext) {
      // Close and reinitialize to stop all scheduled audio
      this.audioContext.close();
      this.audioContext = null;
      this.gainNode = null;
    }
  }

  /**
   * Clear audio buffer and reset playback
   */
  clear(): void {
    this.stop();
  }

  // ==========================================================================
  // Volume Control
  // ==========================================================================

  /**
   * Set playback volume (0.0 - 1.0)
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  }

  /**
   * Get current volume
   */
  getVolume(): number {
    return this.volume;
  }

  /**
   * Mute audio
   */
  mute(): void {
    this.isMuted = true;
    if (this.gainNode) {
      this.gainNode.gain.value = 0;
    }
  }

  /**
   * Unmute audio
   */
  unmute(): void {
    this.isMuted = false;
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  }

  /**
   * Toggle mute
   */
  toggleMute(): boolean {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
    return this.isMuted;
  }

  // ==========================================================================
  // Status
  // ==========================================================================

  /**
   * Check if currently playing
   */
  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Check if muted
   */
  isMutedStatus(): boolean {
    return this.isMuted;
  }

  /**
   * Get audio context state
   */
  getState(): 'suspended' | 'running' | 'closed' | 'uninitialized' {
    if (!this.audioContext) return 'uninitialized';
    return this.audioContext.state;
  }

  // ==========================================================================
  // Cleanup
  // ==========================================================================

  /**
   * Dispose of audio resources
   */
  dispose(): void {
    this.stop();
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.gainNode = null;
  }

  // ==========================================================================
  // Audio Format Conversion
  // ==========================================================================

  /**
   * Convert PCM16 (Int16Array) to Float32Array for Web Audio API
   */
  private pcm16ToFloat32(pcm16: Int16Array): Float32Array {
    const float32 = new Float32Array(pcm16.length);
    
    for (let i = 0; i < pcm16.length; i++) {
      // Normalize Int16 (-32768 to 32767) to Float32 (-1.0 to 1.0)
      float32[i] = pcm16[i] / (pcm16[i] < 0 ? 0x8000 : 0x7fff);
    }
    
    return float32;
  }
}

/**
 * Singleton instance for app-wide use
 */
let audioPlayerInstance: AudioPlayer | null = null;

export function getAudioPlayer(): AudioPlayer {
  // Only create instance in browser environment
  if (typeof window === 'undefined') {
    // Return a dummy instance for SSR (will never be used)
    return new AudioPlayer();
  }

  if (!audioPlayerInstance) {
    audioPlayerInstance = new AudioPlayer();
  }
  return audioPlayerInstance;
}

export function disposeAudioPlayer(): void {
  if (audioPlayerInstance) {
    audioPlayerInstance.dispose();
    audioPlayerInstance = null;
  }
}
