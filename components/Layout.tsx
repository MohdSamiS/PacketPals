import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Network, Terminal, Activity, Wrench, Info, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../services/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Network size={18} /> },
    { name: 'Packets', path: '/packets', icon: <Terminal size={18} /> },
    { name: 'Tools', path: '/tools', icon: <Wrench size={18} /> },
    { name: 'Transitions', path: '/transitions', icon: <Activity size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-brand-text selection:bg-brand-accent selection:text-brand-dark font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-brand-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-cloud to-brand-accent rounded flex items-center justify-center group-hover:shadow-lg group-hover:shadow-brand-accent/20 transition-all">
                <Network className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Packet<span className="text-brand-accent">Pals</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-brand-accent'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-muted hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-brand-dark">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
                    isActive(link.path)
                      ? 'bg-slate-800 text-brand-accent'
                      : 'text-brand-muted hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Network className="text-brand-accent" size={20} />
                <span className="font-bold text-lg text-white">Packet Pals</span>
              </div>
              <p className="text-brand-muted text-sm max-w-md mb-6">
                Decoding the complex layers of modern infrastructure. A platform built for engineers, architects, and security professionals seeking clarity in a chaotic digital world.
              </p>
              
              {/* Social Icons Row */}
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-muted hover:text-brand-accent transition-colors duration-300 group relative"
                    aria-label={social.name}
                  >
                    <svg 
                      viewBox={social.viewBox || "0 0 24 24"} 
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={social.iconPath} />
                    </svg>
                    
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brand-dark border border-slate-700 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li><Link to="/packets" className="hover:text-brand-accent transition-colors">Packets (Blog)</Link></li>
                <li><Link to="/tools" className="hover:text-brand-accent transition-colors">Tools Dashboard</Link></li>
                <li><Link to="/transitions" className="hover:text-brand-accent transition-colors">Transitions (Feed)</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">RSS Feed</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted">
            <p>© {new Date().getFullYear()} Packet Pals. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;