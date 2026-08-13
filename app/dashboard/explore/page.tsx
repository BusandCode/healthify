"use client"
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
// import Footer from '@/components/Footer';
import React from 'react'
import HospitalCard from '@/components/HospitalCard';

const page = () => {
  return (
    <section className="min-h-screen bg-white">
      <Header />
      <NavBar />

      {/* pt matches Header's h-16 sm:h-20 lg:h-24 exactly — main sits
          immediately below the fixed header, no extra buffer. */}
      <main className="lg:ml-[170px] pt-16 sm:pt-20 lg:pt-24 pb-20 lg:pb-[120px] flex flex-col gap-[100px]">
        <HospitalCard />
      </main>

      {/* <Footer /> */}
    </section>
  )
}

export default page