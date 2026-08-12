"use client"
import React, { useState } from 'react'
import BookingCard, { BookingItem } from './BookingCard'

const upcomingBookings: BookingItem[] = [
  {
    id: 'bk-001',
    type: 'Consultation Session',
    hospital: 'Ikeja General Hospital',
    date: 'January 30th, 2025',
    time: '08:00 am',
    status: 'upcoming',
  },
  {
    id: 'bk-002',
    type: 'Dental Checkup',
    hospital: 'Lagos Island Maternity Hospital',
    date: 'February 4th, 2025',
    time: '11:30 am',
    status: 'upcoming',
  },
  {
    id: 'bk-003',
    type: 'Physiotherapy Session',
    hospital: 'Gbagada General Hospital',
    date: 'February 12th, 2025',
    time: '02:00 pm',
    status: 'upcoming',
  },
]

const historyBookings: BookingItem[] = [
  {
    id: 'hb-001',
    type: 'Consultation Session',
    hospital: 'Ikeja General Hospital',
    date: 'December 18th, 2024',
    time: '09:00 am',
    status: 'completed',
  },
  {
    id: 'hb-002',
    type: 'Eye Screening',
    hospital: 'Lagos University Teaching Hospital',
    date: 'December 5th, 2024',
    time: '10:15 am',
    status: 'completed',
  },
  {
    id: 'hb-003',
    type: 'Consultation Session',
    hospital: 'Gbagada General Hospital',
    date: 'November 22nd, 2024',
    time: '01:00 pm',
    status: 'cancelled',
  },
]

const Booking = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

  const handleReschedule = (id: string) => {
    // TODO: hook up to reschedule flow / API call
    console.log('Reschedule', id)
  }

  const handleCancel = (id: string) => {
    // TODO: hook up to cancel flow / API call
    console.log('Cancel', id)
  }

  const activeBookings = activeTab === 'upcoming' ? upcomingBookings : historyBookings
  const emptyMessage =
    activeTab === 'upcoming'
      ? 'You have no upcoming bookings. Book a session to see it here.'
      : "Your booking history will appear here once you've completed a session."

  return (
    <div className="px-4 lg:px-6 py-4">
      <div>
        <h1 className='text-blue-800 text-[26px] md:text-[40px] font-semibold'>Bookings</h1>

        {/* Tabs */}
        <div className='flex gap-5 lg:gap-6 mt-4 border-b-2 border-gray-200'>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`text-[16px] lg:text-[20px] font-medium pb-2 relative ${
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
            className={`text-[16px] lg:text-[20px] font-medium pb-2 relative ${
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
        <div className='mt-6 font-normal max-w-[603px] flex flex-col gap-5'>
          {activeBookings.length > 0 ? (
            activeBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
              />
            ))
          ) : (
            <div className='border border-gray-200 rounded-[20px] p-8 text-center text-gray-500'>
              {emptyMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Booking