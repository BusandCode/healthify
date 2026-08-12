import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer
      className="fixed bottom-0 right-0 left-0  z-40
      bg-blue-800 text-white px-4 sm:px-6 lg:px-8 py-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 text-sm text-white/80">
          <span className="text-base font-bold tracking-wide text-white">HEALTHIFY</span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span>© 2025 Healthify</span>
          {/* <span>Hell</span> */}
        </div>

        <div className="flex gap-4 text-xs sm:text-sm text-white/80">
          <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
            Privacy Policy
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-white/80 hidden md:inline">Healthify@gmail.com</span>
          <div className="flex space-x-2">
            <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Instagram size={14} />
            </div>
            <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Twitter size={14} />
            </div>
            <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Facebook size={14} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;