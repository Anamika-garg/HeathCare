import React, { useState } from 'react';
import { api } from '../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function BPForm() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const reading = {
        systolic: Number(systolic),
        diastolic: Number(diastolic),
        notes,
        measuredAt: new Date(),
      };

      await api.addReading(reading); // API call to add a new reading
      toast.success('Blood pressure reading added successfully!');
      setSystolic('');
      setDiastolic('');
      setNotes('');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while adding the reading.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.5rem', color: '#3b82f6' }}>💓</span> Add Blood Pressure Reading
      </h2>
      <form onSubmit={handleSubmit} style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Systolic</label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="Enter systolic value"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #d1d5db',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Diastolic</label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="Enter diastolic value"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #d1d5db',
              }}
            />
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes (optional)"
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Save Reading
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
