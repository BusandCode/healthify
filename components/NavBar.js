// components/NavBar.jsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Calendar, Bookmark, User } from 'lucide-react';
import { signOut } from '@/app/actions/auth';

const NavBar = () => {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { id: 'Home', label: 'Home', icon: Home, href: '/dashboard' },
    { id: 'Explore', label: 'Explore', icon: Search, href: '/dashboard/explore' },
    { id: 'Bookings', label: 'Bookings', icon: Calendar, href: '/dashboard/bookings' },
    { id: 'Saved', label: 'Saved', icon: Bookmark, href: '/dashboard/saved' },
    { id: 'Profile', label: 'Profile', icon: User, href: '/profile' },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation - Left Sidebar */}
      <nav className="hidden fixed left-0 top-[80px] bg-[#FAFAFA] shadow-xl 
       backdrop-blur-sm border border-white/20 w-[170px] min-h-[calc(100vh-80px)] 
       lg:flex flex-col items-center z-40">
        
        {/* Navigation Items Container - positioned at top */}
        <div className="flex flex-col items-center gap-6 pt-8">
          {navItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href || 
              (item.id === 'Home' && !navItems.some(navItem => pathname === navItem.href));
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col cursor-pointer items-center gap-1.5 px-8 py-3 rounded-xl transition-all duration-300 ease-out 
                 hover:bg-indigo-50 hover:-translate-y-0.5 w-[75px] group ${
                isActive ? 'bg-indigo-100' : ''
                }`}
              >
                <div className={`min-w-7 cursor-pointer min-h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#4203a9] text-white scale-110' 
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  <IconComponent size={15} />
                </div>
                <span className={`text-[14px] cursor-pointer font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'text-[#4203a9] font-semibold' 
                    : 'text-slate-500 group-hover:text-slate-700'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Profile Section - positioned at bottom */}
        <Link
          href="/profile"
          className="mt-auto mb-6 w-12 h-12 rounded-full
          bg-gradient-to-br from-slate-200 to-slate-300 border-2
          border-slate-100 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        >
          <User size={25} className="text-slate-600" />
        </Link>
        
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className='mb-10 w-3/4 bg-[#4203a9] cursor-pointer text-white py-3 px-4 rounded-md font-medium hover:bg-[#4203a9]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </button>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FAFAFA] shadow-xl backdrop-blur-sm border-t border-white/20 z-50">
        <div className="flex justify-around items-center py-4 px-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href || 
              (item.id === 'Home' && !navItems.some(navItem => pathname === navItem.href));
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col cursor-pointer items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 ease-out hover:bg-indigo-50"
              >
                <div className={`min-w-7 cursor-pointer min-h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#4203a9] text-white scale-110' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  <IconComponent size={15} />
                </div>
                <span className={`text-[11px] cursor-pointer font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'text-[#4203a9] font-semibold' 
                    : 'text-slate-500'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default NavBar;