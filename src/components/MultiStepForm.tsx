'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const STEPS = [
  { number: 1, title: 'Loan Type' },
  { number: 2, title: 'Property Type' },
  { number: 3, title: 'Loan Amount' },
  { number: 4, title: 'Credit Score' },
  { number: 5, title: 'Contact Info' },
];

interface FormData {
  loanType: string;
  propertyType: string;
  loanAmount: string;
  creditScore: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormData: FormData = {
  loanType: '',
  propertyType: '',
  loanAmount: '',
  creditScore: '',
  name: '',
  email: '',
  phone: '',
  message: ''
};

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return !!formData.loanType;
      case 2:
        return !!formData.propertyType;
      case 3:
        return !!formData.loanAmount;
      case 4:
        return !!formData.creditScore;
      case 5:
        return !!formData.name && !!formData.email && !!formData.phone;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          formType: 'loan',
          data: formData 
        }),
      });

      const result = await response.json();
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setFormData(initialFormData);
          setCurrentStep(1);
        }, 5000);
      } else {
        alert('There was an error sending your information. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your information. Please try again.');
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Progress Steps */}
        <div className="flex justify-between">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isStepComplete(step.number) && setCurrentStep(step.number)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep === step.number
                      ? 'border-primary-500 bg-primary-500 text-white scale-110'
                      : isStepComplete(step.number)
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-dark-700 text-dark-700'
                  }`}
                  type="button"
                  suppressHydrationWarning
                >
                  {isStepComplete(step.number) ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-lg">{step.number}</span>
                  )}
                </button>
                <span className={`text-sm mt-2 ${currentStep === step.number ? 'text-primary-500 font-medium' : 'text-dark-300'}`}>
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-2 ${
                    isStepComplete(step.number)
                      ? 'bg-primary-500'
                      : 'bg-dark-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-dark-50 mb-4">
                  What type of loan are you interested in?
                </label>
                <div className="grid gap-4">
                  {[
                    'DSCR Loan',
                    'Hard Money Loan',
                    'Refinance out of Balloon Note',
                    'Ground Up Construction Loans',
                    'Other'
                  ].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.loanType === type
                          ? 'border-primary-500 bg-primary-500/10 scale-[1.02] shadow-lg'
                          : 'border-dark-700 hover:border-primary-500/50 hover:scale-[1.01]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="loanType"
                        value={type}
                        checked={formData.loanType === type}
                        onChange={(e) => setFormData(prev => ({ ...prev, loanType: e.target.value }))}
                        className="sr-only"
                      />
                      <span className="text-lg text-dark-50">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-dark-200">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  required
                  className={`select w-full transition-all ${
                    formData.propertyType 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-700'
                  }`}
                  value={formData.propertyType}
                  onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                >
                  <option value="">Select Property Type</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Multi Family">Multi Family</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mixed Use">Mixed Use</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-dark-200">
                  Desired Loan Amount
                </label>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">$</span>
                  <input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    required
                    className={`input pl-8 transition-all ${
                      formData.loanAmount 
                        ? 'border-primary-500 bg-primary-500/10' 
                        : 'border-dark-700'
                    }`}
                    value={formData.loanAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, loanAmount: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="creditScore" className="block text-sm font-medium text-dark-200">
                  Approximate Credit Score
                </label>
                <select
                  id="creditScore"
                  name="creditScore"
                  required
                  className={`select w-full transition-all ${
                    formData.creditScore 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-700'
                  }`}
                  value={formData.creditScore}
                  onChange={(e) => setFormData(prev => ({ ...prev, creditScore: e.target.value }))}
                >
                  <option value="">Select Score Range</option>
                  <option value="Below 580">Below 580</option>
                  <option value="580-619">580-619</option>
                  <option value="620-659">620-659</option>
                  <option value="660-699">660-699</option>
                  <option value="700+">700+</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-200">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`input transition-all ${
                    formData.name 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-700'
                  }`}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                  className={`input transition-all ${
                    formData.email 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-700'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                  className={`input transition-all ${
                    formData.phone 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-700'
                  }`}
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-200">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`textarea transition-all ${
                    formData.message 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-700'
                  }`}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us more about your investment goals..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="btn-primary"
              suppressHydrationWarning
            >
              {currentStep < 5 ? (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Submit Application
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-dark-950/80 z-50">
          <div className="bg-dark-900 p-8 rounded-xl shadow-2xl max-w-2xl mx-4 border border-primary-500/20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary-500" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                Congratulations!
              </h2>
              <p className="text-xl text-dark-50">
                You're on Your Way to Obtaining Your Investment Goal!
              </p>
              <p className="text-dark-200">
                We'll be in touch shortly!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
