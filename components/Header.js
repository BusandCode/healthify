// components/Header.jsx
"use client"
import React, { useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className='fixed top-0 left-0 right-0 w-full bg-white shadow-gray-200 shadow-md flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 z-50'>
        <div>
          <h1 className='text-[20px] sm:text-[25px] lg:text-[40px] text-[#4203a9] font-bold'>HEALTHIFY</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className='hidden lg:flex gap-10 items-center cursor-pointer'>
          <IoNotificationsOutline className='w-[50px] h-[50px] rounded-[60px] text-gray-500 bg-[#F5F5F5] p-3'/>
          <button className='bg-[#4203a9] cursor-pointer max-w-[250px] h-[62px] p-[15px] rounded-[5px] text-white text-[20px] font-medium'>
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center gap-3 cursor-pointer'>
          {/* Mobile Notification Icon */}
          <IoNotificationsOutline className='w-[35px] h-[35px] rounded-full text-gray-500 bg-[#F5F5F5] p-2'/>
          
          {/* Hamburger/Close Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='w-[35px] h-[35px] flex items-center justify-center text-[#4203a9] hover:bg-gray-100 rounded-md transition-colors duration-200'
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className='w-5 h-5' />
            ) : (
              <FaBars className='w-5 h-5' />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Mobile Menu Header */}
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
          {/* <h2 className='text-lg font-semibold text-[#4203a9]'>Menu</h2> */}
          <button
            onClick={toggleMobileMenu}
            className='w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200'
            aria-label="Close mobile menu"
          >
            <FaTimes className='w-4 h-4' />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className='p-4 space-y-4'>
          {/* Navigation Links */}
          <nav className='space-y-3'>
            <Link href="/home-page" className='block py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-[#4203a9] rounded-md transition-colors duration-200'>
              Home
            </Link>
            <Link href="/explore" className='block py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-[#4203a9] rounded-md transition-colors duration-200'>
              Explore
            </Link>
            <Link href="/bookings" className='block py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-[#4203a9] rounded-md transition-colors duration-200'>
              Bookings
            </Link>
            <Link href="/services" className='block py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-[#4203a9] rounded-md transition-colors duration-200'>
              Services
            </Link>
            <Link href="#" className='block py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-[#4203a9] rounded-md transition-colors duration-200'>
              About Us
            </Link>
            <Link href="#" className='block py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-[#4203a9] rounded-md transition-colors duration-200'>
              Contact
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className='pt-4 border-t border-gray-200 space-y-3'>
            <button className='w-full bg-[#4203a9] cursor-pointer text-white py-3 px-4 rounded-md font-medium hover:bg-[#4203a9]/90 transition-colors duration-200'>
              Book Appointment
            </button>
            
            {/* <div className='flex items-center justify-center gap-2 py-2 text-sm text-gray-600'>
              <IoNotificationsOutline className='w-5 h-5' />
              <span>Notifications</span>
            </div> */}
          </div>

          {/* User Profile Section (if needed) */}
          <div className='pt-4 border-t border-gray-200'>
            <div className='text-center'>
              <button className='text-[#4203a9] hover:text-[#4203a9]/80 font-medium text-sm transition-colors duration-200'>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header