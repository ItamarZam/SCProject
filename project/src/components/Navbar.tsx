import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#features" className="nav-link">Features</a>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>

          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;