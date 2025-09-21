'use client';

import { useState, useEffect } from 'react';
import { Shield, Star, TrendingUp, Award, CheckCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrustMetric {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

export function TrustBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  const trustMetrics: TrustMetric[] = [
    {
      icon: <Shield className="w-5 h-5" />,
      label: "SSL Secured",
      value: "256-bit",
      color: "text-emerald-400"
    },
    {
      icon: <Star className="w-5 h-5" />,
      label: "Google Rating",
      value: "4.9/5",
      color: "text-yellow-400"
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "BBB Rating",
      value: "A+",
      color: "text-primary-400"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Funded",
      value: "$2.5B+",
      color: "text-purple-400"
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Happy Clients",
      value: "15,000+",
      color: "text-blue-400"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      label: "Approval Rate",
      value: "94%",
      color: "text-green-400"
    }
  ];

  useEffect(() => {
    // Show trust bar after user scrolls
    const handleScroll = () => {
      if (window.scrollY > 200 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    // Rotate through metrics on mobile
    const interval = setInterval(() => {
      setCurrentMetricIndex((prev) => (prev + 1) % trustMetrics.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trustMetrics.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-dark-900/95 to-dark-950/95 backdrop-blur-xl border-t border-primary-500/20 shadow-2xl"
        >
          {/* Decorative top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

          <div className="container mx-auto px-4">
            <div className="py-4">
              {/* Desktop view - show all metrics */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-8">
                  {trustMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`${metric.color} bg-dark-800/50 p-2 rounded-lg`}>
                        {metric.icon}
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                        <div className="text-sm font-semibold text-white">{metric.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href="#apply-now"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-primary-500/25 flex items-center gap-2"
                  >
                    Get Pre-Approved
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </a>
                </motion.div>
              </div>

              {/* Mobile view - rotating single metric */}
              <div className="md:hidden flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMetricIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`${trustMetrics[currentMetricIndex].color} bg-dark-800/50 p-2 rounded-lg`}>
                      {trustMetrics[currentMetricIndex].icon}
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">{trustMetrics[currentMetricIndex].label}</div>
                      <div className="text-sm font-semibold text-white">{trustMetrics[currentMetricIndex].value}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Mobile CTA */}
                <a
                  href="tel:+19493393555"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                  onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}
                >
                  Call Now
                </a>
              </div>

              {/* Progress dots for mobile */}
              <div className="md:hidden flex justify-center gap-1 mt-3">
                {trustMetrics.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentMetricIndex
                        ? 'w-6 bg-primary-500'
                        : 'w-1 bg-dark-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Subtle animation line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-500 to-primary-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 30, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
