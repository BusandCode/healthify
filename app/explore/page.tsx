import Header from '@/components/Header'
import HospitalSearch from '@/components/HospitalSearch'
import LandingFooter from '@/components/LandingFooter'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import { db } from '@/utils/db'

function formatFee(fee: number) {
  return `₦${fee.toLocaleString()}`
}

async function getPublicHospitals() {
  return db.hospital.findMany({
    orderBy: { rating: 'desc' },
    take: 24,
  })
}

export default async function ExplorePage() {
  const hospitals = await getPublicHospitals()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Public route — no NavBar, no auth check. Anyone can browse. */}
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <section className="mb-10 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Find a provider near you
            </h1>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              Browse verified hospitals and clinics. Sign up to book an appointment.
            </p>
            <div className="max-w-2xl mx-auto">
              <HospitalSearch />
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hospitals.map((hospital) => (
                <Link
                  key={hospital.id}
                  href={`/explore/${hospital.id}`}
                  className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative w-full h-36 bg-gray-100">
                    {hospital.image && (
                      <Image src={hospital.image} alt={hospital.name} fill className="object-cover" />
                    )}
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

              {hospitals.length === 0 && (
                <p className="text-sm text-gray-400 col-span-full text-center py-10">
                  No providers available right now.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}