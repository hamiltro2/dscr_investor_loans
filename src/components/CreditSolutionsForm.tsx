'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SubmitLoader } from './SubmitLoader';
import { SuccessMessage } from './SuccessMessage';

export default function CreditSolutionsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    creditScore: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      creditScore: '',
      message: '',
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
          formType: 'credit',
          data: formData 
        })
      });

      const result = await response.json();
      
      if (result.success) {
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

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <SuccessMessage
          title="Thank You!"
          message="We've received your information and will contact you soon to discuss your credit solutions."
          onClose={() => setShowSuccess(false)}
        />
      </motion.div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-dark-50">
        Get Your Free Credit Assessment
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
            disabled={isSubmitting}
            className="input"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            className="input"
            value={formData.email}
            onChange={handleChange}
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
            disabled={isSubmitting}
            className="input"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="creditScore" className="block text-sm font-medium text-dark-200">
            Current Credit Score (Approximate)
          </label>
          <select
            id="creditScore"
            name="creditScore"
            required
            disabled={isSubmitting}
            className="input"
            value={formData.creditScore}
            onChange={handleChange}
          >
            <option value="">Select Credit Score Range</option>
            <option value="300-579">300-579 (Poor)</option>
            <option value="580-669">580-669 (Fair)</option>
            <option value="670-739">670-739 (Good)</option>
            <option value="740-799">740-799 (Very Good)</option>
            <option value="800-850">800-850 (Excellent)</option>
            <option value="unknown">I Don't Know</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-dark-200">
            Tell us about your investment goals
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            disabled={isSubmitting}
            className="textarea"
            value={formData.message}
            onChange={handleChange}
            spellCheck="false"
            suppressHydrationWarning
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary relative"
        >
          {isSubmitting ? (
            <SubmitLoader />
          ) : (
            'Get Started'
          )}
        </button>
      </form>
    </div>
  );
}
