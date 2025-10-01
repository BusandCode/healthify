"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { signUp, signInWithGoogle } from '../actions/auth'

const SignupPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    
    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    
    try {
      const result = await signUp(formData)
      
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
      console.error('Signup error:', err)
    }
  }

  async function handleGoogleSignUp() {
    setGoogleLoading(true)
    setError(null)
    
    try {
      const result = await signInWithGoogle()
      
      if (result?.error) {
        setError(result.error)
        setGoogleLoading(false)
      }
      // If successful, redirect will happen automatically
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.')
      setGoogleLoading(false)
      console.error('Google sign up error:', err)
    }
  }

  return (
    <section className='flex gap-[220px]'>
      {/* Welcome --> Big Screen */}
      <div className='hidden max-w-[500px] w-full md:flex justify-center items-center text-center bg-[#4203a9] min-h-screen rounded-tr-[25px] rounded-br-[25px]'>
        <h1 className='text-[30px] md:text-[40px] lg:text-[50px] text-white font-bold'>
          Welcome to Healthify
        </h1>
      </div>

      {/* Sign up Page */}
      <div className='flex max-w-fit mx-auto md:mx-0 flex-col min-h-screen justify-center items-center px-5'>
        <div className='flex justify-center items-start flex-col'>
          {/* Create Account Header */}
          <h2 className='text-[24px] md:text-[28px] font-semibold text-[#4203a9] mb-4 text-center'>
            Create Account
          </h2>

          {/* Error Message */}
          {error && (
            <div className='w-full max-w-[400px] mb-3 p-3 bg-red-50 border border-red-200 rounded-md'>
              <p className='text-red-600 text-sm'>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full max-w-[400px]'>
            {/* First Name and Surname Row */}
            <div className='flex lg:flex-c gap-3'>
              <div className='flex flex-col flex-1'>
                <input 
                  type="text" 
                  name="firstName"
                  required
                  disabled={loading}
                  className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors disabled:opacity-50'
                  placeholder='First Name'
                />
              </div>
              <div className='flex flex-col flex-1'>
                <input 
                  type="text" 
                  name="lastName"
                  required
                  disabled={loading}
                  className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors disabled:opacity-50'
                  placeholder='Surname'
                />
              </div>
            </div>

            {/* Email */}
            <div className='flex flex-col'>
              <input 
                type="email" 
                name="email"
                required
                disabled={loading}
                className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors disabled:opacity-50'
                placeholder='Email'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col relative'>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={6}
                disabled={loading}
                className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 pr-12 rounded-md outline-0 focus:border-[#4203a9] transition-colors disabled:opacity-50'
                placeholder='Password'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                disabled={loading}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className='flex flex-col relative'>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                minLength={6}
                disabled={loading}
                className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 pr-12 rounded-md outline-0 focus:border-[#4203a9] transition-colors disabled:opacity-50'
                placeholder='Confirm Password'
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Create Account Button with Loading Animation */}
            <button 
              type="submit"
              disabled={loading}
              className='mt-1 bg-[#4203a9] hover:bg-[#5a1bb8] transition-colors duration-300 text-white w-full h-[50px] flex justify-center items-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <>
                  <svg 
                    className='animate-spin h-5 w-5 mr-3 text-white' 
                    xmlns='http://www.w3.org/2000/svg' 
                    fill='none' 
                    viewBox='0 0 24 24'
                  >
                    <circle 
                      className='opacity-25' 
                      cx='12' 
                      cy='12' 
                      r='10' 
                      stroke='currentColor' 
                      strokeWidth='4'
                    />
                    <path 
                      className='opacity-75' 
                      fill='currentColor' 
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  <span className='text-white text-[18px] font-semibold'>
                    Creating Account...
                  </span>
                </>
              ) : (
                <span className='text-white text-[18px] font-semibold'>
                  Create Account
                </span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className='text-center mt-3 w-full max-w-[400px]'>
            <span className='text-gray-600 text-[14px]'>
              Already have an account?{' '}
              <Link href="/login"
                className='text-[#4203a9] font-medium hover:underline cursor-pointer'
              >
                Log in here
              </Link>
            </span>
          </div>

          {/* Divider */}
          <div className='flex items-center my-4 w-full max-w-[400px]'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='px-4 text-gray-500 text-[14px]'>or</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* Google Sign Up Button */}
          <div className='w-full max-w-[400px]'>
            <button 
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading || googleLoading}
              className='bg-white border-[2px] border-gray-300 text-gray-700 w-full h-[50px] rounded-md text-[16px] cursor-pointer flex justify-center items-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {googleLoading ? (
                <>
                  <svg 
                    className='animate-spin h-5 w-5 mr-3 text-gray-700' 
                    xmlns='http://www.w3.org/2000/svg' 
                    fill='none' 
                    viewBox='0 0 24 24'
                  >
                    <circle 
                      className='opacity-25' 
                      cx='12' 
                      cy='12' 
                      r='10' 
                      stroke='currentColor' 
                      strokeWidth='4'
                    />
                    <path 
                      className='opacity-75' 
                      fill='currentColor' 
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  <span>Signing up...</span>
                </>
              ) : (
                <>
                  <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
                    <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                    <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                    <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                    <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
                  </svg>
                  Sign up with Google
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupPage