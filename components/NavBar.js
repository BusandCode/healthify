"use client"
import React, { useState } from 'react';
import { Home, Search, Calendar, Bookmark, User } from 'lucide-react';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Explore', label: 'Explore', icon: Search },
    { id: 'Bookings', label: 'Bookings', icon: Calendar },
    { id: 'Saved', label: 'Saved', icon: Bookmark },
  ];

  const handleNavClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      {/* Navigation Bar */}
      <nav className="fixed left-5 top-1/2 transform -translate-y-1/2 bg-white rounded-3xl shadow-xl backdrop-blur-sm border border-white/20 py-4 w-20 flex flex-col items-center gap-6 z-50">
        
        {/* Navigation Items */}
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ease-out hover:bg-indigo-50 hover:-translate-y-0.5 min-w-[60px] group ${
                isActive ? 'bg-indigo-100' : ''
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? 'bg-indigo-500 text-white scale-110' 
                  : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
              }`}>
                <IconComponent size={14} />
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${
                isActive 
                  ? 'text-indigo-600 font-semibold' 
                  : 'text-slate-500 group-hover:text-slate-700'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Profile Section */}
        <button
          onClick={() => handleNavClick('Profile')}
          className="mt-2 w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-slate-100 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        >
          <User size={16} className="text-slate-600" />
        </button>
      </nav>
    </div>
  );
};

export default NavBar;