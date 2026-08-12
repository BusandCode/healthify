"use client"
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer';
import React from 'react'
import HospitalCard from '@/components/HospitalCard';

const page = () => {
  return (
    <section className="min-h-screen bg-white">
      <Header />
      <NavBar />

      <main className="lg:ml-[170px] pt-[80px] sm:pt-[100px] pb-20 lg:pb-[120px] flex flex-col gap-[100px]">
        <HospitalCard />
      </main>

      <Footer />
    </section>
  )
}

export default page