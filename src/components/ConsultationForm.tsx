'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SubmitLoader } from './SubmitLoader';
import { SuccessMessage } from './SuccessMessage';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: string;
}

export default function ConsultationForm({ isOpen, onClose, serviceType }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: '',
    serviceType: serviceType || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setIsSubmitting(false);
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredTime: '',
      message: '',
      serviceType: serviceType || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          formType: 'consultation',
          data: {
            ...formData,
            serviceType
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Fire Google Ads conversion tracking for form submission
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-1002915679/aOGJCNjKxa0aEN-Ond4D'
          });
        }
        
        resetForm();
        setShowSuccess(true);
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !showSuccess && onClose()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-dark-900 rounded-xl p-8"
              onClick={e => e.stopPropagation()}
            >
              {!showSuccess ? (
                <>
                  <div className="relative">
                    <button
                      onClick={onClose}
                      className="absolute -top-2 -right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-dark-50">
                      Schedule Your Free Consultation
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-200">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-dark-200">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-dark-200">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          className="w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-dark-200">
                          Preferred Contact Time
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          className="w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 5PM)</option>
                          <option value="evening">Evening (5PM - 8PM)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-dark-200">
                          How can we help you?
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="text-center">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="btn-primary w-full min-w-[200px] relative"
                        >
                          {isSubmitting ? (
                            <SubmitLoader size="sm" text="Scheduling..." />
                          ) : (
                            'Schedule Consultation'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <SuccessMessage
                  title="Thank You!"
                  message="We've received your consultation request and will contact you soon to schedule a meeting."
                  onClose={() => {
                    setShowSuccess(false);
                    onClose();
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
