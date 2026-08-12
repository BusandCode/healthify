'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Bookmark, MapPin, ShieldCheck, Loader2 } from 'lucide-react'
import { getHospitalById, Hospital } from '@/app/actions/hospitals'
import { createBooking } from '@/app/actions/bookings'
import { toggleSavedHospital } from '@/app/actions/saved'

const HospitalDetails: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const hospitalId = Number(params?.id)

  const [hospital, setHospital] = useState<Hospital | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [savePending, setSavePending] = useState<boolean>(false)

  const [bookingDateTime, setBookingDateTime] = useState<string>('')
  const [bookingLoading, setBookingLoading] = useState<boolean>(false)
  const [bookingStatus, setBookingStatus] = useState<string | null>(null)

  useEffect(() => {
    const fetchHospital = async () => {
      setLoading(true)
      try {
        const data = await getHospitalById(hospitalId)
        setHospital(data)
      } catch (error) {
        console.error('Failed to load hospital:', error)
      } finally {
        setLoading(false)
      }
    }
    if (!Number.isNaN(hospitalId)) {
      fetchHospital()
    }
  }, [hospitalId])

const handleToggleSave = async () => {
    const previous = isSaved
    setIsSaved(!previous)
    setSavePending(true)
    try {
      const res = await toggleSavedHospital(hospitalId)
      if (!res.success) throw new Error(res.error)
      setIsSaved(res.saved)
    } catch (error) {
      console.error('Failed to toggle save:', error)
      setIsSaved(previous)
    } finally {
      setSavePending(false)
    }
  }

  const handleConfirmBooking = async () => {
    if (!bookingDateTime) {
      setBookingStatus('Please select a date and time')
      return
    }
    setBookingLoading(true)
    setBookingStatus(null)
    try {
      const res = await createBooking(hospitalId, new Date(bookingDateTime))
      if (res.success) {
        setBookingStatus('Success! Appointment booked.')
        setTimeout(() => router.push('/dashboard/bookings'), 1500)
      } else {
        setBookingStatus(res.error || 'Failed to book appointment')
      }
    } catch (error) {
      console.error(error)
      setBookingStatus('An error occurred. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!hospital) {
    return (
      <div className="text-center py-32 px-4">
        <p className="text-gray-500 font-medium mb-4">Hospital not found.</p>
        <Link href="/dashboard/explore" className="text-blue-800 underline font-medium">
          Back to Explore
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-800 transition mb-4"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Hero image */}
      <div className="relative w-full h-56 sm:h-72 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-200">
        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
        <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded-md shadow-sm font-medium">
          {hospital.distance}
        </span>
        <button
          onClick={handleToggleSave}
          disabled={savePending}
          aria-label={isSaved ? 'Remove from saved' : 'Save hospital'}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition disabled:cursor-not-allowed"
        >
          {savePending ? (
            <Loader2 size={18} className="text-blue-800 animate-spin" />
          ) : (
            <Bookmark
              size={18}
              className={isSaved ? 'text-blue-800 fill-blue-800' : 'text-blue-800'}
            />
          )}
        </button>
      </div>

      {/* Header */}
      <div className="mt-5 sm:mt-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {(hospital.specializations ?? []).map((spec, i) => (
            <span
              key={i}
              className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md"
            >
              {spec}
            </span>
          ))}
        </div>

        <h1 className="font-semibold text-2xl sm:text-3xl text-gray-900 leading-tight">
          {hospital.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(hospital.rating))}
            </div>
            <span>({hospital.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-blue-600" />
            <span className="line-clamp-1">{hospital.address}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Details</h2>
            <div className="space-y-3 text-sm sm:text-base text-gray-700">
              {hospital.insurances.length > 0 && (
                <div className="flex items-start gap-3">
                  <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Accepts {hospital.insurances.join(', ')}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-600 shrink-0" />
                <span>{hospital.address}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Booking sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 lg:sticky lg:top-6">
            <p className="text-sm text-gray-500 mb-1">Consultation fee</p>
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              ₦{hospital.fee}
            </p>

            <label className="block text-xs font-semibold text-blue-800 mb-2">
              Select date & time
            </label>
            <input
              type="datetime-local"
              value={bookingDateTime}
              onChange={(e) => setBookingDateTime(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white text-gray-700 mb-3"
            />

            {bookingStatus && (
              <p
                className={`text-xs font-medium mb-3 ${
                  bookingStatus.startsWith('Success') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {bookingStatus}
              </p>
            )}

            <button
              onClick={handleConfirmBooking}
              disabled={bookingLoading}
              className="w-full bg-blue-800 text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition disabled:opacity-50"
            >
              {bookingLoading ? 'Confirming...' : 'Book Appointment'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default HospitalDetails