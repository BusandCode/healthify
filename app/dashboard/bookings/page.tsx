"use client"
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer';
import Booking from '@/components/Booking'
import React from 'react'


const page = () => {
  return (
    <section className="min-h-screen bg-white">
      <Header />
      <NavBar />

      {/* Main content */}
      <main className="lg:ml-[170px] pt-[80px] mb-12 lg:mb-0 sm:pt-[100px] flex flex-col gap-[100px]">
        <Booking />
        <Footer />
      </main>
      {/* <div className="lg:ml-[170px]">
      </div> */}
    </section>
  )
}

export default page
