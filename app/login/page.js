"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const LoginPage = () => {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/home-page')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      // User will be redirected by the auth state change listener
    } catch (error) {
      console.error('Login error:', error)
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address')
          break
        case 'auth/wrong-password':
          setError('Incorrect password')
          break
        case 'auth/invalid-email':
          setError('Invalid email address')
          break
        case 'auth/user-disabled':
          setError('This account has been disabled')
          break
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later')
          break
        default:
          setError('Login failed. Please try again')
      }
    }
    
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      await signInWithPopup(auth, googleProvider)
      // User will be redirected by the auth state change listener
    } catch (error) {
      console.error('Google login error:', error)
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-in was cancelled')
          break
        case 'auth/popup-blocked':
          setError('Pop-up was blocked by your browser')
          break
        default:
          setError('Google sign-in failed. Please try again')
      }
    }

    setIsLoading(false)
  }

  // Splash Screen - shows for 3 seconds
  if (showSplash) {
    return (
      <section className='flex justify-center items-center min-h-screen bg-[#4203a9] px-4'>
        <div className='text-center'>
          <h1 className='text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] text-white font-bold animate-pulse leading-tight'>
            Welcome to Healthify
          </h1>
          <div className='mt-6 sm:mt-8'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto'></div>
          </div>
        </div>
      </section>
    )
  }

  // Main Login Page - shows after splash screen
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

          {/* Error Message */}
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 text-sm'>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className='flex flex-col gap-4'>
            {/* Email */}
            <div className='flex flex-col'>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className='bg-gray-200/30 text-gray-500 w-full h-[48px] sm:h-[50px] border-[2px] border-gray-500/30 px-3 py-2 rounded-md outline-0 focus:border-[#4203a9] transition-colors text-[14px] sm:text-[16px]'
                placeholder='Email'
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className='flex flex-col'>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className='bg-gray-200/30 text-gray-500 w-full h-[48px] sm:h-[55px] border-[2px] border-gray-500/30 px-3 py-2 rounded-md outline-0 focus:border-[#4203a9] transition-colors text-[14px] sm:text-[16px]'
                placeholder='Password'
                disabled={isLoading}
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
              disabled={isLoading}
              className='mt-2 bg-[#4203a9] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a1bb8] active:bg-[#3a0287] transition-colors duration-300 text-white w-full h-[48px] sm:h-[55px] flex justify-center items-center rounded-md touch-manipulation'
            >
              {isLoading ? (
                <div className='w-6 h-6 sm:w-8 sm:h-8 border-3 sm:border-4 border-white border-t-transparent rounded-full animate-spin'></div>
              ) : (
                <span className='text-white text-[16px] sm:text-[18px] font-semibold'>
                  Log In
                </span>
              )}
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
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className='bg-white border-[2px] border-gray-300 text-gray-700 w-full h-[48px] sm:h-[55px] rounded-md text-[14px] sm:text-[16px] cursor-pointer flex justify-center items-center hover:bg-gray-50 active:bg-gray-100 transition-colors duration-300 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed'
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