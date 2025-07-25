// components/NavBar.jsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Calendar, Bookmark, User } from 'lucide-react';

const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { id: 'Home', label: 'Home', icon: Home, href: '/home-page' },
    { id: 'Explore', label: 'Explore', icon: Search, href: '/explore' },
    { id: 'Bookings', label: 'Bookings', icon: Calendar, href: '/bookings' },
    { id: 'Saved', label: 'Saved', icon: Bookmark, href: '/saved' },
  ];

  return (
    <nav className="hidden fixed left-0 top-[80px] bg-[#FAFAFA] shadow-xl 
    backdrop-blur-sm border border-white/20 w-[170px] min-h-[calc(100vh-80px)]
     lg:flex flex-col items-center z-40">
      
      {/* Navigation Items Container - positioned at top */}
      <div className="flex flex-col items-center gap-6 pt-8">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          // Make Home active by default if current path doesn't match any nav item
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
      {/* <Link
        href="/profile"
        className="mt-auto mb-6 w-12 h-12 rounded-full
        bg-gradient-to-br from-slate-200 to-slate-300 border-2
        border-slate-100 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
      >
        <User size={25} className="text-slate-600" />
      </Link> */}
      <button className='mt-auto mb-10 w-3/4 bg-[#4203a9] cursor-pointer text-white py-3 px-4 rounded-md font-medium hover:bg-[#4203a9]/90 transition-colors duration-200'>
        Log out
      </button>
    </nav>
  );
};

export default NavBar;