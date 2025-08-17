"use client"
import React from 'react'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <section className='flex flex-col lg:flex-row min-h-screen'>
      {/* Welcome Section - Hidden on mobile, visible on larger screens */}
      <div className='hidden lg:flex lg:max-w-[500px] lg:w-full justify-center items-center text-center bg-[#4203a9] min-h-screen rounded-tr-[25px] rounded-br-[25px]'>
        <h1 className='text-[30px] xl:text-[40px] 2xl:text-[50px] text-white font-bold px-8'>
          Welcome to Healthify
        </h1>
      </div>

      {/* Login Section */}
      <div className='flex flex-1 flex-col min-h-screen justify-center items-center px-4 sm:px-6 lg:px-8 py-8'>
        <div className='w-full max-w-[400px]'>
          {/* Login Header */}
          <h2 className='text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-[#4203a9] mb-6 text-center lg:text-left'>
            Welcome Back
          </h2>

          {/* Form */}
          <form className='flex flex-col gap-4'>
            {/* Email */}
            <div className='flex flex-col'>
              <input 
                type="email" 
                name="email"
                className='bg-gray-200/30 text-gray-500 w-full h-[48px] sm:h-[50px] border-[2px] border-gray-500/30 px-3 py-2 rounded-md outline-0 focus:border-[#4203a9] transition-colors text-[14px] sm:text-[16px]'
                placeholder='Email'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col'>
              <input 
                type="password" 
                name="password"
                className='bg-gray-200/30 text-gray-500 w-full h-[48px] sm:h-[55px] border-[2px] border-gray-500/30 px-3 py-2 rounded-md outline-0 focus:border-[#4203a9] transition-colors text-[14px] sm:text-[16px]'
                placeholder='Password'
              />
            </div>

            {/* Forgot Password Link */}
            <div className='text-right mb-2'>
              <Link href="/forgot-password" className='text-[#4203a9] text-[13px] sm:text-[14px] font-medium hover:underline cursor-pointer'>
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              className='mt-2 bg-[#4203a9] hover:bg-[#5a1bb8] active:bg-[#3a0287] transition-colors duration-300 text-white w-full h-[48px] sm:h-[55px] flex justify-center items-center rounded-md touch-manipulation'
            >
              <span className='text-white text-[16px] sm:text-[18px] font-semibold'>
                Log In
              </span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className='text-center mt-4'>
            <span className='text-gray-600 text-[13px] sm:text-[14px]'>
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup"
                className='text-[#4203a9] font-medium hover:underline cursor-pointer'
              >
                Sign up here
              </Link>
            </span>
          </div>

          {/* Divider */}
          <div className='flex items-center my-4'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='px-4 text-gray-500 text-[13px] sm:text-[14px]'>or</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* Google Sign In Button */}
          <div>
            <button 
              type="button"
              className='bg-white border-[2px] border-gray-300 text-gray-700 w-full h-[48px] sm:h-[55px] rounded-md text-[14px] sm:text-[16px] cursor-pointer flex justify-center items-center hover:bg-gray-50 active:bg-gray-100 transition-colors duration-300 touch-manipulation'
            >
              <svg className='w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0' viewBox='0 0 24 24'>
                <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
              </svg>
              <span className='truncate'>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage