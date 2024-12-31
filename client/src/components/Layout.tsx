import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Building2, Calendar, User, LogOut, HeartPulse } from 'lucide-react'; // Add HeartPulse for BP tracker icon
import { Button } from './Button';
import { AuthContext } from '../Context/AuthContext'; // Import AuthContext for logout

const NavLink = ({ to, icon: Icon, children }: { to: string; icon: React.ElementType; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-lg ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {children}
    </Link>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Access logout function from AuthContext

  const handleLogout = () => {
    logout(); // Clear authentication token
    navigate('/'); // Navigate to the login page or landing page
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg p-4 fixed top-0 left-0 h-full">
        <div className="flex items-center mb-8">
          <Home className="w-6 h-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold">HealthCare</span>
        </div>
        <div className="space-y-2">
          <NavLink to="/dashboard" icon={Home}>Dashboard</NavLink>
          <NavLink to="/hospitals" icon={Building2}>Hospitals</NavLink>
          <NavLink to="/appointments" icon={Calendar}>Appointments</NavLink>
          <NavLink to="/bp-tracker" icon={HeartPulse}>BP Tracker</NavLink> {/* Added BP Tracker link */}
          <Button
            variant="outline"
            className="w-full mt-4 flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
}
