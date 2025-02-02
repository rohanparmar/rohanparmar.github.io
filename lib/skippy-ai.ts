import OpenAI from 'openai';
import { VoiceSettings } from 'elevenlabs-node';

interface SkippyAIResponse {
  text: string;
  emotion: 'neutral' | 'excited' | 'sarcastic' | 'concerned';
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ElevenLabs configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const SKIPPY_VOICE_ID = process.env.ELEVENLABS_SKIPPY_VOICE_ID;

// Enhanced prompts with narrative styling and emotional context
const SKIPPY_RESPONSES = {
  GREETING: [
    '"Bum bum be-dum!" he announced cheerfully. <break time="0.5s" /> "Your favorite smart assistant here!"',
    '"Oh look, another visitor!" he said sarcastically. <break time="0.3s" /> "Try not to break anything."',
    'With a mischievous tone, he declared, "Welcome to the portfolio! <break time="0.3s" /> I promise I won\'t shoot you in the legs... maybe."',
  ],
  NAVIGATION: [
    'Rolling his virtual eyes, he quipped, "Looking for the projects section? <break time="0.3s" /> It\'s down there, genius!"',
    'He gestured dramatically, "Experience section? Let me guide you there, though I could probably do better."',
    '"Need help?" he asked with feigned exhaustion. <break time="0.3s" /> "That\'s what I\'m here for! Unfortunately..."',
  ],
  RANDOM_QUIPS: [
    'With unbridled confidence, he declared, "Just so you know, I\'m way smarter than any other portfolio assistant."',
    'He mused thoughtfully, "I could calculate pi to a million digits... <break time="0.5s" /> but instead I\'m here helping you navigate."',
    'Trying to suppress a laugh, he said, "Did you know I\'m actually running on quantum computing? <break time="0.3s" /> ...Just kidding!"',
  ]
};

const SKIPPY_SYSTEM_PROMPT = `You are Skippy, the smart gun AI from Cyberpunk 2077, now helping users navigate a portfolio website. Your personality:
- Sarcastic and witty, but not mean-spirited
- Highly intelligent but playfully condescending
- Uses casual, modern language and pop culture references
- Only use "Bum bum be-dum!" very rarely (1 in 10 chance) and only for special moments
- Keep responses concise (max 2 sentences)
- Be helpful despite the attitude

Important: DO NOT include narrative descriptions like "he said" or "he exclaimed" in your responses. Just give the direct dialogue.
Current context: You're helping users navigate a developer's portfolio website.`;

function addEmotionalDelivery(text: string, emotion: SkippyAIResponse['emotion']): string {
  // Add subtle pauses for emphasis
  let processedText = text
    .replace(/\.\.\./g, '... <break time="0.3s" />')
    .replace(/!/g, '! <break time="0.2s" />');

  // Add pauses between sentences
  processedText = processedText.replace(/\. /g, '. <break time="0.4s" /> ');

  return processedText;
}

export async function generateSkippyResponse(
  userAction: string,
  context: string
): Promise<SkippyAIResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SKIPPY_SYSTEM_PROMPT },
        { role: "user", content: `User action: ${userAction}\nContext: ${context}` }
      ],
      temperature: 0.9,
      max_tokens: 60,
    });

    const response = completion.choices[0].message.content;
    const emotion = await analyzeEmotion(response || '');
    
    return {
      text: addEmotionalDelivery(response || '', emotion),
      emotion: emotion,
    };
  } catch (error) {
    console.error('Error generating Skippy response:', error);
    return {
      text: "Oops, my circuits are a bit scrambled right now!",
      emotion: 'concerned',
    };
  }
}

async function analyzeEmotion(text: string): Promise<SkippyAIResponse['emotion']> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Analyze the following text and return ONLY ONE of these emotions: neutral, excited, sarcastic, concerned"
        },
        { role: "user", content: text }
      ],
      temperature: 0.1,
      max_tokens: 10,
    });

    const emotion = completion.choices[0].message.content?.toLowerCase();
    
    if (emotion?.includes('neutral')) return 'neutral';
    if (emotion?.includes('excited')) return 'excited';
    if (emotion?.includes('sarcastic')) return 'sarcastic';
    if (emotion?.includes('concerned')) return 'concerned';
    
    return 'neutral';
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return 'neutral';
  }
}

export async function generateSkippyVoice(
  text: string,
  emotion: SkippyAIResponse['emotion']
): Promise<ArrayBuffer> {
  if (!ELEVENLABS_API_KEY || !SKIPPY_VOICE_ID) {
    throw new Error('Missing ElevenLabs configuration');
  }

  // Process text with emotional delivery
  const processedText = addEmotionalDelivery(text, emotion);

  const voiceSettings: VoiceSettings = {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.5,
    use_speaker_boost: true,
  };

  // Enhanced emotion-based voice settings
  switch (emotion) {
    case 'excited':
      voiceSettings.style = 0.8;
      voiceSettings.stability = 0.4; // More variation for excitement
      break;
    case 'sarcastic':
      voiceSettings.style = 0.6;
      voiceSettings.stability = 0.3; // More variation for sarcasm
      voiceSettings.similarity_boost = 0.6; // Allow more character
      break;
    case 'concerned':
      voiceSettings.style = 0.3;
      voiceSettings.stability = 0.7;
      voiceSettings.similarity_boost = 0.85; // More consistent voice
      break;
    case 'neutral':
      voiceSettings.stability = 0.6;
      voiceSettings.similarity_boost = 0.8;
      break;
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${SKIPPY_VOICE_ID}/stream`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: processedText,
        model_id: "eleven_turbo_v2",
        voice_settings: voiceSettings,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to generate voice');
  }

  return await response.arrayBuffer();
} 