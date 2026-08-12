'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, Loader2 } from 'lucide-react'
import { getSavedHospitals, toggleSavedHospital } from '@/app/actions/saved'
import { Hospital } from '@/app/actions/hospitals'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
// import Footer from '@/components/Footer'

const SavedScreen: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const fetchSaved = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getSavedHospitals()
      setHospitals(data)
    } catch (err) {
      console.error('Failed to load saved hospitals:', err)
      setError('Something went wrong loading your saved hospitals.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSaved()
  }, [])

  const handleRemove = async (id: number) => {
    const previous = hospitals
    setRemovingIds((prev) => new Set(prev).add(id))
    setHospitals((prev) => prev.filter((h) => h.id !== id))

    try {
      const res = await toggleSavedHospital(id)
      if (!res.success) throw new Error(res.error)
    } catch (err) {
      console.error('Failed to remove saved hospital:', err)
      setHospitals(previous)
      setError('Could not remove that hospital. Please try again.')
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  return (
    <section className="bg-white">
      <Header />
      <NavBar />

      <main className="lg:ml-[170px] pt-[80px] lg:mb-0 sm:pt-[100px] flex flex-col gap-[100px]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 pb-24 w-full">
          <div className="flex items-center gap-2 mb-1">
            <Bookmark size={20} className="text-blue-800" />
            <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl text-gray-900">Saved</h1>
          </div>
          <p className="text-sm text-gray-500 mb-6 sm:mb-8">
            Hospitals you&apos;ve bookmarked for later
          </p>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : hospitals.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Bookmark size={22} className="text-blue-800" />
              </div>
              <h2 className="text-base font-semibold text-gray-800 mb-1">Nothing saved yet</h2>
              <p className="text-sm text-gray-500 max-w-xs mb-6">
                Tap the bookmark icon on any hospital while exploring, and it&apos;ll show up here.
              </p>
              <Link
                href="/dashboard/explore"
                className="bg-blue-800 text-white text-sm font-medium py-2.5 px-6 rounded-lg hover:bg-blue-900 transition"
              >
                Explore hospitals
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {hospitals.map((hospital) => {
                const isRemoving = removingIds.has(hospital.id)
                return (
                  <div
                    key={hospital.id}
                    className={`bg-white w-full max-w-[340px] sm:max-w-[320px] lg:max-w-[350px] rounded-2xl sm:rounded-3xl shadow-md border border-gray-200 overflow-hidden mx-auto transition-opacity duration-300 ${
                      isRemoving ? 'opacity-40 pointer-events-none' : ''
                    }`}
                  >
                    <div className="p-3 sm:p-4 lg:p-5">
                      <div className="relative mb-4">
                        <Link href={`/dashboard/hospitals/${hospital.id}`} className="block">
                          <div className="w-full h-48 sm:h-52 lg:h-56 bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden relative">
                            <Image
                              src={hospital.image}
                              alt={hospital.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded-md shadow-sm font-medium">
                          {hospital.distance}
                        </span>
                        <button
                          onClick={() => handleRemove(hospital.id)}
                          disabled={isRemoving}
                          aria-label="Remove from saved"
                          className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition disabled:cursor-not-allowed"
                        >
                          {isRemoving ? (
                            <Loader2 size={16} className="text-blue-800 animate-spin" />
                          ) : (
                            <Bookmark size={16} className="text-blue-800 fill-blue-800" />
                          )}
                        </button>
                      </div>

                      <Link href={`/dashboard/hospitals/${hospital.id}`} className="block space-y-2 sm:space-y-3">
                        <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                          {hospital.specializations?.[0] ?? 'General Services'}
                        </span>

                        <h3 className="font-semibold text-lg sm:text-xl text-gray-900 line-clamp-2">
                          {hospital.name}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-600">
                          Consultation fee: <span className="font-medium text-gray-900">₦{hospital.fee}</span>
                        </p>

                        <p className="text-sm sm:text-base text-blue-500 underline line-clamp-1">
                          {hospital.address}
                        </p>

                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(hospital.rating))}
                          </div>
                          <span className="text-sm text-gray-600">({hospital.reviews})</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </main>
              {/* <Footer /> */}
    </section>
  )
}

export default SavedScreen