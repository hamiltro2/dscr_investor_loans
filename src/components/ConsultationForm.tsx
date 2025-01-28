'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Thank you! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredTime: '',
          message: '',
          serviceType: serviceType || '',
        });
        onClose();
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-dark-900 rounded-lg shadow-xl w-full max-w-lg p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-dark-50">
                Schedule a Consultation
              </h2>
              <button
                onClick={onClose}
                className="text-dark-200 hover:text-dark-50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

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
                  className="input"
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
                  className="input"
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
                  className="input"
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
                  className="select"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  required
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
                  className="textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn-primary w-full">
                  Schedule Consultation
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
