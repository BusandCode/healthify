import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto">
        {/* Email and Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div className="text-lg sm:text-xl font-medium text-center sm:text-left w-full sm:w-auto">
            Healthify@gmail.com
          </div>
          <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-end w-full sm:w-auto">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/20 mb-6 sm:mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-0">
          {/* Copyright */}
          <div className="flex items-center text-xs sm:text-sm text-white/80 order-2 sm:order-1">
            <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center mr-2">
              <span className="text-xs">©</span>
            </div>
            2025 Healthify
          </div>

          {/* Legal Links */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs sm:text-sm order-1 sm:order-2 text-center sm:text-right">
            <a href="#" className="hover:text-white/80 transition-colors whitespace-nowrap">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white/80 transition-colors whitespace-nowrap">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Large Brand Text */}
        <div className="mt-6 sm:mt-8 text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-white/90 select-none break-words">
            HEALTHIFY
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;