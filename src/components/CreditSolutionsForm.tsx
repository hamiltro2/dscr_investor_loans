'use client';

import { useState } from 'react';

export default function CreditSolutionsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    creditScore: '',
    message: '',
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
          formType: 'credit',
          data: formData 
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Thank you! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          creditScore: '',
          message: '',
        });
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-display font-bold mb-6 text-dark-50 text-center">
        Get Your Personalized Solution
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
            className="input"
            value={formData.name}
            onChange={handleChange}
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
            className="input"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="creditScore" className="block text-sm font-medium text-dark-200">
            Approximate Credit Score
          </label>
          <select
            id="creditScore"
            name="creditScore"
            required
            className="select"
            value={formData.creditScore}
            onChange={handleChange}
          >
            <option value="">Select Score Range</option>
            <option value="Below 580">Below 580</option>
            <option value="580-619">580-619</option>
            <option value="620-659">620-659</option>
            <option value="660-699">660-699</option>
            <option value="700+">700+</option>
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
            className="textarea"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="text-center">
          <button type="submit" className="btn-primary w-full md:w-auto">
            Find Your Solution
          </button>
        </div>
      </form>
    </div>
  );
}
