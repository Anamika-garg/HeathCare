import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Health,</span>
            <span className="block text-blue-600">Our Priority</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience healthcare made simple. Book appointments, find nearby hospitals, and manage your medical records all in one place.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link to="/#features">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}