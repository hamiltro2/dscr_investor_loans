'use client';

interface SubmitLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function SubmitLoader({ size = 'md', className = '', text }: SubmitLoaderProps) {
  const sizeClasses = {
    sm: 'h-5',
    md: 'h-6',
    lg: 'h-8'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Modern animated loader */}
      <div className={`relative ${sizeClasses[size]} aspect-square`}>
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20">
          <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
        </div>

        {/* Inner rotating segments */}
        <div className="absolute inset-1 rounded-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                borderRightColor: 'white',
                transform: `rotate(${i * 120}deg)`,
                animation: `rotateSegment 2s linear infinite ${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Center dot with pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Loading text with fade effect */}
      {text && (
        <div className="relative overflow-hidden">
          <span className="inline-block text-white font-medium tracking-wide animate-pulse">
            {text}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
      )}
    </div>
  );
}
