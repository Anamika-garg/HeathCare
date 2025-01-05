import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Navbar */}
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600" />
            <span className="ml-2 text-xl sm:text-2xl font-extrabold text-gray-800 tracking-wide">
              DoctorPortal
            </span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-4">
            <Link
              to="/login"
              className="px-4 sm:px-5 py-2 text-blue-600 hover:text-blue-700 font-semibold rounded transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 sm:px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden mt-4 py-4 border-t">
            <div className="flex flex-col items-center space-y-3 px-4">
              <Link
                to="/login"
                className="w-full max-w-[200px] px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold rounded transition-colors text-center border border-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full max-w-[200px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform font-semibold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Rest of the component remains the same */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 mt-4 sm:mt-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Simplify Your Practice{' '}
              <span className="text-blue-600 block sm:inline">With Ease</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join DoctorPortal to streamline appointments, efficiently manage patient 
              records, and enhance your medical practice like never before.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-base sm:text-lg font-medium w-full sm:w-auto text-center"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-blue-600 border border-blue-600 rounded-lg shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105 text-base sm:text-lg font-medium w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
              alt="Doctor using tablet"
              className="rounded-lg shadow-xl transition-transform transform hover:scale-105 w-full max-w-2xl mx-auto"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} DoctorPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}