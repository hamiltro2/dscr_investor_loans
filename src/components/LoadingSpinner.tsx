'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer ring with white glow */}
      <div className="absolute w-full h-full rounded-full border-2 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
      
      {/* Spinning gradient ring */}
      <div className="absolute w-full h-full rounded-full border-2 border-transparent border-t-white animate-spin 
        before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent 
        before:border-l-white before:opacity-50"></div>
      
      {/* Inner pulsing dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 
        rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>
    </div>
  );
}
