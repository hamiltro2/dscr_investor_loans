'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

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

  return (
    <div className="card card-primary relative overflow-hidden">
      <Icon className="w-12 h-12 text-primary-500 icon-glow mb-4" />
      <h3 className="text-xl font-display font-bold mb-3 text-dark-50">
        {title}
      </h3>
      <p className="text-dark-200">
        {description}
      </p>
      <Link href="/services" className="btn-secondary mt-4">
        Learn More
      </Link>

      {/* Slide-out Panel */}
      <div className="slide-panel">
        <div className="slide-panel-content">
          <div className="panel-header">
            <h4 className="text-lg font-display font-bold text-primary-500">
              {panelTitle}
            </h4>
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
