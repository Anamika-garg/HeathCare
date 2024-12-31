import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '../Button';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'authToken' with your actual token key
    setIsLoggedIn(!!token); // Convert token to a boolean value
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">HealthCare</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <a href="/#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="/#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
            <a href="/#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button>My Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
