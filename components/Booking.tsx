"use client"
import React, { useState } from 'react'

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
        <div className='mt-6'>
          {activeTab === 'upcoming' && <p>Here are your upcoming bookings...</p>}
          {activeTab === 'history' && <p>Here is your booking history...</p>}
        </div>
      </div>
    </div>
  )
}

export default Booking
