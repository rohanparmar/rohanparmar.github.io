"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'skippy';
  emotion?: 'neutral' | 'excited' | 'sarcastic' | 'concerned';
}

interface SkippyChatProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
}

interface CodeBlockProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface MarkdownProps {
  children: React.ReactNode;
  href?: string;
}

const SkippyChat: React.FC<SkippyChatProps> = ({ isOpen, onClose, onSendMessage, messages }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setInputValue('');
    setIsLoading(true);

    try {
      await onSendMessage(inputValue);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (text: string) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children }: CodeBlockProps) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (inline) {
            return (
              <code className="bg-black/30 px-1 py-0.5 rounded text-[#C6FE01]">
                {children}
              </code>
            );
          }

          return (
            <div className="my-2 rounded-lg overflow-hidden">
              <SyntaxHighlighter
                language={language || 'javascript'}
                style={atomDark}
                customStyle={{
                  margin: 0,
                  background: '#0a0a0a',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          );
        },
        p({ children }: MarkdownProps) {
          return <p className="mb-2">{children}</p>;
        },
        ul({ children }: MarkdownProps) {
          return <ul className="list-disc ml-4 mb-2">{children}</ul>;
        },
        ol({ children }: MarkdownProps) {
          return <ol className="list-decimal ml-4 mb-2">{children}</ol>;
        },
        li({ children }: MarkdownProps) {
          return <li className="mb-1">{children}</li>;
        },
        a({ children, href }: MarkdownProps) {
          return (
            <a 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C6FE01] hover:underline"
            >
              {children}
            </a>
          );
        },
      } as Components}
    >
      {text}
    </ReactMarkdown>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-40 right-4 w-96 max-w-[calc(100vw-2rem)] bg-black/90 border border-[#C6FE01]/30 rounded-lg shadow-lg overflow-hidden z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#C6FE01]/30 bg-[#0300145e]">
            <h3 className="text-[#C6FE01] font-semibold">Chat with Skippy</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#C6FE01]/10 text-[#C6FE01]'
                      : 'bg-[#0300145e] text-gray-200'
                  }`}
                >
                  {renderMessageContent(message.text)}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[#0300145e] p-3 rounded-lg text-gray-200">
                  <span className="inline-flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#C6FE01] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#C6FE01] rounded-full animate-bounce [animation-delay:0.2s] mx-1" />
                    <span className="w-1.5 h-1.5 bg-[#C6FE01] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#C6FE01]/30">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Skippy something..."
                className="flex-1 bg-black/50 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-2 border border-[#C6FE01]/30 focus:outline-none focus:border-[#C6FE01]/60"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-[#C6FE01]/20 hover:bg-[#C6FE01]/30 text-[#C6FE01] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkippyChat; 