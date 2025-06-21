import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white px-8 py-12">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto">
        {/* Email and Social Icons */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-xl font-medium">
            Healthify@gmail.com
          </div>
          <div className="flex space-x-4">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Instagram size={16} />
            </div>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Twitter size={16} />
            </div>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Facebook size={16} />
            </div>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/20 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          {/* Copyright */}
          <div className="flex items-center text-sm text-white/80">
            <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center mr-2">
              <span className="text-xs">©</span>
            </div>
            2024 Healthify
          </div>

          {/* Legal Links */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white/80 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Large Brand Text */}
        <div className="mt-8">
          <h1 className="text-8xl font-bold tracking-wider text-white/90 select-none">
            HEALTHIFY
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;