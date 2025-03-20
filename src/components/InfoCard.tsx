'use client';

import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  panelTitle: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

export function InfoCard({ icon: Icon, title, description, panelTitle, steps }: InfoCardProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const header = target.querySelector('.panel-header') as HTMLElement;
    const content = target.querySelector('.step-list') as HTMLElement;
    
    if (header && content) {
      const scrollTop = target.scrollTop;
      const headerHeight = header.offsetHeight;
      
      if (scrollTop > headerHeight) {
        header.classList.add('hidden-header');
      } else {
        header.classList.remove('hidden-header');
      }
    }
  };

  useEffect(() => {
    const panels = document.querySelectorAll('.slide-panel-content');
    panels.forEach(panel => {
      panel.addEventListener('scroll', handleScroll);
    });

    return () => {
      panels.forEach(panel => {
        panel.removeEventListener('scroll', handleScroll);
      });
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPanelOpen(false);
  };

  return (
    <div className="card card-primary relative overflow-hidden">
      <Icon className="w-12 h-12 text-primary-500 icon-glow mb-4" />
      <h3 className="text-xl font-display font-bold mb-3 text-dark-50">
        {title}
      </h3>
      <p className="text-dark-200 mb-4">
        {description}
      </p>
      <button 
        onClick={() => setIsPanelOpen(true)}
        className="btn-secondary inline-flex items-center gap-2 hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
      >
        Learn More
        <svg 
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide-out Panel */}
      <div className={`slide-panel ${isPanelOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="slide-panel-content">
          <div className="panel-header">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-display font-bold text-primary-500">
                {panelTitle}
              </h4>
              <button 
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-dark-800 transition-colors"
              >
                <svg 
                  className="w-5 h-5 text-dark-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="panel-content">
            <div className="step-list">
              {steps.map((step, index) => (
                <div key={index} className="step-list-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <div className="step-title">{step.title}</div>
                    <div className="step-description">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
