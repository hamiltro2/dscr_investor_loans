'use client';

import { Shield, Award, TrendingUp, Users } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Confidential',
      description: '256-bit SSL encryption'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'A+ BBB Rating',
      description: 'Trusted by investors'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: '$2.5B+ Funded',
      description: 'Since inception'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '15,000+ Clients',
      description: 'Nationwide'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {badges.map((badge, index) => (
        <div key={index} className="text-center">
          <div className="text-primary-400 flex justify-center mb-2">
            {badge.icon}
          </div>
          <h3 className="font-semibold text-white text-sm mb-1">{badge.title}</h3>
          <p className="text-xs text-gray-400">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
