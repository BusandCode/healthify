"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

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

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleEmailSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      )
      
      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      })
      
      // User will be redirected by the auth state change listener
    } catch (error) {
      console.error('Signup error:', error)
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists')
          break
        case 'auth/invalid-email':
          setError('Invalid email address')
          break
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled')
          break
        case 'auth/weak-password':
          setError('Password is too weak')
          break
        default:
          setError('Account creation failed. Please try again')
      }
    }
    
    setIsLoading(false)
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    setError('')

    try {
      await signInWithPopup(auth, googleProvider)
      // User will be redirected by the auth state change listener
    } catch (error) {
      console.error('Google signup error:', error)
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-up was cancelled')
          break
        case 'auth/popup-blocked':
          setError('Pop-up was blocked by your browser')
          break
        case 'auth/account-exists-with-different-credential':
          setError('An account already exists with the same email address')
          break
        default:
          setError('Google sign-up failed. Please try again')
      }
    }

    setIsLoading(false)
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
            <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 text-sm w-full max-w-[400px]'>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSignup} className='flex flex-col gap-3 w-full max-w-[400px]'>
            {/* First Name and Surname Row */}
            <div className='flex gap-3'>
              <div className='flex flex-col flex-1'>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
                  placeholder='First Name'
                  disabled={isLoading}
                />
              </div>
              <div className='flex flex-col flex-1'>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
                  placeholder='Surname'
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div className='flex flex-col'>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
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
                className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
                placeholder='Password'
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password */}
            <div className='flex flex-col'>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className='bg-gray-200/30 text-gray-500 w-full h-[50px] border-[2px] border-gray-500/30 p-3 rounded-md outline-0 focus:border-[#4203a9] transition-colors'
                placeholder='Confirm Password'
                disabled={isLoading}
              />
            </div>

            {/* Create Account Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className='mt-1 bg-[#4203a9] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a1bb8] transition-colors duration-300 text-white w-full h-[50px] flex justify-center items-center rounded-md'
            >
              {isLoading ? (
                <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto'></div>
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
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className='bg-white border-[2px] border-gray-300 text-gray-700 w-full h-[50px] rounded-md text-[16px] cursor-pointer flex justify-center items-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
                <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c .87-2.6 3.3-4.53 6.16-4.53z'/>
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupPage