'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type FormStep = 1 | 2 | 3 | 4 | 5;

interface FormData {
  loanType: string;
  creditScore: string;
  propertyType: string;
  employmentType: string;
  loanAmount: string;
  name: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  loanType: '',
  creditScore: '',
  propertyType: '',
  employmentType: '',
  loanAmount: '',
  name: '',
  email: '',
  phone: '',
};

export default function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < 5 ? (prev + 1) as FormStep : prev));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? (prev - 1) as FormStep : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 5) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
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
        alert('Thank you! We will contact you soon about your loan application.');
        setFormData(initialFormData);
        setCurrentStep(1);
      } else {
        alert('There was an error sending your application. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your application. Please try again.');
    }
  };

  const renderInput = (name: keyof FormData, label: string, type: string = 'text', options?: string[]) => {
    return (
      <div className="mb-6">
        <label htmlFor={name} className="block text-lg font-medium text-white mb-3">
          {label}
        </label>
        {options ? (
          <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="w-full px-4 py-3 text-base bg-gray-700 border-2 border-gray-600 rounded-lg text-white 
              transition-all duration-200
              hover:border-blue-400 hover:bg-gray-600
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option} className="bg-gray-700 text-white">
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="w-full px-4 py-3 text-base bg-gray-700 border-2 border-gray-600 rounded-lg text-white 
              transition-all duration-200
              hover:border-blue-400 hover:bg-gray-600
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
    );
  };

  const RadioOption = ({ name, value, label }: { name: string; value: string; label: string }) => (
    <div className="relative">
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={formData[name as keyof FormData] === value}
        onChange={(e) => handleInputChange(name as keyof FormData, e.target.value)}
        className="peer absolute opacity-0 w-full h-full cursor-pointer"
      />
      <label
        htmlFor={`${name}-${value}`}
        className="block w-full p-4 bg-gray-700 text-white rounded-lg border-2 border-gray-600 
          cursor-pointer transition-all duration-200 
          hover:bg-gray-600 hover:border-blue-400
          peer-checked:bg-blue-600 peer-checked:border-blue-500
          peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 peer-focus:ring-offset-gray-800"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{label}</span>
          <div className="w-6 h-6 border-2 rounded-full border-gray-400 
            peer-checked:border-white peer-checked:bg-blue-500 
            flex items-center justify-center transition-all duration-200">
            <div className="w-3 h-3 rounded-full bg-white opacity-0 
              peer-checked:opacity-100 transition-opacity duration-200"></div>
          </div>
        </div>
      </label>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white mb-6">What type of loan are you interested in?</h3>
            <div className="space-y-4">
              <RadioOption name="loanType" value="DSCR" label="DSCR Loan" />
              <RadioOption name="loanType" value="hardMoney" label="Hard Money Loan" />
              <RadioOption name="loanType" value="balloon" label="Refinance out of Balloon Note" />
              <RadioOption name="loanType" value="construction" label="Ground Up Construction Loans" />
              <RadioOption name="loanType" value="other" label="Other" />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white mb-6">What is your credit score range?</h3>
            <div className="space-y-4">
              <RadioOption name="creditScore" value="below600" label="<600 Credit Score" />
              <RadioOption name="creditScore" value="600-640" label="600-640" />
              <RadioOption name="creditScore" value="640-680" label="640-680" />
              <RadioOption name="creditScore" value="680-720" label="680-720" />
              <RadioOption name="creditScore" value="720-760" label="720-760" />
              <RadioOption name="creditScore" value="above760" label=">760" />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white mb-6">What type of property are you interested in?</h3>
            <div className="space-y-4">
              <RadioOption name="propertyType" value="singleFamily" label="Single Family Home" />
              <RadioOption name="propertyType" value="duplex" label="Duplex" />
              <RadioOption name="propertyType" value="triplex" label="Triplex" />
              <RadioOption name="propertyType" value="quadplex" label="Quadplex" />
              <RadioOption name="propertyType" value="commercial" label="Commercial" />
              <RadioOption name="propertyType" value="other" label="Other" />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white mb-6">How much do you need to borrow?</h3>
            <div className="space-y-4">
              <RadioOption name="loanAmount" value="150k-250k" label="$150,000 - $250,000" />
              <RadioOption name="loanAmount" value="250k-350k" label="$250,000 - $350,000" />
              <RadioOption name="loanAmount" value="350k-450k" label="$350,000 - $450,000" />
              <RadioOption name="loanAmount" value="450k-550k" label="$450,000 - $550,000" />
              <RadioOption name="loanAmount" value="above550k" label=">$550,000" />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white mb-6">Employment & Contact Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2">Employment Type</h4>
                <div className="space-y-2">
                  <RadioOption name="employmentType" value="selfEmployed" label="Self-Employed" />
                  <RadioOption name="employmentType" value="employed" label="Employed" />
                </div>
              </div>
              
              {renderInput('name', 'Name')}
              {renderInput('email', 'Email', 'email')}
              {renderInput('phone', 'Phone', 'tel')}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Application Submitted Successfully!</h2>
        <p className="text-gray-300">We will contact you soon regarding your loan application.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8 bg-gray-800 p-12 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Start your Investment Journey</h1>
          <p className="mt-2 text-lg text-white">Step {currentStep} of 5</p>
        </div>

        <div className="w-full bg-gray-700 h-3 rounded-full mt-8">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 text-base font-medium text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={handleNextStep}
                disabled={isSubmitting}
                className={clsx(
                  'px-6 py-3 text-base font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                  currentStep === 5
                    ? 'bg-green-600 hover:bg-green-500 focus:ring-green-500'
                    : 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-600',
                  isSubmitting && 'opacity-50 cursor-not-allowed'
                )}
              >
                {currentStep === 5 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
