'use client';

import { useState, useCallback } from 'react';

interface PropertySearchProps {
  onPropertySelect: (propertyId: string) => void;
}

export default function PropertySearch({ onPropertySelect }: PropertySearchProps) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!address || !city || !state || !zipCode) {
      setError('Please fill in all address fields');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch('/api/property-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          city,
          state,
          zipCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Property search failed');
      }

      const data = await response.json();
      onPropertySelect(data.propertyId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search property');
    } finally {
      setIsSearching(false);
    }
  }, [address, city, state, zipCode, onPropertySelect]);

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
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={address}
              onChange={(e) => setAddress(e.target.value.toUpperCase())}
              placeholder="e.g., 100 MAIN ST or 100 N MAIN ST W APT 10"
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
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value.toUpperCase())}
              placeholder="e.g., ANYTOWN"
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
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase())}
              placeholder="e.g., CA"
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
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g., 12345 or 12345-6789"
              spellCheck={false}
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
