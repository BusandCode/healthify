"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    setIsLoad(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoad(false)
    }, 2000)
  }

  return (
    <section className='flex gap-[180px]'>
      {/* Left Side - Question Mark Icon */}
      <div className='hidden max-w-[500px] w-full md:flex justify-center items-center text-center bg-blue-800 min-h-screen rounded-tr-[25px] rounded-br-[25px]'>
        <div className='flex flex-col items-center'>
          {/* Question Mark Icon */}
          <div className='w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 border-4 border-white rounded-full flex items-center justify-center mb-8'>
            <span className='text-white text-[80px] md:text-[100px] lg:text-[120px] font-light'>?</span>
          </div>
          {/* Small dot indicator */}
          <div className='w-2 h-2 bg-white rounded-full'></div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className='flex max-w-fit mx-auto md:mx-0 flex-col min-h-screen justify-center items-center px-5'>
        <div className='flex justify-center items-start flex-col w-full max-w-[500px]'>
          {/* Header */}
          <h2 className='text-[24px] md:text-[28px] font-semibold text-[#4203a9] mb-4'>
            Forgot Password
          </h2>
          
          {/* Description */}
          <p className='text-gray-600 text-[14px] md:text-[16px] mb-6 leading-relaxed'>
            Enter your registered email address, and we&apos;ll send you a link to reset your password.
          </p>

          {/* Form */}
          <div className='flex flex-col gap-4 w-full'>
            {/* Email Input */}
            <div className='flex flex-col'>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-200/30 text-gray-700 w-full h-[55px] border-[2px] border-gray-500/30 p-4 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
                placeholder='Email'
              />
            </div>

            {/* Send Reset Link Button */}
            <div onClick={handleSubmit} className='bg-blue-800 cursor-pointer hover:bg-[#5a1bb8] transition-colors duration-300 text-white w-full h-[55px] flex justify-center items-center rounded-md'>
              {isLoad ?
                <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto'></div>
                : <button 
                    className='text-white text-[16px] cursor-pointer font-medium flex justify-center items-center'
                  >
                    Send Reset Link
                  </button>
              }
            </div>

            {/* Remember Password Link */}
            <div className='text-center mt-4'>
              <span className='text-gray-600 text-[14px]'>
                Remember your Password?{' '}
                <Link href="/login"
                  className='text-[#4203a9] font-medium hover:underline cursor-pointer'
                >
                  Log In Here
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPasswordPage