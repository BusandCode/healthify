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
      <main className="lg:ml-[170px] pt-[80px] sm:pt-[100px] flex flex-col gap-[100px]">
        {/* Hospital Cards */}
        <HospitalCard />
      <Footer />
      </main>
    </section>
  )
}

export default page
