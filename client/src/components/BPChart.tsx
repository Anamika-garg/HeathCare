import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import type { BPReading } from '../lib/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BPChartProps {
  readings: BPReading[] | null; // Allow readings to be null
}

export function BPChart({ readings }: BPChartProps) {
  if (!readings || !Array.isArray(readings) || readings.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-center text-gray-600">
          No blood pressure readings available. Please add some readings to view the chart and insights.
        </h3>
      </div>
    );
  }

  const sortedReadings = [...readings].sort(
    (a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
  );

  const data = {
    labels: sortedReadings.map((r) =>
      format(new Date(r.measuredAt), 'MMM d, h:mm a')
    ),
    datasets: [
      {
        label: 'Systolic',
        data: sortedReadings.map((r) => r.systolic),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Diastolic',
        data: sortedReadings.map((r) => r.diastolic),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Blood Pressure History',
      },
    },
    scales: {
      y: {
        min: 40,
        max: 200,
        title: {
          display: true,
          text: 'mmHg',
        },
      },
    },
  };

  const getInsights = () => {
    const avgSystolic = Math.round(
      readings.reduce((sum, r) => sum + r.systolic, 0) / readings.length
    );
    const avgDiastolic = Math.round(
      readings.reduce((sum, r) => sum + r.diastolic, 0) / readings.length
    );

    let status;
    if (avgSystolic < 120 && avgDiastolic < 80) {
      status = 'Normal';
    } else if (avgSystolic < 130 && avgDiastolic < 80) {
      status = 'Elevated';
    } else if (avgSystolic < 140 || avgDiastolic < 90) {
      status = 'Stage 1 Hypertension';
    } else {
      status = 'Stage 2 Hypertension';
    }

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Insights</h3>
        <p>Average BP: {avgSystolic}/{avgDiastolic} mmHg</p>
        <p>
          Status: <span className="font-medium">{status}</span>
        </p>
        {status !== 'Normal' && (
          <p className="mt-2 text-sm text-gray-600">
            Consider consulting with your healthcare provider about your blood
            pressure readings.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Line options={options} data={data} />
      {getInsights()}
    </div>
  );
}
