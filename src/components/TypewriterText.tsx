'use client';
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!text) return;

    let timeout: NodeJS.Timeout;

    if (index < text.length) {
      // Typing phase
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 100); // Typing speed
    } else {
      // Text is fully typed, wait then fade out
      timeout = setTimeout(() => {
        setIsVisible(false); // Trigger fade out
        
        // After fade out, reset and start again
        setTimeout(() => {
          setDisplayText('');
          setIndex(0);
          setIsVisible(true);
        }, 500); // Wait for fade out to complete
      }, 2000); // How long to show completed text
    }

    return () => clearTimeout(timeout);
  }, [text, index, isVisible]);

  return (
    <span className={`${className} inline-flex items-center transition-opacity duration-500`} 
          style={{ opacity: isVisible ? 1 : 0 }}>
      {displayText}
      <span className="ml-[2px] animate-pulse">|</span>
    </span>
  );
}
