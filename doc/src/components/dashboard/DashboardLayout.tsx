import { ReactNode } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  doctor: {
    fullName: string;
    specialization: string;
  } | null; // Accept doctor or null
}

export function DashboardLayout({ doctor }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar doctor={doctor} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </main>
    </div>
  );
}
