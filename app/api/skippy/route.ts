import { NextResponse } from 'next/server';
import { generateSkippyResponse, generateSkippyVoice } from '@/lib/skippy-ai';

// This would be your website content, structured for context
const WEBSITE_CONTEXT = {
  about: `I am Rohan Parmar, a software developer passionate about creating innovative solutions.`,
  experience: `I have experience in full-stack development, AI/ML, and cloud technologies.`,
  projects: `My projects showcase my skills in web development, machine learning, and system design.`,
  // Add more sections and content as needed
};

export async function POST(request: Request) {
  try {
    console.log('Skippy API called');
    const { userAction, context } = await request.json();
    console.log('Request data:', { userAction, context });

    // Add website context for chat messages
    let enhancedContext = context;
    if (userAction === 'chat') {
      enhancedContext = `User Question: ${context}\n\nWebsite Context:\n${JSON.stringify(WEBSITE_CONTEXT, null, 2)}`;
    }

    // Generate Skippy's response
    const aiResponse = await generateSkippyResponse(userAction, enhancedContext);
    console.log('AI Response:', aiResponse);

    // Generate voice for the response
    const audioBuffer = await generateSkippyVoice(aiResponse.text, aiResponse.emotion);
    console.log('Voice generated, buffer size:', audioBuffer.byteLength);

    // Convert ArrayBuffer to Base64
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    console.log('Audio converted to base64');

    return NextResponse.json({
      text: aiResponse.text,
      emotion: aiResponse.emotion,
      audioBase64: base64Audio,
    });
  } catch (error) {
    console.error('Error in Skippy API:', error);
    return NextResponse.json(
      { error: 'Failed to generate Skippy response', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 