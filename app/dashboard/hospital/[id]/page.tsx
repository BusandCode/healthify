'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  ShieldCheck,
  Loader2,
  Phone,
  Mail,
  Globe,
  Stethoscope,
  HeartPulse,
  Baby,
  Bone,
  Pill,
  Star,
  Check,
} from 'lucide-react'
import NavBar from '@/components/NavBar'
import { getHospitalById, Hospital } from '@/app/actions/hospitals'
import { createBooking } from '@/app/actions/bookings'
import { toggleSavedHospital } from '@/app/actions/saved'

/* ──────────────────────────────────────────────
   Fields below (phone, email, website, about,
   foundedYear, patientsServed, departments,
   reviewsList) aren't on the current Hospital type
   yet. Add them to the type + the relevant actions
   once the backend returns them — everything here
   already falls back gracefully in the meantime.
   ────────────────────────────────────────────── */

type Department = {
  id: string
  name: string
  description: string
  icon?: 'oncology' | 'pediatrics' | 'orthopedics' | 'general' | 'maternity'
}

type Review = {
  id: string
  name: string
  avatarUrl?: string
  rating: number
  date: string
  comment: string
}

type HospitalWithExtras = Hospital & {
  phone?: string
  email?: string
  website?: string
  isOpen247?: boolean
  about?: string
  foundedYear?: number
  patientsServed?: string
  departments?: Department[]
  reviewsList?: Review[]
}

const departmentIcons: Record<NonNullable<Department['icon']>, React.ReactNode> = {
  oncology: <HeartPulse size={20} />,
  pediatrics: <Baby size={20} />,
  orthopedics: <Bone size={20} />,
  general: <Stethoscope size={20} />,
  maternity: <Pill size={20} />,
}

type Tab = 'overview' | 'reviews' | 'consultation'
type ReviewSort = 'recent' | 'highest'

const REVIEWS_PAGE_SIZE = 2

const HospitalDetails: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const hospitalId = Number(params?.id)

  const [hospital, setHospital] = useState<HospitalWithExtras | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [savePending, setSavePending] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  // Consultation wizard state
  const [consultationStep, setConsultationStep] = useState<1 | 2>(1)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)
  const [bookingDateTime, setBookingDateTime] = useState<string>('')
  const [bookingLoading, setBookingLoading] = useState<boolean>(false)
  const [bookingStatus, setBookingStatus] = useState<string | null>(null)

  // Reviews state
  const [reviewSort, setReviewSort] = useState<ReviewSort>('recent')
  const [visibleReviewCount, setVisibleReviewCount] = useState<number>(REVIEWS_PAGE_SIZE)
  const [draftRating, setDraftRating] = useState<number>(0)
  const [draftHoverRating, setDraftHoverRating] = useState<number>(0)
  const [draftComment, setDraftComment] = useState<string>('')
  const [localReviews, setLocalReviews] = useState<Review[]>([])
  const [reviewSubmitting, setReviewSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const fetchHospital = async () => {
      setLoading(true)
      try {
        const data = await getHospitalById(hospitalId)
        setHospital(data)
        // setLocalReviews(data?.reviews ?? [])
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
      // TODO: once the backend accepts a department, pass selectedDept along
      // e.g. createBooking(hospitalId, new Date(bookingDateTime), selectedDept)
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

  const handlePublishReview = () => {
    if (draftRating === 0 || !draftComment.trim()) return
    setReviewSubmitting(true)
    // TODO: wire to a real submitReview(hospitalId, rating, comment) action.
    // Publishing optimistically for now so the flow is usable end to end.
    const newReview: Review = {
      id: `local-${Date.now()}`,
      name: 'You',
      rating: draftRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      comment: draftComment.trim(),
    }
    setLocalReviews((prev) => [newReview, ...prev])
    setDraftRating(0)
    setDraftComment('')
    setReviewSubmitting(false)
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

  const departments = hospital.departments ?? []
  const avgRating = hospital.rating ?? 0

  const sortedReviews = [...localReviews].sort((a, b) =>
    reviewSort === 'highest' ? b.rating - a.rating : b.id.localeCompare(a.id)
  )
  const visibleReviews = sortedReviews.slice(0, visibleReviewCount)
  const hasMoreReviews = visibleReviewCount < sortedReviews.length

  const totalConsultationSteps = departments.length > 0 ? 2 : 1
  const effectiveStep = departments.length > 0 ? consultationStep : 2

  const goToStep2 = () => setConsultationStep(2)

  const ConsultationWidget = (
    <>
      <h2 className="font-semibold text-gray-900 text-lg mb-4">Book a consultation</h2>

      {departments.length > 0 && (
        <p className="text-xs font-medium text-gray-400 mb-4">
          Step {effectiveStep}/{totalConsultationSteps}
        </p>
      )}

      {effectiveStep === 1 ? (
        <>
          <p className="font-semibold text-gray-900 mb-1">Select department</p>
          <p className="text-xs text-gray-400 mb-4">Pick a department for your consultation booking</p>
          <div className="space-y-3 mb-5">
            {departments.map((dept) => {
              const isChecked = dept.id === selectedDept
              return (
                <label
                  key={dept.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span
                    onClick={() => setSelectedDept(dept.id)}
                    className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? 'bg-blue-800 border-blue-800' : 'border-gray-300'
                    }`}
                  >
                    {isChecked && <Check size={13} className="text-white" />}
                  </span>
                  <span
                    onClick={() => setSelectedDept(dept.id)}
                    className="text-sm text-gray-700"
                  >
                    {dept.name}
                  </span>
                </label>
              )
            })}
          </div>
          <button
            onClick={goToStep2}
            disabled={!selectedDept}
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-1">Consultation fee</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">₦{hospital.fee}</p>

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

          <div className="flex gap-2">
            {departments.length > 0 && (
              <button
                onClick={() => setConsultationStep(1)}
                className="px-4 py-3 rounded-lg font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
              >
                Back
              </button>
            )}
            <button
              onClick={handleConfirmBooking}
              disabled={bookingLoading}
              className="flex-1 bg-blue-800 text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition disabled:opacity-50"
            >
              {bookingLoading ? 'Confirming...' : 'Book Appointment'}
            </button>
          </div>
        </>
      )}
    </>
  )

  return (
    <>
      <NavBar />

      <div className="lg:ml-[170px] max-w-5xl mx-auto px-4 py-4 sm:py-6 pb-28 lg:pb-10">
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
            {hospital.isOpen247 && (
              <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md">
                Open 24/7
              </span>
            )}
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

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-5 border-b border-gray-200">
            {([
              { key: 'overview', label: 'Overview' },
              { key: 'reviews', label: `Review (${hospital.reviews})` },
              { key: 'consultation', label: 'Consultation' },
            ] as { key: Tab; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key ? 'text-blue-800' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-blue-800 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* About */}
                <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
                  <h2 className="font-semibold text-gray-900 mb-2">About {hospital.name}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {hospital.about ??
                      `${hospital.name} is a healthcare provider offering ${
                        (hospital.specializations ?? []).join(', ') || 'a range of medical services'
                      } to patients in and around ${hospital.address}.`}
                  </p>

                  {(hospital.foundedYear || hospital.patientsServed) && (
                    <div className="flex flex-wrap gap-8 mt-5 pt-5 border-t border-gray-100">
                      {hospital.foundedYear && (
                        <div>
                          <p className="text-xl font-bold text-blue-800">{hospital.foundedYear}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Founded</p>
                        </div>
                      )}
                      {hospital.patientsServed && (
                        <div>
                          <p className="text-xl font-bold text-blue-800">{hospital.patientsServed}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Patients served</p>
                        </div>
                      )}
                    </div>
                  )}
                </section>

                {/* Contact details */}
                <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="font-semibold text-gray-900">Contact details</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="flex items-center justify-between gap-3 py-3 first:pt-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <MapPin size={16} className="text-blue-600 shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{hospital.address}</span>
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(hospital.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-700 underline shrink-0"
                      >
                        Get directions
                      </a>
                    </div>

                    {hospital.phone && (
                      <div className="flex items-center gap-3 py-3">
                        <Phone size={16} className="text-blue-600 shrink-0" />
                        <span className="text-sm text-gray-700">{hospital.phone}</span>
                      </div>
                    )}

                    {hospital.email && (
                      <div className="flex items-center gap-3 py-3">
                        <Mail size={16} className="text-blue-600 shrink-0" />
                        <span className="text-sm text-gray-700">{hospital.email}</span>
                      </div>
                    )}

                    {hospital.website && (
                      <div className="flex items-center gap-3 py-3 last:pb-0">
                        <Globe size={16} className="text-blue-600 shrink-0" />
                        <span className="text-sm text-gray-700">{hospital.website}</span>
                      </div>
                    )}

                    {hospital.insurances.length > 0 && (
                      <div className="flex items-start gap-3 py-3 last:pb-0">
                        <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          Accepts {hospital.insurances.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </section>

                {/* Departments */}
                {departments.length > 0 && (
                  <section>
                    <h2 className="font-semibold text-gray-900 mb-3">Departments</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {departments.map((dept) => (
                        <div
                          key={dept.id}
                          className="text-left rounded-2xl p-4 border border-gray-200 bg-white"
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-blue-50 text-blue-700">
                            {departmentIcons[dept.icon ?? 'general']}
                          </div>
                          <p className="font-semibold text-sm mb-1 text-gray-900">{dept.name}</p>
                          <p className="text-xs leading-snug text-gray-400">{dept.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Rating summary */}
                <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Average rating · {hospital.reviews} reviews
                  </p>
                </section>

                {/* Sort by */}
                <div className="flex flex-wrap gap-3">
                  <select
                    value={reviewSort}
                    onChange={(e) => setReviewSort(e.target.value as ReviewSort)}
                    className="text-sm border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="highest">Highest Rating</option>
                  </select>
                </div>

                {/* Review list */}
                {sortedReviews.length === 0 ? (
                  <section className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-400">
                    No reviews yet. Be the first to share your experience.
                  </section>
                ) : (
                  <div className="space-y-4">
                    {visibleReviews.map((review) => (
                      <section
                        key={review.id}
                        className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5"
                      >
                        <p className="text-xs text-gray-400 mb-2">{review.date}</p>
                        <div className="flex text-yellow-400 mb-2">
                          {'★'.repeat(review.rating)}
                          <span className="text-gray-200">{'★'.repeat(5 - review.rating)}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-semibold overflow-hidden shrink-0">
                            {review.avatarUrl ? (
                              <Image src={review.avatarUrl} alt={review.name} width={36} height={36} className="object-cover" />
                            ) : (
                              review.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900">{review.name}</p>
                        </div>
                      </section>
                    ))}
                  </div>
                )}

                {hasMoreReviews && (
                  <button
                    onClick={() => setVisibleReviewCount((c) => c + REVIEWS_PAGE_SIZE)}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition"
                  >
                    Load More
                  </button>
                )}

                {/* Add a review */}
                <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">Add a review</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Only reviews from verified patients would be published.
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starValue = i + 1
                      const isFilled = starValue <= (draftHoverRating || draftRating)
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setDraftRating(starValue)}
                          onMouseEnter={() => setDraftHoverRating(starValue)}
                          onMouseLeave={() => setDraftHoverRating(0)}
                          aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                        >
                          <Star
                            size={26}
                            className={isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
                          />
                        </button>
                      )
                    })}
                  </div>

                  <textarea
                    value={draftComment}
                    onChange={(e) => setDraftComment(e.target.value)}
                    placeholder="Type here to add a review"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white text-gray-700 mb-4 resize-none"
                  />

                  <button
                    onClick={handlePublishReview}
                    disabled={draftRating === 0 || !draftComment.trim() || reviewSubmitting}
                    className="bg-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition disabled:opacity-50"
                  >
                    {reviewSubmitting ? 'Publishing...' : 'Publish'}
                  </button>
                </section>
              </div>
            )}

            {/* Consultation tab: mobile only — desktop already has the sticky sidebar */}
            {activeTab === 'consultation' && (
              <section className="lg:hidden bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
                {ConsultationWidget}
              </section>
            )}
          </div>

          {/* Booking sidebar — desktop only, always visible regardless of tab */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 lg:sticky lg:top-6">
              {ConsultationWidget}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default HospitalDetails