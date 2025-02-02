import { NextResponse } from 'next/server';
import { generateSkippyResponse, generateSkippyVoice } from '@/lib/skippy-ai';

// This would be your website content, structured for context
const WEBSITE_CONTEXT = {
  about: `I am Rohan Parmar, a software developer passionate about creating innovative solutions.`,
  experience: `I have experience in full-stack development, AI/ML, and cloud technologies.`,
  projects: `My projects showcase my skills in web development, machine learning, and system design.`,
  // Add more sections and content as needed
};

// Rate limiting map
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();

// Rate limit check function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 10; // messages per 5 minutes
  const windowMs = 5 * 60 * 1000; // 5 minutes
  
  const userLimit = rateLimitMap.get(ip) || { count: 0, timestamp: now };
  
  // Reset if window has passed
  if (now - userLimit.timestamp > windowMs) {
    userLimit.count = 1;
    userLimit.timestamp = now;
  } else {
    userLimit.count++;
  }
  
  rateLimitMap.set(ip, userLimit);
  return userLimit.count <= limit;
}

export async function POST(request: Request) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { userAction, context } = await request.json();

    // Add website context for chat messages
    let enhancedContext = context;
    if (userAction === 'chat') {
      enhancedContext = `User Question: ${context}\n\nWebsite Context:\n${JSON.stringify(WEBSITE_CONTEXT, null, 2)}`;
    }

    // Create a TransformStream for streaming
    const encoder = new TextEncoder();
    const stream = new TransformStream({
      transform(chunk: string, controller) {
        controller.enqueue(encoder.encode(chunk));
      },
    });

    const writer = stream.writable.getWriter();

    // Start the response
    const response = new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

    // Process in background
    (async () => {
      try {
        // Generate Skippy's response
        const aiResponse = await generateSkippyResponse(userAction, enhancedContext);
        
        // Send the text response
        const textEvent = `data: ${JSON.stringify({ type: 'text', content: aiResponse })}\n\n`;
        await writer.write(textEvent);

        // Generate and stream voice
        const audioBuffer = await generateSkippyVoice(aiResponse.text, aiResponse.emotion);
        const base64Audio = Buffer.from(audioBuffer).toString('base64');
        
        // Split audio into smaller chunks to avoid JSON parsing issues
        const chunkSize = 32768; // 32KB chunks
        for (let i = 0; i < base64Audio.length; i += chunkSize) {
          const chunk = base64Audio.slice(i, i + chunkSize);
          const audioEvent = `data: ${JSON.stringify({ 
            type: 'audio', 
            content: chunk,
            isLastChunk: i + chunkSize >= base64Audio.length 
          })}\n\n`;
          await writer.write(audioEvent);
        }

        // Close the stream
        await writer.close();
      } catch (error) {
        console.error('Error in stream processing:', error);
        const errorEvent = `data: ${JSON.stringify({ 
          type: 'error', 
          content: 'Error processing request' 
        })}\n\n`;
        await writer.write(errorEvent);
        await writer.close();
      }
    })();

    return response;
  } catch (error) {
    console.error('Error in Skippy API:', error);
    return NextResponse.json(
      { error: 'Failed to generate Skippy response' },
      { status: 500 }
    );
  }
} 