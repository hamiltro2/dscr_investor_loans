import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-dark-900 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
}
