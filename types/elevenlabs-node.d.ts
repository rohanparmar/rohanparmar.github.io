declare module 'elevenlabs-node' {
  export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  }
} 