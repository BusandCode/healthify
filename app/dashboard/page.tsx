import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import HospitalSearch from '@/components/HospitalSearch'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaMapMarkerAlt, FaRegBookmark, FaCompass, FaCalendarAlt } from 'react-icons/fa'
import { createClient } from '@/utils/supabase/server'
import { db } from '@/utils/db'

// Small helper — Naira display, matches the convention used across Explore/Bookings/Saved
function formatFee(fee: number) {
  return `₦${fee.toLocaleString()}`
}

async function getDashboardData(userId: string) {
  const [dbUser, upcomingBooking, savedHospitals, recommended] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.booking.findFirst({
      where: { userId, status: 'upcoming' },
      orderBy: { dateTime: 'asc' },
      include: { hospital: true },
    }),
    // NOTE: assumes a SavedHospital model (userId, hospitalId, @@unique) exists.
    // If it hasn't been added to schema.prisma yet, this call will throw —
    // swap in whatever your actual saved-hospitals action/model is named.
    db.savedHospital
      .findMany({
        where: { userId },
        take: 4,
        orderBy: { id: 'desc' },
        include: { hospital: true },
      })
      .catch(() => []),
    db.hospital.findMany({
      orderBy: { rating: 'desc' },
      take: 4,
    }),
  ])

  return { dbUser, upcomingBooking, savedHospitals, recommended }
}

export default async function DashboardHomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { dbUser, upcomingBooking, savedHospitals, recommended } = user
    ? await getDashboardData(user.id)
    : { dbUser: null, upcomingBooking: null, savedHospitals: [] as any[], recommended: [] as any[] }

  const firstName = dbUser?.firstName || 'there'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavBar />

      <main className="lg:ml-[170px] pt-[80px] mb-20 lg:mb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">

          {/* ── Greeting + quick search ── */}
          <section className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Welcome back, {firstName}
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              Here&apos;s what&apos;s happening with your care.
            </p>
            <HospitalSearch />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Left: upcoming appointment + recommended ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Upcoming appointment */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900 text-lg">Upcoming appointment</h2>
                  <Link href="/dashboard/bookings" className="text-sm text-blue-700 font-medium hover:underline">
                    View all
                  </Link>
                </div>

                {upcomingBooking ? (
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-blue-700 text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{upcomingBooking.hospital.name}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt className="text-xs" /> {upcomingBooking.hospital.address}
                      </p>
                      <p className="text-sm text-blue-700 font-medium mt-2">
                        {new Date(upcomingBooking.dateTime).toLocaleString('en-NG', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/bookings`}
                      className="text-sm font-semibold text-blue-800 border border-blue-200 rounded-xl px-4 py-2 hover:bg-blue-50 transition-colors self-start sm:self-center"
                    >
                      Manage
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                    <p className="text-gray-500 text-sm mb-4">You don&apos;t have any upcoming appointments yet.</p>
                    <Link
                      href="/dashboard/explore"
                      className="inline-block bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-900 transition-colors"
                    >
                      Find a provider
                    </Link>
                  </div>
                )}
              </section>

              {/* Recommended hospitals */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900 text-lg">Recommended for you</h2>
                  <Link href="/dashboard/explore" className="text-sm text-blue-700 font-medium hover:underline">
                    Explore all
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommended.map((hospital: any) => (
                    <Link
                      key={hospital.id}
                      href={`/dashboard/hospital/${hospital.id}`}
                      className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div className="relative w-full h-32 bg-gray-100">
                        {hospital.image && (
                          <Image src={hospital.image} alt={hospital.name} fill className="object-cover" />
                        )}
                        <button
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-500 hover:text-blue-800"
                          aria-label="Save hospital"
                        >
                          <FaRegBookmark className="text-sm" />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-800">
                          {hospital.name}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                          <FaMapMarkerAlt /> {hospital.distance}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-xs font-medium text-gray-700">
                            <FaStar className="text-yellow-400" /> {hospital.rating.toFixed(1)}
                            <span className="text-gray-300">({hospital.reviews})</span>
                          </span>
                          <span className="text-xs font-semibold text-blue-800">{formatFee(hospital.fee)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {recommended.length === 0 && (
                    <p className="text-sm text-gray-400 col-span-2">No recommendations available right now.</p>
                  )}
                </div>
              </section>
            </div>

            {/* ── Right: saved + quick links ── */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900 text-lg">Saved</h2>
                  <Link href="/dashboard/saved" className="text-sm text-blue-700 font-medium hover:underline">
                    View all
                  </Link>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-md divide-y divide-gray-100">
                  {savedHospitals.length > 0 ? (
                    savedHospitals.map((saved: any) => (
                      <Link
                        key={saved.id}
                        href={`/dashboard/hospital/${saved.hospital.id}`}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-11 h-11 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                          {saved.hospital.image && (
                            <Image src={saved.hospital.image} alt={saved.hospital.name} fill className="object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{saved.hospital.name}</p>
                          <p className="text-xs text-gray-400 truncate">{saved.hospital.address}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 p-4">
                      Bookmark providers while exploring to see them here.
                    </p>
                  )}
                </div>
              </section>

              <section>
                <h2 className="font-semibold text-gray-900 text-lg mb-4">Quick links</h2>
                <div className="space-y-3">
                  <Link
                    href="/dashboard/explore"
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FaCompass className="text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Explore providers</span>
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FaCalendarAlt className="text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">My bookings</span>
                  </Link>
                  <Link
                    href="/dashboard/saved"
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FaRegBookmark className="text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Saved hospitals</span>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}