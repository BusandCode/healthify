'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, X } from 'lucide-react'
import { getBookings, cancelBooking, BookingWithHospital } from '@/app/actions/bookings'

const STATUS_STYLES: Record<string, string> = {
  upcoming: 'bg-blue-50 text-blue-800',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

const formatDateTime = (date: Date) => {
  const d = new Date(date)
  return {
    date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

const Booking: React.FC = () => {
  const [bookings, setBookings] = useState<BookingWithHospital[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getBookings()
      setBookings(data)
    } catch (err) {
      console.error('Failed to load bookings:', err)
      setError('Something went wrong loading your bookings.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleCancel = async (bookingId: string) => {
    setCancellingId(bookingId)
    try {
      const res = await cancelBooking(bookingId)
      if (!res.success) throw new Error(res.error)
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
      )
    } catch (err) {
      console.error('Failed to cancel booking:', err)
      setError('Could not cancel that appointment. Please try again.')
    } finally {
      setCancellingId(null)
    }
  }

  const upcoming = bookings.filter((b) => b.status === 'upcoming')
  const past = bookings.filter((b) => b.status !== 'upcoming')

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 mb-20">
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-1">
        My Bookings
      </h1>
      <p className="text-sm text-gray-500 mb-6 sm:mb-8">
        Track your upcoming appointments and view your booking history
      </p>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Calendar size={22} className="text-blue-800" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">No appointments yet</h2>
          <p className="text-sm text-gray-500 max-w-xs mb-6">
            Once you book an appointment with a hospital, it'll show up here.
          </p>
          <Link
            href="/dashboard/explore"
            className="bg-blue-800 text-white text-sm font-medium py-2.5 px-6 rounded-lg hover:bg-blue-900 transition"
          >
            Find a hospital
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Upcoming</h2>
              <div className="space-y-3">
                {upcoming.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    isCancelling={cancellingId === booking.id}
                    onCancel={() => handleCancel(booking.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Past & Cancelled</h2>
              <div className="space-y-3">
                {past.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

interface BookingCardProps {
  booking: BookingWithHospital
  isCancelling?: boolean
  onCancel?: () => void
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, isCancelling, onCancel }) => {
  const { date, time } = formatDateTime(booking.dateTime)
  const statusStyle = STATUS_STYLES[booking.status] ?? STATUS_STYLES.upcoming

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 transition-opacity duration-300 ${
        isCancelling ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-200 shrink-0">
        <Image
          src={booking.hospital.image}
          alt={booking.hospital.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/dashboard/hospitals/${booking.hospital.id}`}
            className="font-semibold text-sm sm:text-base text-gray-900 hover:text-blue-800 transition line-clamp-1"
          >
            {booking.hospital.name}
          </Link>
          <span className={`shrink-0 text-xs font-medium px-2 py-1 rounded-md capitalize ${statusStyle}`}>
            {booking.status}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-1 text-gray-500">
          <MapPin size={12} className="shrink-0" />
          <span className="text-xs line-clamp-1">{booking.hospital.address}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-blue-600" />
            <span className="text-xs font-medium">{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-blue-600" />
            <span className="text-xs font-medium">{time}</span>
          </div>
        </div>

        {booking.status === 'upcoming' && onCancel && (
          <button
            onClick={onCancel}
            disabled={isCancelling}
            className="mt-3 flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 transition disabled:opacity-50"
          >
            <X size={12} />
            {isCancelling ? 'Cancelling...' : 'Cancel appointment'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Booking