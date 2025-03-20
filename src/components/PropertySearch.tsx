'use client';

import { useState, useCallback } from 'react';
import { PropertyDetail } from '@/types/attom';
import { InvestmentMetrics } from '@/types/investment';

interface SearchResult {
  property: PropertyDetail;
  investmentMetrics: InvestmentMetrics;
}

interface PropertySearchProps {
  onPropertySelect: (result: SearchResult) => void;
}

export default function PropertySearch({ onPropertySelect }: PropertySearchProps) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('7.5');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!address) {
      setError('Street address is required');
      return;
    }

    if (Number(downPayment) >= Number(purchasePrice)) {
      setError('Down payment cannot be greater than or equal to purchase price');
      return;
    }

    if (Number(interestRate) <= 0 || Number(interestRate) >= 100) {
      setError('Please enter a valid interest rate between 0 and 100');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch('/api/attom/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          city,
          state,
          zip: zipCode,
          purchasePrice: Number(purchasePrice),
          downPayment: Number(downPayment),
          interestRate: Number(interestRate),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Property search failed');
      }

      onPropertySelect({
        property: data.property,
        investmentMetrics: {
          ...data.investmentMetrics,
          rentalStrategies: data.rentalStrategies,
          aiAnalysis: data.analysis
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search property');
    } finally {
      setIsSearching(false);
    }
  }, [address, city, state, zipCode, purchasePrice, downPayment, interestRate, onPropertySelect]);

  return (
    <section className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Property Search</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
              value={address}
              onChange={(e) => setAddress(e.target.value.toUpperCase())}
              placeholder="e.g., 4529 WINONA COURT"
              required
              spellCheck={false}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300">
              City
            </label>
            <input
              type="text"
              id="city"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
              value={city}
              onChange={(e) => setCity(e.target.value.toUpperCase())}
              placeholder="e.g., DENVER"
              spellCheck={false}
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-300">
              State
            </label>
            <input
              type="text"
              id="state"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase())}
              placeholder="e.g., CO"
              maxLength={2}
              spellCheck={false}
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g., 80212"
              spellCheck={false}
            />
          </div>
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-300">
              Purchase Price
            </label>
            <input
              type="number"
              id="purchasePrice"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="e.g., 500000"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="downPayment" className="block text-sm font-medium text-gray-300">
              Down Payment
            </label>
            <input
              type="number"
              id="downPayment"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g., 125000"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-300">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="7.5"
              step="0.125"
              min="0"
              max="100"
              required
            />
          </div>
          <div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSearching ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </div>
              ) : (
                'Search Property'
              )}
            </button>
          </div>
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-md p-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
