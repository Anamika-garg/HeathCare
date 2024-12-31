import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white" id="contact">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">HealthCare</span>
            </div>
            <p className="mt-4 text-gray-500">Making healthcare accessible for everyone.</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-gray-900">About</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-gray-900">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/privacy" className="text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Social</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400">&copy; 2024 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}