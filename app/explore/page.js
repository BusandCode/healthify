"use client"
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Image from 'next/image';
import { Search, MapPin } from 'lucide-react';

import Footer from '@/components/Footer';
import React from 'react'
import HospitalCard from '@/components/HospitalCard';

const page = () => {
  return (
    <section className="min-h-screen bg-white">
      <Header />
      <NavBar />

      {/* Main content */}
      <main className="lg:ml-[170px] pt-[80px] sm:pt-[100px]">
        <div>
          <h1 className='font-semibold text-[24px] sm:text-[20px] md:text-[30px] lg:text-[40px]
          lg:max-w-[800px] text-[#4203a9] leading-tight px-2 sm:px-0'>
          Find Healthcare Services</h1>
          
          <div className="max-w-[1094px] flex flex-col gap-3 sm:gap-4 lg:flex-row">
          {/* Hospital Name Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by Name of Hospital"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4203a9] text-gray-700 placeholder-gray-500 text-base"
            />
            <Search className="absolute right-4 top-3.5 text-gray-500" size={20} />
          </div>

          {/* Location Search */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Enter Location"
              // value={location}
              // onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4203a9] focus:border-transparent text-gray-700 placeholder-gray-500 text-sm sm:text-base"
            />
          </div>
        </div>
        </div>
        {/* Hospital Cards */}
        <HospitalCard />
      <Footer />
      </main>
    </section>
  )
}

export default page
