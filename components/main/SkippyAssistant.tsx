"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkippyChat from './SkippyChat';

interface SkippyState {
  isVisible: boolean;
  isSpeaking: boolean;
  currentAnimation: 'idle' | 'speaking' | 'surprised' | 'sarcastic';
}

interface SkippyResponse {
  text: string;
  emotion: 'neutral' | 'excited' | 'sarcastic' | 'concerned';
  audioBase64?: string;
}

interface SkippyAssistantProps {
  enabled?: boolean;
}

const MAX_MESSAGES_PER_SESSION = 3;
const SESSION_STORAGE_KEY = 'skippy_message_count';

const SkippyAssistant: React.FC<SkippyAssistantProps> = ({ enabled = true }) => {
  console.log('SkippyAssistant rendering, enabled:', enabled);

  const [state, setState] = useState<SkippyState>({
    isVisible: true,
    isSpeaking: false,
    currentAnimation: 'idle',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'skippy';
    emotion?: 'neutral' | 'excited' | 'sarcastic' | 'concerned';
  }>>([{
    id: '1',
    text: "Hey there! I'm Skippy, your AI assistant. Ask me anything about this portfolio!",
    sender: 'skippy',
    emotion: 'excited'
  }]);

  const [autoMessageCount, setAutoMessageCount] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const threeRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastSpeakTime = useRef<number>(0);
  const speakQueue = useRef<SkippyResponse[]>([]);
  const isSpeaking = useRef<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isInitialMount = useRef(true);
  const [messageCount, setMessageCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(sessionStorage.getItem(SESSION_STORAGE_KEY) || '0');
    }
    return 0;
  });

  // Set up intersection observers for different sections
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.5 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.5 });

  // Handle user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  // Clear state when disabled
  useEffect(() => {
    if (!enabled) {
      setState(prev => ({
        ...prev,
        isVisible: false,
      }));
      speakQueue.current = [];
      isSpeaking.current = false;
    } else {
      setState(prev => ({
        ...prev,
        isVisible: true,
      }));
    }
  }, [enabled]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_STORAGE_KEY, messageCount.toString());
    }
  }, [messageCount]);

  const addToChatHistory = (message: SkippyResponse) => {
    setChatHistory(prev => {
      // Check if this message already exists
      const exists = prev.some(m => m.text === message.text);
      if (exists) return prev;
      
      return [...prev, {
        id: Date.now().toString(),
        text: message.text,
        sender: 'skippy',
        emotion: message.emotion
      }];
    });
  };

  const handleAutoResponse = async (response: SkippyResponse) => {
    if (autoMessageCount >= 3 && !isChatOpen) {
      return; // Skip if we've reached the limit and chat isn't open
    }

    if (!isChatOpen) {
      setAutoMessageCount(prev => prev + 1);
    }

    try {
      const apiResponse = await fetch('/api/skippy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAction: 'viewing',
          context: response.text,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to get response');
      }

      const data = await apiResponse.json();
      addToChatHistory({
        text: response.text,
        emotion: response.emotion
      });
      
      if (data.audioBase64 && hasUserInteracted) {
        const audioBlob = await fetch(`data:audio/mpeg;base64,${data.audioBase64}`).then(r => r.blob());
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          try {
            await audioRef.current.play();
            await new Promise(resolve => {
              if (audioRef.current) {
                audioRef.current.onended = resolve;
              }
            });
          } catch (error) {
            console.log('Audio playback not allowed yet - waiting for user interaction');
          } finally {
            URL.revokeObjectURL(audioUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error in auto response:', error);
    }
  };

  // Initial greeting - only on first mount
  useEffect(() => {
    if (enabled && isInitialMount.current) {
      isInitialMount.current = false;
      handleAutoResponse({
        text: "Welcome to the portfolio! Need a guide? I'm your AI!",
        emotion: 'excited'
      });
    }
  }, [enabled]);

  // Section visibility responses
  useEffect(() => {
    if (enabled && heroInView) {
      handleAutoResponse({
        text: "Nice portfolio, right? The dev's got style, I'll give them that.",
        emotion: 'sarcastic'
      });
    }
  }, [heroInView, enabled]);

  useEffect(() => {
    if (enabled && experienceInView) {
      handleAutoResponse({
        text: "Check out that experience section! Pretty impressive stuff, if you're into that whole 'professional development' thing.",
        emotion: 'sarcastic'
      });
    }
  }, [experienceInView, enabled]);

  useEffect(() => {
    if (enabled && projectsInView) {
      handleAutoResponse({
        text: "Projects ahead! Some seriously cool tech in here. Not as cool as me, but what is?",
        emotion: 'excited'
      });
    }
  }, [projectsInView, enabled]);

  const handleChatMessage = async (message: string) => {
    if (messageCount >= MAX_MESSAGES_PER_SESSION && !isChatOpen) {
      addToChatHistory({
        text: "I've reached my message limit for this session. Please open the chat to continue our conversation!",
        emotion: 'concerned'
      });
      return;
    }

    try {
      // Add user message to chat history
      setChatHistory(prev => [...prev, {
        id: Date.now().toString(),
        text: message,
        sender: 'user'
      }]);

      setIsLoading(true);

      const response = await fetch('/api/skippy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAction: 'chat',
          context: message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let audioChunks: string[] = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Process complete messages
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));
              
              if (data.type === 'text') {
                addToChatHistory(data.content);
              } else if (data.type === 'audio') {
                audioChunks.push(data.content);
                
                // If this is the last chunk, play the audio
                if (data.isLastChunk && hasUserInteracted) {
                  const fullAudioBase64 = audioChunks.join('');
                  const audioBlob = await fetch(`data:audio/mpeg;base64,${fullAudioBase64}`).then(r => r.blob());
                  const audioUrl = URL.createObjectURL(audioBlob);
                  
                  if (audioRef.current) {
                    audioRef.current.src = audioUrl;
                    try {
                      await audioRef.current.play();
                      await new Promise(resolve => {
                        if (audioRef.current) {
                          audioRef.current.onended = resolve;
                        }
                      });
                    } catch (error) {
                      console.log('Audio playback not allowed yet - waiting for user interaction');
                    } finally {
                      URL.revokeObjectURL(audioUrl);
                      audioChunks = []; // Clear the chunks array
                    }
                  }
                }
              } else if (data.type === 'error') {
                throw new Error(data.content);
              }
            } catch (error) {
              console.warn('Error parsing SSE message:', error);
              continue; // Skip malformed messages
            }
          }
        }
      }

      // Process any remaining complete messages in the buffer
      if (buffer.trim() !== '') {
        try {
          const line = buffer.trim();
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(5));
            if (data.type === 'text') {
              addToChatHistory(data.content);
            }
          }
        } catch (error) {
          console.warn('Error parsing final SSE message:', error);
        }
      }

      if (!isChatOpen) {
        setMessageCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error in chat:', error);
      addToChatHistory({
        text: "Sorry, I encountered an error. Please try again!",
        emotion: 'concerned'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {enabled && (
        <>
          <motion.div 
            className="fixed bottom-4 right-4 z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div 
              ref={threeRef} 
              className="w-32 h-32 bg-black/20 rounded-full cursor-pointer pointer-events-auto hover:bg-black/30 transition-colors" 
              onClick={() => {
                setIsChatOpen(true);
                setHasUserInteracted(true);
              }}
            />

            <audio 
              ref={audioRef} 
              className="hidden" 
              onError={(e) => console.error('Audio error:', e)} 
              onPlay={() => console.log('Audio started playing')}
              onEnded={() => console.log('Audio ended')}
            />
          </motion.div>

          <SkippyChat
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            onSendMessage={handleChatMessage}
            messages={chatHistory}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default SkippyAssistant; 