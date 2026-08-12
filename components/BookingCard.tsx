"use client"
import React from 'react'
import { Calendar, Clock } from 'lucide-react'

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled'

export interface BookingItem {
  id: string
  type: string
  hospital: string
  date: string
  time: string
  status: BookingStatus
}

const statusStyles: Record<BookingStatus, string> = {
  upcoming: 'bg-blue-50 text-blue-800',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-[#ED0505]',
}

const statusLabels: Record<BookingStatus, string> = {
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const StatusBadge = ({ status }: { status: BookingStatus }) => (
  <span
    className={`shrink-0 text-[11px] lg:text-[13px] font-medium px-2.5 py-1 rounded-full ${statusStyles[status]}`}
  >
    {statusLabels[status]}
  </span>
)

interface BookingCardProps {
  booking: BookingItem
  onReschedule?: (id: string) => void
  onCancel?: (id: string) => void
}

const BookingCard = ({ booking, onReschedule, onCancel }: BookingCardProps) => {
  const isUpcoming = booking.status === 'upcoming'

  return (
    <div className='border border-gray-200 rounded-[16px] lg:rounded-[20px] w-full max-w-[603px] p-4 lg:p-6'>
      {/* Header row: title + status badge (badge only shown for history items) */}
      <div className='flex items-start justify-between gap-3 mb-4 lg:mb-5'>
        <h2 className='font-normal text-[15px] lg:text-[20px] leading-snug'>
          {booking.type} at{' '}
          <span className='text-blue-800 font-semibold'>{booking.hospital}</span>
        </h2>
        {!isUpcoming && <StatusBadge status={booking.status} />}
      </div>

      {/* Date + time row */}
      <div className='flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 lg:mb-5'>
        <div className='flex items-center gap-1.5'>
          <Calendar className='w-4 h-4 lg:w-6 lg:h-6 text-blue-800 shrink-0' />
          <span className='text-gray-700 text-[13px] lg:text-[18px]'>{booking.date}</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <Clock className='w-4 h-4 lg:w-6 lg:h-6 text-blue-800 shrink-0' />
          <span className='text-gray-700 text-[13px] lg:text-[18px]'>{booking.time}</span>
        </div>
      </div>

      {/* Actions row, only for upcoming bookings */}
      {isUpcoming && (
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5'>
          <button
            onClick={() => onReschedule?.(booking.id)}
            className='flex items-center justify-center text-[14px] lg:text-[18px] font-medium px-5 py-2.5 lg:px-6 lg:py-3 bg-blue-800 text-white rounded-[8px] hover:bg-blue-900 transition-colors'
          >
            <span className='sm:hidden'>Reschedule</span>
            <span className='hidden sm:inline'>Reschedule Session</span>
          </button>
          <button
            onClick={() => onCancel?.(booking.id)}
            className='flex items-center justify-center text-[14px] lg:text-[18px] font-medium px-5 py-2.5 lg:px-6 lg:py-3 text-[#ED0505] border border-[#ED0505]/30 rounded-[8px] hover:bg-red-50 transition-colors'
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default BookingCard