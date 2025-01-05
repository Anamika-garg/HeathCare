
import { UserCircle, Calendar, Stethoscope, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../..//lib/utils';
import { auth } from '../../lib/api/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';


interface SidebarProps {
  className?: string;
  doctor: {
    fullName: string;
    specialization: string;
  } | null;
}

export function Sidebar({ className, doctor }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = async () => {
    await auth.logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold z-[100]">MedPortal</span>
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu} />
      )}

      {/* Sidebar Content - Desktop: Sidebar, Mobile: Dropdown */}
      <div className={cn(
        "fixed z-50 bg-white transition-all duration-300 ease-in-out",
        "lg:static lg:translate-x-0 lg:h-screen lg:w-64",
        "w-64 h-screen top-0 -translate-x-full",
        isOpen && "translate-x-0",
        className
      )}>
        {/* Logo Section - Only visible on desktop */}
        <div className="hidden lg:flex items-center gap-2 px-6 py-5 border-b">
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-semibold">MedPortal</span>
        </div>

        {/* Navigation Links */}
        <nav className={cn(
          "flex-1 px-4 py-6 space-y-2",
          "lg:mt-0 mt-16" // Add top margin on mobile to account for header
        )}>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <UserCircle className="h-5 w-5" />
            <span>My Profile</span>
          </Link>
          <Link
            to="/appointments"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Calendar className="h-5 w-5" />
            <span>My Appointments</span>
          </Link>
        </nav>

        {/* User Section */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {doctor?.fullName || "Loading..."}
              </p>
              <p className="text-xs text-gray-500">
                {doctor?.specialization || "Loading..."}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Content Padding for Mobile Header */}
      <div className="lg:hidden h-16" />
    </>
  );
}