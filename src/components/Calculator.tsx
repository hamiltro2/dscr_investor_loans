'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalculatorIcon } from 'lucide-react';

interface CalculatorField {
  name: string;
  label: string;
  type: 'number' | 'select';
  prefix?: string;
  suffix?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

interface CalculatorProps {
  title: string;
  description: string;
  fields: CalculatorField[];
  onCalculate: (values: Record<string, number | string>) => { result: number; details?: Record<string, number | string> };
  resultPrefix?: string;
  resultSuffix?: string;
  resultTitle?: string;
  tips?: string[];
  titleClassName?: string;
  descriptionClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  resultClassName?: string;
  tipsClassName?: string;
}

export function Calculator({
  title,
  description,
  fields,
  onCalculate,
  resultPrefix = '$',
  resultSuffix = '',
  resultTitle = 'Result',
  tips = [],
  titleClassName = '',
  descriptionClassName = '',
  inputClassName = '',
  labelClassName = '',
  resultClassName = '',
  tipsClassName = '',
}: CalculatorProps) {
  const [values, setValues] = useState<Record<string, number | string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<string, number | string>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsCalculated(false);
  };

  const handleCalculate = () => {
    const { result, details = {} } = onCalculate(values);
    setResult(result);
    setDetails(details);
    setIsCalculated(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  return (
    <div className="card p-6 bg-dark-900/50">
      <div className="flex items-center gap-3 mb-4">
        <CalculatorIcon className="w-6 h-6 text-primary-500" />
        <h3 className={`text-xl font-semibold text-dark-50 ${titleClassName}`}>{title}</h3>
      </div>
      <p className={`text-dark-200 mb-6 ${descriptionClassName}`}>{description}</p>
      
      <div className="grid gap-6 mb-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className={`block text-sm font-medium text-dark-100 mb-2 ${labelClassName}`}>
              {field.label}
            </label>
            <div className="relative">
              {field.prefix && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-dark-400">{field.prefix}</span>
                </div>
              )}
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  value={values[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`block w-full rounded-md border-0 bg-dark-800 text-dark-100 shadow-sm ring-1 ring-inset ring-dark-700 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 pl-3 pr-10 py-2 ${inputClassName}`}
                >
                  <option value="">Select...</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  id={field.name}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`block w-full rounded-md border-0 bg-dark-800 text-dark-100 shadow-sm ring-1 ring-inset ring-dark-700 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 ${
                    field.prefix ? 'pl-8' : 'pl-3'
                  } ${field.suffix ? 'pr-12' : 'pr-3'} py-2 ${inputClassName}`}
                  placeholder="0"
                />
              )}
              {field.suffix && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-dark-400">{field.suffix}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        className="w-full btn-primary mb-6"
      >
        Calculate
      </button>

      {isCalculated && result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-dark-800 p-4 mb-6"
        >
          <div className="text-center mb-4">
            <div className={`text-2xl font-bold text-primary-500 ${resultClassName}`}>
              {resultTitle} {resultPrefix}
              {typeof result === 'number' && result > 1
                ? formatCurrency(result).replace('$', '')
                : result.toFixed(2)}
              {resultSuffix}
            </div>
          </div>
          
          {Object.entries(details).length > 0 && (
            <div className="border-t border-dark-700 pt-4">
              <div className={`text-sm font-medium text-dark-200 mb-2 ${resultClassName}`}>Details</div>
              <div className="space-y-2">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className={`flex justify-between text-sm ${resultClassName}`}>
                    <span className="text-dark-300">{key}:</span>
                    <span className="text-dark-100 font-medium">
                      {typeof value === 'number' && value > 1
                        ? formatCurrency(value)
                        : typeof value === 'number'
                        ? formatPercentage(value)
                        : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {tips.length > 0 && (
        <div className="rounded-lg bg-dark-800/50 p-4">
          <div className={`text-sm font-medium mb-2 text-white ${tipsClassName}`}>Tips</div>
          <ul className={`list-disc list-inside space-y-1 text-white ${tipsClassName}`}>
            {tips.map((tip, index) => (
              <li key={index} className={`text-sm text-white ${tipsClassName}`}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
