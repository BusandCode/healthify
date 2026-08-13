import Header from '@/components/Header'
import LandingFooter from '@/components/LandingFooter'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import { db } from '@/utils/db'
import { createClient } from '@/utils/supabase/server'

function formatFee(fee: number) {
  return `₦${fee.toLocaleString()}`
}

async function getHospital(id: number) {
  return db.hospital.findUnique({ where: { id } })
}

export default async function PublicHospitalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const hospitalId = Number(id)
  if (Number.isNaN(hospitalId)) notFound()

  const hospital = await getHospital(hospitalId)
  if (!hospital) notFound()

  // Only used to decide where "Book appointment" sends the visitor —
  // this page itself never requires auth.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const bookHref = user
    ? `/dashboard/explore/${hospital.id}` // logged in → real booking flow
    : `/signup?redirect=/dashboard/explore/${hospital.id}` // anon → signup, then back to booking

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-gray-100 mb-6">
            {hospital.image && (
              <Image src={hospital.image} alt={hospital.name} fill className="object-cover" />
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{hospital.name}</h1>
              <p className="text-sm text-gray-400 flex items-center gap-1 mb-2">
                <FaMapMarkerAlt /> {hospital.address}
              </p>
              <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                <FaStar className="text-yellow-400" /> {hospital.rating.toFixed(1)}
                <span className="text-gray-300">({hospital.reviews} reviews)</span>
              </span>
            </div>

            <Link
              href={bookHref}
              className="inline-block bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors text-center"
            >
              Book appointment
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {hospital.specializations.map((s) => (
                  <span key={s} className="text-xs bg-blue-50 text-blue-800 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">Accepted insurance</h2>
              <div className="flex flex-wrap gap-2">
                {hospital.insurances.map((i) => (
                  <span key={i} className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-full">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Consultation fee</p>
            <p className="text-xl font-bold text-blue-800">{formatFee(hospital.fee)}</p>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}