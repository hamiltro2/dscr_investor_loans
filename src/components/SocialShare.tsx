'use client';

import { Facebook, Linkedin, Link2, Mail } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function SocialShare({ url, title, description = '', className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    // Track social share event for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'calculator',
        item_id: url,
      });
    }
    
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors group"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5 text-dark-300 group-hover:text-primary-400 transition-colors" />
      </button>
      
      <button
        onClick={() => handleShare('x')}
        className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors group"
        aria-label="Share on X"
      >
        <svg className="w-5 h-5 text-dark-300 group-hover:text-primary-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
      
      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors group"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-dark-300 group-hover:text-primary-400 transition-colors" />
      </button>
      
      <button
        onClick={() => handleShare('email')}
        className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors group"
        aria-label="Share via Email"
      >
        <Mail className="w-5 h-5 text-dark-300 group-hover:text-primary-400 transition-colors" />
      </button>
      
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors group relative"
        aria-label="Copy link"
      >
        <Link2 className="w-5 h-5 text-dark-300 group-hover:text-primary-400 transition-colors" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
