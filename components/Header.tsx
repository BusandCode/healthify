// components/Header.tsx
"use client"
import React, { useEffect, useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/actions/auth';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

// Public nav — shown when signed out, or while on a public-facing route.
// These are hash-anchors into the landing page's sections, so they work from
// any route (navigate home + scroll).
const publicNavLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'FAQ', href: '/#faq' },
]

// Header height per breakpoint — kept as an explicit class (not implicit
// content + padding) so any page that needs to clear the fixed header can
// use the exact same value for its top padding/margin instead of guessing.
// If you change h-16/sm:h-20/lg:h-24 here, update HEADER_OFFSET usages
// (e.g. pt-16 sm:pt-20 lg:pt-24) everywhere else too.
export const HEADER_OFFSET_CLASS = 'pt-16 sm:pt-20 lg:pt-24'

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthChecked(true);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const isSignedIn = authChecked && !!user;

  // Public-facing routes always show the public nav + "Get Started", even for
  // a signed-in user — "Book Appointment" only shows once they're inside the
  // app on a dashboard route. /explore is browsable by anyone, signed in or
  // not, so it stays on the public header too.
  const isPublicRoute = pathname === '/' || pathname.startsWith('/explore');
  const showAppHeader = isSignedIn && !isPublicRoute;

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true);
    setIsMobileMenuOpen(false); // Close mobile menu
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Fixed height (h-16 / sm:h-20 / lg:h-24) instead of letting content +
          py-3 decide the height implicitly — pages below rely on knowing
          this exact number to sit flush under the header. */}
      <header className='fixed top-0 left-0 right-0 w-full bg-white shadow-gray-200 shadow-md flex justify-between items-center h-16 sm:h-20 lg:h-24 px-4 sm:px-6 lg:px-10 z-50'>
        <div>
          <h1 className='text-[20px] sm:text-[25px] lg:text-[40px] text-blue-800 font-bold'>HEALTHIFY</h1>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex gap-10 items-center'>
          {showAppHeader ? (
            <>
              <IoNotificationsOutline className='w-[50px] h-[50px] rounded-[60px] text-gray-500 bg-[#F5F5F5] p-3 cursor-pointer'/>
              <Link href="/dashboard/explore" className='bg-blue-800 cursor-pointer max-w-[250px] h-[62px] p-[15px] rounded-[5px] text-white text-[20px] font-medium'>
                Book Appointment
              </Link>
            </>
          ) : (
            <>
              <nav className='flex gap-8 items-center'>
                {publicNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='text-gray-600 hover:text-blue-800 font-medium text-base transition-colors duration-200'
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link href="/splash" className='bg-blue-800 cursor-pointer h-[62px] flex items-center px-6 rounded-[5px] text-white text-[20px] font-medium'>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center gap-3'>
          {showAppHeader && (
            <IoNotificationsOutline className='w-[35px] h-[35px] rounded-full text-gray-500 bg-[#F5F5F5] p-2 cursor-pointer'/>
          )}

          {/* Hamburger/Close Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='w-[35px] h-[35px] flex items-center justify-center text-blue-800 hover:bg-gray-100 rounded-md transition-colors duration-200'
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
          className='fixed inset-0 bg-opacity-50 z-40 lg:hidden'
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Mobile Menu Header */}
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
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
          {showAppHeader ? (
            <>
              <div className='pt-4 border-t border-gray-200 space-y-3'>
                <Link 
                  href="/dashboard/explore" 
                  onClick={toggleMobileMenu}
                  className='block w-full bg-blue-800 cursor-pointer text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700/90 transition-colors duration-200 text-center'
                >
                  Book Appointment
                </Link>
              </div>

              <div className='pt-4 border-t border-gray-200'>
                <div className='text-center'>
                  <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className='text-blue-800 hover:text-blue-800/80 font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isLoggingOut ? 'Logging Out...' : 'Log Out'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <nav className='space-y-1'>
                {publicNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className='block py-2.5 px-2 text-gray-700 hover:text-blue-800 font-medium text-base rounded-md hover:bg-gray-50 transition-colors duration-200'
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className='pt-4 border-t border-gray-200'>
                <Link
                  href="/splash"
                  onClick={toggleMobileMenu}
                  className='block w-full bg-blue-800 cursor-pointer text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700/90 transition-colors duration-200 text-center'
                >
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Header