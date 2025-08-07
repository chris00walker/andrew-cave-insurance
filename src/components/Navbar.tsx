'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed inset-x-0 top-0 bg-gradient-to-r from-brand to-brand-light shadow-lg z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <a href="/" className="text-white font-authority font-bold text-card-title hover:text-caribbean-teal transition-colors duration-200">
          Andrew Cave Insurance
        </a>
        
        <ul className={`${
          isOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-gradient-to-r from-brand to-brand-light md:bg-none space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0 shadow-lg md:shadow-none`}>
          <li>
            <a href="/" className="text-white hover:text-caribbean-teal font-professional font-medium hover:bg-white/10 rounded-lg px-4 py-2 block transition-all duration-200 text-body-small">
              Home
            </a>
          </li>
          <li>
            <a href="/#about" className="text-white hover:text-caribbean-teal font-professional font-medium hover:bg-white/10 rounded-lg px-4 py-2 block transition-all duration-200 text-body-small">
              About
            </a>
          </li>
          <li>
            <a href="/#services" className="text-white hover:text-caribbean-teal font-professional font-medium hover:bg-white/10 rounded-lg px-4 py-2 block transition-all duration-200 text-body-small">
              Services
            </a>
          </li>
          <li>
            <a href="/#testimonials" className="text-white hover:text-caribbean-teal font-professional font-medium hover:bg-white/10 rounded-lg px-4 py-2 block transition-all duration-200 text-body-small">
              Client Stories
            </a>
          </li>
          <li>
            <a href="/#contact" className="text-white hover:text-caribbean-teal font-professional font-medium hover:bg-white/10 rounded-lg px-4 py-2 block transition-all duration-200 text-body-small">
              Contact
            </a>
          </li>
          <li>
            <a href="/blog" className="text-white hover:text-caribbean-teal font-professional font-medium hover:bg-white/10 rounded-lg px-4 py-2 block transition-all duration-200 text-body-small">
              Blog
            </a>
          </li>
        </ul>
        
        <button 
          className="md:hidden text-white text-2xl hover:bg-white/20 rounded p-2 transition-colors duration-200"
          onClick={toggleNav}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
