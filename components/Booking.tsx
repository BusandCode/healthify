"use client"
import React, { useState } from 'react'
import { Calendar } from 'lucide-react';

const Booking = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

  return (
    <div className="px-4 lg:px-6 py-4">
      <div>
        <h1 className='text-[#4203a9] text-[32px] md:text-[40px] font-semibold'>Bookings</h1>

        {/* Tabs */}
        <div className='flex gap-6 mt-4 border-b-2 border-gray-200'>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`text-[20px] font-medium pb-2 relative ${
              activeTab === 'upcoming' ? 'text-black' : 'text-gray-500'
            }`}
          >
            Upcoming
            {activeTab === 'upcoming' && (
              <span className="absolute left-0 bottom-0 w-full h-[4px] bg-black rounded-md"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`text-[20px] font-medium pb-2 relative ${
              activeTab === 'history' ? 'text-black' : 'text-gray-500'
            }`}
          >
            History
            {activeTab === 'history' && (
              <span className="absolute left-0 bottom-0 w-full h-[4px] bg-black rounded-md"></span>
            )}
          </button>
        </div>

        {/* Content below */}
        <div className='mt-6 font-normal max-w-[603px]'>
          {activeTab === 'upcoming' && 
        <div className='border border-gray-200 rounded-[20px] max-w-[603px] p-6'>
            <h1 className='font-normal lg:text-[20px] text-[18px] mb-4'>
              Consultation Session at <span className='text-[#4203a9] font-semibold'>Ikeja General Hospital</span>
            </h1>
            <article>
              <div className='flex lg:flex-row flex-colgap-[15px]'>
                {/* time */}
                <div className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5 lg:w-8 lg:h-8 text-[#4203a9]' />
                  <span className='text-gray-700 g:text-[20px] text-[18px]'>January 30th, 2025</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5 lg:w-[26px] lg:h-[26px] text-[#4203a9]' />
                  <span className='text-gray-700 g:text-[20px] text-[18px]'>08:00 am</span>
                </div>
              </div>
              <div className='flex lg:flex-row flex-col gap-[15px]'>
                <button className='w-[212px] text-[18px] lg:text-[20px] flex 
                items-center justify-center h-[44px] p-[10px] bg-[#4203a9] text-white
                 rounded-[5px]'>Reschedule Session</button>
                 <h1 className='text-[#ED0505] text-[18px] lg:text-[20px]'>Cancel</h1>
              </div>
            </article>
        </div>}
          {activeTab === 'history' && <p>Here is your booking history...</p>}
        </div>
      </div>
    </div>
  )
}

export default Booking