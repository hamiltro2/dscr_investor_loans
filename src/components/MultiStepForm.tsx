'use client';

import { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { SubmitLoader } from './SubmitLoader';
import { SuccessMessage } from './SuccessMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { trackFormSubmission } from '@/utils/applovin';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

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
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

    setIsSubmitting(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          formType: 'loan',
          data: formData 
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const result = await response.json();
      if (result.success) {
        // Fire Google Ads conversion tracking for form submission
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-1002915679/aOGJCNjKxa0aEN-Ond4D'
          });
        }
        
        // Fire AppLovin conversion tracking
        const loanAmountValue = parseInt(formData.loanAmount.replace(/\D/g, '')) || 0;
        trackFormSubmission(loanAmountValue * 0.01, 'loan_application'); // 1% of loan amount as conversion value
        
        // Push event to dataLayer for GTM
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'form_submission_success',
            'formType': 'loan_application',
            'loanType': formData.loanType,
            'loanAmount': formData.loanAmount
          });
        }
        
        setIsSubmitting(false); // Set to false before showing success
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setFormData(initialFormData);
          setCurrentStep(1);
        }, 5000);
      } else {
        setIsSubmitting(false); // Set to false before showing error
        alert('There was an error sending your information. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false); // Set to false before showing error
      alert('There was an error sending your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 5) {
      if (!isStepComplete(currentStep)) return;
      
      setSubmitClicked(true);
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            formType: 'loan',
            data: formData 
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setShowSuccess(true);
          // Reset form after 5 seconds
          setTimeout(() => {
            setShowSuccess(false);
            setFormData(initialFormData);
            setCurrentStep(1);
          }, 5000);
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
      } finally {
        setIsSubmitting(false);
        setSubmitClicked(false);
      }
    } else {
      if (!isStepComplete(currentStep)) return;
      setCurrentStep(currentStep + 1);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      {isClient && (
        <div className="space-y-4">
          {/* Progress Steps */}
          <div className="flex justify-between mb-6 overflow-x-auto pb-2 sm:overflow-visible">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isStepComplete(step.number) && setCurrentStep(step.number)}
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
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
                      <Check className="w-4 h-4 sm:w-6 sm:h-6" />
                    ) : (
                      <span className="text-sm sm:text-lg" suppressHydrationWarning>{step.number}</span>
                    )}
                  </button>
                  <span 
                    className={`text-xs sm:text-sm mt-1 sm:mt-2 ${currentStep === step.number ? 'text-primary-500 font-medium' : 'text-dark-300'}`}
                    suppressHydrationWarning
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-3 sm:w-12 mx-1 sm:mx-2 ${
                      isStepComplete(step.number)
                        ? 'bg-primary-500'
                        : 'bg-dark-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-dark-50 mb-2">
                    What type of loan are you interested in?
                  </label>
                  <div className="grid gap-2">
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
                            ? 'border-primary-500 bg-primary-500/10 scale-[1.02] shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] ring-2 ring-primary-500/50'
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
                    className={`select w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-dark-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="loanAmount"
                      name="loanAmount"
                      required
                      className="input w-full pl-8 pr-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, loanAmount: e.target.value }))}
                      placeholder="0.00"
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
                    className={`select w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
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
                    className={`input w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
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
                    className={`input w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
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
                    className={`input w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
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
                    className={`textarea w-full px-4 py-2 text-black rounded-lg border border-dark-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us more about your investment goals..."
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-dark-700 hover:bg-dark-600 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNextStep}
                disabled={isSubmitting}
                className={`relative px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 flex items-center gap-2 ml-auto overflow-hidden ${
                  currentStep === 5
                    ? 'bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800'
                    : 'bg-primary-600 hover:bg-primary-500'
                } ${submitClicked ? 'animate-click' : ''}`}
              >
                {currentStep === 5 ? (
                  <>
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-pulse">Submitting...</span>
                        <div className="absolute inset-0 bg-emerald-400/20 animate-shimmer"></div>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Submit</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    Next Step
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
                {submitClicked && !isSubmitting && (
                  <div className="ripple absolute bg-white/30 rounded-full animate-ripple"></div>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-dark-900/90 backdrop-blur-sm z-50"
        >
          <SuccessMessage
            title="Thank You!"
            message="We've received your loan application and will contact you soon to discuss your options."
            onClose={() => {
              setShowSuccess(false);
              setFormData(initialFormData);
              setCurrentStep(1);
            }}
          />
        </motion.div>
      )}

      <style jsx>{`
        .animate-click {
          animation: click 0.4s ease-out;
        }
        
        @keyframes click {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .ripple {
          transform: scale(0);
          animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
}
