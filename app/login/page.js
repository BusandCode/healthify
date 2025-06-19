"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const Page = () => {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [])

  // To animate the load div when button is clicked
  const handleLoad = () => {
    setIsLoad(true)
  }

  // Splash Screen - shows for 3 seconds
  if (showSplash) {
    return (
      <section className='flex justify-center items-center min-h-screen bg-[#4203a9]'>
        <div className='text-center px-6'>
          <h1 className='text-[40px] md:text-[50px] lg:text-[60px] text-white font-bold animate-pulse'>
            Welcome to Healthify
          </h1>
          <div className='mt-8'>
            <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto'></div>
          </div>
        </div>
      </section>
    )
  }

  // Main Login Page - shows after splash screen
  return (
    <section className='flex gap-[220px]'>
      {/* Welcome --> Big Screen */}
      <div className='hidden max-w-[500px] w-full md:flex justify-center items-center text-center bg-[#4203a9] min-h-screen rounded-tr-[25px] rounded-br-[25px]'>
        <h1 className='text-[30px] md:text-[40px] lg:text-[50px] text-white font-bold'>
          Welcome to Healthify
        </h1>
      </div>

      {/* Login Page */}
      <div className='flex max-w-fit mx-auto md:mx-0 flex-col min-h-screen justify-center items-center px-5'>
        <div className='flex justify-center items-start flex-col'>
          {/* Login Header */}
          <h2 className='text-[24px] md:text-[28px] font-semibold text-[#4203a9] mb-4 text-center'>
            Welcome Back
          </h2>

          {/* Form */}
          <div className='flex flex-col gap-3 w-[400px] mx-auto'>
            {/* Email */}
             <div className='flex flex-col'>
            <input 
              type="email" 
              className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
              placeholder='Email'
            />
          </div>

            {/* Password */}
            <div className='flex flex-col'>
              <input 
                type="password" 
                className='bg-gray-200/30 text-gray-500 w-full h-[55px] border-[2px] border-gray-500/30 p-4 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
                placeholder='Password'
              />
            </div>

            {/* Forgot Password Link */}
            <div className='text-right mb-2'>
              <Link href="/forgot-password" className='text-[#4203a9] text-[14px] font-medium hover:underline cursor-pointer'>
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <div onClick={handleLoad} className='mt-1 bg-[#4203a9] cursor-pointer hover:bg-[#5a1bb8] transition-colors duration-300 text-white w-full h-[55px] flex justify-center items-center rounded-md'>
              {isLoad ?
                <div className='w-8 h-8 bg-[#4203a9] border-4 border-white border-t-transparent rounded-full animate-spin mx-auto'></div>
                : <button 
                    className='text-white text-[18px] cursor-pointer font-semibold flex justify-center items-center'
                  >
                    Log In
                  </button>
              }
            </div>

            {/* Sign Up Link */}
            <div className='text-center'>
              <span className='text-gray-600 text-[14px]'>
                Don&apos;t have an account?{' '}
                <Link href="/signup"
                  className='text-[#4203a9] font-medium hover:underline cursor-pointer'
                >
                  Sign up here
                </Link>
              </span>
            </div>

            {/* Divider */}
            <div className='flex items-center'>
              <div className='flex-1 h-px bg-gray-300'></div>
              <span className='px-4 text-gray-500 text-[14px]'>or</span>
              <div className='flex-1 h-px bg-gray-300'></div>
            </div>

            {/* Google Sign In Button */}
            <div>
              <button 
                className='bg-white border-[2px] border-gray-300 text-gray-700 w-full h-[55px] rounded-md text-[16px] cursor-pointer flex justify-center items-center hover:bg-gray-50 transition-colors duration-300'
              >
                <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
                  <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                  <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                  <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                  <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page