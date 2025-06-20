import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <div>
        <h1 className='font-semibold lg:text-[50px] max-w-[544px] h-[192px] text-[#4203a9]'>Your Path to Affordable Healthcare Starts Here</h1>
        <p className='text-[#333333] text-[20px] font-medium w-[496px] h-[46px]'>Easily locate providers, view services, and schedule your next visit with confidence</p>
      </div>
    </div>
  )
}

export default page
