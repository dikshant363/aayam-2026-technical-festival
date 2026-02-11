
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Linkedin, Phone, Mail, MessageCircle } from 'lucide-react';
import { NAV_ITEMS, EVENT_DATE } from '../constants';

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Countdown logic
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(EVENT_DATE) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft as { days: number, hours: number, minutes: number, seconds: number };
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col min-h-screen font-body text-dark">
      {/* Top Bar with Countdown */}
      <div className="bg-primary text-white py-2 px-4 text-sm hidden md:flex justify-between items-center z-50 relative">
        <div className="flex items-center space-x-4">
          <span>March 12-13, 2026</span>
          <span>•</span>
          <span>BMEF Campus, Surat</span>
        </div>
        <div className="flex items-center space-x-2 font-mono">
          <span>Countdown:</span>
          <span className="font-bold text-secondary">
            {timeLeft.days || 0}d {timeLeft.hours || 0}h {timeLeft.minutes || 0}m {timeLeft.seconds || 0}s
          </span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <NavLink to="/" className="flex-shrink-0 flex items-center justify-center">
                <img src="/assets/images/aayam-logo-full.png" alt="Aayam Logo" className="h-20 w-auto object-contain" />
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-semibold transition-colors ${isActive ? 'text-secondary' : 'text-gray-600 hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/packages" className="ml-4 bg-secondary hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold shadow-lg transform hover:-translate-y-0.5 transition-all text-sm">
                Sponsor Us
              </NavLink>
              <img src="/assets/images/bmu-logo.png" alt="BMU Logo" className="h-20 w-auto object-contain ml-6" />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-4 rounded-md text-base font-medium border-b border-gray-50 ${isActive ? 'text-secondary bg-gray-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-4 pb-2">
                <NavLink to="/packages" className="block text-center w-full bg-secondary text-white px-4 py-3 rounded-md font-bold">
                  Become a Sponsor
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/assets/images/aayam-logo-footer.png" alt="Aayam Logo" className="h-12 w-auto object-contain mr-2 bg-white rounded p-1" />
                <span className="text-xl font-bold">AAYAM 2026</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                The biggest technical festival of South Gujarat, bringing together innovation, talent, and technology under one roof.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/aayam2k26/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><Facebook size={18} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 border-b-2 border-secondary inline-block pb-1">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><NavLink to="/about" className="hover:text-white transition-colors">About Us</NavLink></li>
                <li><NavLink to="/events" className="hover:text-white transition-colors">Events</NavLink></li>
                <li><NavLink to="/packages" className="hover:text-white transition-colors">Sponsorship</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-white transition-colors">Contact</NavLink></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 border-b-2 border-secondary inline-block pb-1">Contact Info</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start">
                  <Mail className="mt-1 mr-3 flex-shrink-0 text-secondary" size={16} />
                  <span>sponsorship@aayam2026.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="mt-1 mr-3 flex-shrink-0 text-secondary" size={16} />
                  <span>+91 8732991144</span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 flex-shrink-0 text-secondary">📍</span>
                  <span>BMEF Campus, VIP Road,<br />Vesu, Surat-395017</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 border-b-2 border-secondary inline-block pb-1">Location</h3>
              <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.298286950346!2d72.77977431493457!3d21.14048598593802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0527375e25223%3A0x6758801264c3971!2sBhagwan%20Mahavir%20University!5e0!3m2!1sen!2sin!4v1677834567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="BMU Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2026 AAYAM Technical Festival. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <NavLink to="/admin" className="hover:text-gray-300">Admin Login</NavLink>
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918732991144"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all z-50 hover:scale-110 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" strokeWidth={1.5} />
      </a>
    </div>
  );
};

export default Layout;
