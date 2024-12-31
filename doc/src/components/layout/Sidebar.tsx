import { UserCircle, Calendar, Stethoscope, LogOut } from 'lucide-react';
import { cn } from '../..//lib/utils';
import { auth } from '../../lib/api/auth';
import { Link } from 'react-router-dom';

interface SidebarProps {
  className?: string;
  doctor: {
    fullName: string;
    specialization: string;
  } | null;
}

export function Sidebar({ className, doctor }: SidebarProps) {
  const handleLogout = async () => {
    await auth.logout();
  };

  return (
    <div className={cn("flex h-screen w-64 flex-col bg-white border-r", className)}>
      {/* Logo Section */}
      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <Stethoscope className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-semibold">MedPortal</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <UserCircle className="h-5 w-5" />
          <span>My Profile</span>
        </Link>
        <Link
          to="/appointments"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
  );
}
