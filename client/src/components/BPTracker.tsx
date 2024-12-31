import React, { useEffect, useState } from 'react';
import { BPForm } from './BPForm';
import { BPChart } from './BPChart';
import { api, type BPReading } from '../lib/api';
import { handleError } from '../lib/error';
import { Activity } from 'lucide-react';

export function BPTracker() {
  const [readings, setReadings] = useState<BPReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReadings = async () => {
    try {
      const data = await api.getReadings();
      setReadings(data);
      setError(null);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Activity className="text-blue-500" />
            Blood Pressure Tracker
          </h1>
          <p className="mt-2 text-gray-600">Monitor and track your blood pressure readings over time</p>
        </header>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <BPForm onNewReading={fetchReadings} />
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <BPChart readings={readings} />
        )}
      </div>
    </div>
  );
}