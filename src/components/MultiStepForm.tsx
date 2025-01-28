'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface FormData {
  loanType: string;
  creditScore: string;
  propertyType: string;
  employmentType: string;
  name: string;
  email: string;
  phone: string;
}

const LOAN_TYPES = [
  { id: 'dscr', label: 'DSCR Loan' },
  { id: 'hardmoney', label: 'Hard Money Loan' },
  { id: 'refinance', label: 'Refinance out of Balloon Note' },
  { id: 'other', label: 'Other' }
];

const CREDIT_SCORES = [
  { id: 'below600', label: '<600 Credit Score' },
  { id: '600-640', label: '600-640' },
  { id: '640-680', label: '640-680' },
  { id: '680-720', label: '680-720' },
  { id: '720-760', label: '720-760' },
  { id: 'above760', label: '>760' }
];

const PROPERTY_TYPES = [
  { id: 'single', label: 'Single Family Home' },
  { id: 'duplex', label: 'Duplex' },
  { id: 'triplex', label: 'Triplex' },
  { id: 'quadplex', label: 'Quadplex' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'other', label: 'Other' }
];

const EMPLOYMENT_TYPES = [
  { id: 'self-employed', label: 'Self-Employed' },
  { id: 'employed', label: 'Employed' }
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    loanType: '',
    creditScore: '',
    propertyType: '',
    employmentType: '',
    name: '',
    email: '',
    phone: ''
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    // Save form data after each step
    const stepData = {
      step: currentStep,
      data: { ...formData }
    };
    localStorage.setItem('form_progress', JSON.stringify(stepData));
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here we'll add the email sending logic later using Google App password
      const emailData = {
        to: 'your-email@example.com', // Replace with your email
        subject: 'New Loan Application',
        text: `
          Loan Application Details:
          
          Loan Type: ${formData.loanType}
          Credit Score: ${formData.creditScore}
          Property Type: ${formData.propertyType}
          Employment Type: ${formData.employmentType}
          
          Applicant Information:
          Name: ${formData.name}
          Email: ${formData.email}
          Phone: ${formData.phone}
        `
      };

      // For now, just log the data
      console.log('Form submitted:', emailData);
      
      // Clear form progress from localStorage
      localStorage.removeItem('form_progress');
      
      // Show success screen
      setCurrentStep(5);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.loanType !== '';
      case 2:
        return formData.creditScore !== '';
      case 3:
        return formData.propertyType !== '';
      case 4:
        return (
          formData.employmentType !== '' &&
          formData.name !== '' &&
          formData.email !== '' &&
          formData.phone !== ''
        );
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-dark-50">
              Select Your Loan Type
            </h2>
            <div className="space-y-4">
              {LOAN_TYPES.map(type => (
                <label
                  key={type.id}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    formData.loanType === type.id
                      ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                      : 'border-dark-800 bg-dark-900/50 text-dark-100 hover:border-primary-500/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="loanType"
                    value={type.id}
                    checked={formData.loanType === type.id}
                    onChange={(e) => updateFormData('loanType', e.target.value)}
                    className="mr-3 text-primary-500 focus:ring-primary-500"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-dark-50">
              What is Your Credit Score?
            </h2>
            <div className="space-y-4">
              {CREDIT_SCORES.map(score => (
                <label
                  key={score.id}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    formData.creditScore === score.id
                      ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                      : 'border-dark-800 bg-dark-900/50 text-dark-100 hover:border-primary-500/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="creditScore"
                    value={score.id}
                    checked={formData.creditScore === score.id}
                    onChange={(e) => updateFormData('creditScore', e.target.value)}
                    className="mr-3 text-primary-500 focus:ring-primary-500"
                  />
                  <span>{score.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-dark-50">
              Select Investment Property Type
            </h2>
            <div className="space-y-4">
              {PROPERTY_TYPES.map(type => (
                <label
                  key={type.id}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    formData.propertyType === type.id
                      ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                      : 'border-dark-800 bg-dark-900/50 text-dark-100 hover:border-primary-500/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="propertyType"
                    value={type.id}
                    checked={formData.propertyType === type.id}
                    onChange={(e) => updateFormData('propertyType', e.target.value)}
                    className="mr-3 text-primary-500 focus:ring-primary-500"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-dark-50">
              Complete Your Profile
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                {EMPLOYMENT_TYPES.map(type => (
                  <label
                    key={type.id}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      formData.employmentType === type.id
                        ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                        : 'border-dark-800 bg-dark-900/50 text-dark-100 hover:border-primary-500/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="employmentType"
                      value={type.id}
                      checked={formData.employmentType === type.id}
                      onChange={(e) => updateFormData('employmentType', e.target.value)}
                      className="mr-3 text-primary-500 focus:ring-primary-500"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-200 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-display font-bold text-dark-50">
              Thank You for Your Application!
            </h2>
            <p className="text-dark-200">
              We're excited to help you achieve your investment goals. Our team will review your application and contact you within 24 hours to discuss the next steps. We're committed to finding the best financing solution for your needs.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {currentStep < 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className={`w-1/4 h-2 rounded-full transition-colors duration-200 ${
                  step <= currentStep ? 'bg-primary-500' : 'bg-dark-800'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-sm text-dark-300 text-center">
            Step {currentStep} of 4
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStep()}

        {currentStep < 5 && (
          <div className="flex justify-end">
            <button
              type="button"
              className={`btn-primary flex items-center gap-2 ${
                !isStepValid() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={currentStep === 4 ? handleSubmit : handleContinue}
              disabled={!isStepValid()}
            >
              {currentStep === 4 ? 'Submit Application' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
