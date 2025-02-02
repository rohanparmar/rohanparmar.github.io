"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

interface NavbarProps {
  onSkippyToggle?: (enabled: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSkippyToggle }) => {
  const [activeSection, setActiveSection] = useState('');
  const [skippyEnabled, setSkippyEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about-me', 'work-experience', 'projects'];
      let foundSection = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 65) {
          foundSection = section;
        }
      }

      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSkippy = () => {
    const newState = !skippyEnabled;
    setSkippyEnabled(newState);
    onSkippyToggle?.(newState);
  };

  return (
    <motion.div 
      variants={fadeIn(0.2)}
      initial="hidden"
      animate="visible"
      className='w-full h-[65px] fixed top-0 z-50'
    >
      {/* Main content */}
      <div className='relative w-full h-full flex flex-row items-center justify-between m-auto px-10'>
        {/* Left side - Name */}
        <a 
          href='#about-me' 
          className='h-auto w-auto flex flex-row items-center' 
          onClick={() => handleLinkClick('about-me')}
        >
          <span className="font-bold text-xl text-[#C6FE01] hover:brightness-110 transition-all duration-300">
            Rohan Parmar
          </span>
        </a>

        {/* Center Navigation - Angled Design */}
        <div className='absolute left-1/2 transform -translate-x-1/2 w-[600px] max-w-[90vw] h-[45px] md:w-[600px]'>
          {/* Background shape with angles and curves */}
          <div className='absolute inset-0 bg-[#C6FE01]'
               style={{
                 clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                 borderRadius: '0 0 10px 10px'
               }}>
          </div>
          
          {/* Navigation content */}
          <nav className='relative h-full flex items-center justify-center gap-4 md:gap-12'>
            {['about-me', 'work-experience', 'projects'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(section);
                }}
                className={`cursor-pointer relative px-2 md:px-4 py-1 transition-all duration-300 font-semibold text-sm md:text-base ${
                  activeSection === section 
                    ? 'text-black' 
                    : 'text-black/70 hover:text-black'
                }`}
              >
                {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                {activeSection === section && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black/50"></span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Right side - Social Links */}
        <div className='hidden md:flex flex-row items-center gap-4'>
          {/* Skippy Toggle Button */}
          <button
            onClick={toggleSkippy}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0300145e] border border-[#7042f861] transition-all hover:bg-[#0300147e]"
          >
            <div className={`w-3 h-3 rounded-full transition-colors ${skippyEnabled ? 'bg-[#C6FE01]' : 'bg-gray-400'}`} />
            <span className="text-sm text-gray-200">Skippy {skippyEnabled ? 'On' : 'Off'}</span>
          </button>

          <a 
            href='https://github.com/rohanparmar' 
            className='flex items-center gap-2 text-[#C6FE01] hover:brightness-110 transition-all duration-300'
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className='text-sm font-medium'>Github</span>
          </a>
          <a 
            href='https://www.linkedin.com/in/rohan-parmar/' 
            className='flex items-center gap-2 text-[#C6FE01] hover:brightness-110 transition-all duration-300'
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className='text-sm font-medium'>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-[#03001417] backdrop-blur-md -z-10" />
    </motion.div>
  );
};

export default Navbar;
