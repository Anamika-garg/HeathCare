import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-extrabold text-gray-800 tracking-wide">
              DoctorPortal
            </span>
          </div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-5 py-2 text-blue-600 hover:text-blue-700 font-semibold rounded transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Simplify Your Practice <br /> 
              <span className="text-blue-600">With Ease</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Join DoctorPortal to streamline appointments, efficiently manage patient 
              records, and enhance your medical practice like never before.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-lg font-medium"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-block px-8 py-4 bg-white text-blue-600 border border-blue-600 rounded-lg shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105 text-lg font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
              alt="Doctor using tablet"
              className="rounded-lg shadow-xl transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} DoctorPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
