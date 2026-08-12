'use server'

import { db } from '@/utils/db'

export interface Hospital {
  id: number
  name: string
  image: string
  distance: string
  fee: number
  address: string
  rating: number
  reviews: number
  specializations: string[]
  insurances: string[]
}

const fallbackHospitals: Hospital[] = [
  {
    id: 1,
    name: 'Ikeja General Hospital',
    image: '/ikeja.jpg',
    distance: '3.5 miles',
    fee: 8000,
    address: 'Opebi Link Road, Ikeja',
    rating: 4.8,
    reviews: 120,
    specializations: ['General Medicine', 'Radiography', 'Pediatrician'],
    insurances: ['NHIS', 'HMO', 'Self Pay'],
  },
  {
    id: 2,
    name: 'Lagos State Teaching Hospital',
    image: '/lagos.jpg',
    distance: '5.2 miles',
    fee: 20000,
    address: 'Idi-Araba, Surulere',
    rating: 4.5,
    reviews: 89,
    specializations: ['Cardiology', 'Neurology', 'General Medicine', 'Radiography'],
    insurances: ['NHIS', 'Private Insurance', 'HMO', 'Self Pay'],
  },
  {
    id: 3,
    name: 'National OrthoRx Hospital',
    image: '/national.jpg',
    distance: '4.1 miles',
    fee: 10000,
    address: 'Igbobi, Lagos',
    rating: 4.7,
    reviews: 156,
    specializations: ['Orthopedics', 'Radiography'],
    insurances: ['Private Insurance', 'HMO', 'Self Pay'],
  },
  {
    id: 4,
    name: 'Lagos University Hospital',
    image: '/lagos.jpg',
    distance: '6.8 miles',
    fee: 7000,
    address: 'Ikeja, Lagos',
    rating: 4.3,
    reviews: 203,
    specializations: ['General Medicine', 'Pediatrician', 'Dermatology'],
    insurances: ['NHIS', 'HMO', 'Self Pay'],
  },
  {
    id: 5,
    name: 'Federal Medical Centre',
    image: '/federal.jpg',
    distance: '7.5 miles',
    fee: 5000,
    address: 'Ebute Metta, Lagos',
    rating: 4.6,
    reviews: 134,
    specializations: ['General Medicine', 'Neurology', 'Cardiology'],
    insurances: ['NHIS', 'Private Insurance', 'HMO', 'Self Pay'],
  },
  {
    id: 6,
    name: 'Gbagada General Hospital',
    image: '/gbagada.jpg',
    distance: '8.2 miles',
    fee: 4000,
    address: 'Gbagada, Lagos',
    rating: 4.4,
    reviews: 98,
    specializations: ['General Medicine', 'Radiography', 'Dermatology'],
    insurances: ['NHIS', 'Self Pay'],
  },
]

export async function getHospitals(
  searchQuery?: string,
  location?: string,
  filters?: {
    specialization?: string
    consultationFees?: string
    distance?: string
    insurance?: string
    rating?: string
  }
) {
  try {
    const where: any = {}

    if (searchQuery) {
      where.name = { contains: searchQuery, mode: 'insensitive' }
    }

    if (location) {
      where.address = { contains: location, mode: 'insensitive' }
    }

    if (filters) {
      if (filters.specialization) {
        where.specializations = { has: filters.specialization }
      }

      if (filters.insurance) {
        where.insurances = { has: filters.insurance }
      }

      if (filters.consultationFees) {
        const feeStr = filters.consultationFees
        // UI fee options: "$0 - $10", "$10 - $20", "$20 - $30", "$30+"
        // Let's map these to Naira amounts (e.g. 500x multiplier)
        if (feeStr.includes('-')) {
          const parts = feeStr.replace(/[₦$]/g, '').split('-')
          const min = parseFloat(parts[0].trim())
          const max = parseFloat(parts[1].trim())
          const mult = feeStr.includes('$') ? 500 : 1
          where.fee = { gte: min * mult, lte: max * mult }
        } else if (feeStr.includes('+')) {
          const val = parseFloat(feeStr.replace(/[₦$+]/g, '').trim())
          const mult = feeStr.includes('$') ? 500 : 1
          where.fee = { gte: val * mult }
        }
      }

      if (filters.rating) {
        const val = parseFloat(filters.rating.replace(/[a-zA-Z\s+]/g, ''))
        if (!isNaN(val)) {
          where.rating = { gte: val }
        }
      }
    }

    return await db.hospital.findMany({
      where,
      orderBy: { name: 'asc' },
    })
  } catch (error) {
    console.warn('Database query failed. Using in-memory fallback.', error)
    
    let results = [...fallbackHospitals]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter((h) => h.name.toLowerCase().includes(q))
    }

    if (location) {
      const loc = location.toLowerCase()
      results = results.filter((h) => h.address.toLowerCase().includes(loc))
    }

    if (filters) {
      if (filters.specialization) {
        results = results.filter((h) => h.specializations.includes(filters.specialization!))
      }

      if (filters.insurance) {
        results = results.filter((h) => h.insurances.includes(filters.insurance!))
      }

      if (filters.consultationFees) {
        const feeStr = filters.consultationFees
        let min = 0
        let max = Infinity
        if (feeStr.includes('-')) {
          const parts = feeStr.replace(/[₦$]/g, '').split('-')
          min = parseFloat(parts[0].trim())
          max = parseFloat(parts[1].trim())
          const mult = feeStr.includes('$') ? 500 : 1
          min *= mult
          max *= mult
        } else if (feeStr.includes('+')) {
          min = parseFloat(feeStr.replace(/[₦$+]/g, '').trim())
          const mult = feeStr.includes('$') ? 500 : 1
          min *= mult
        }
        results = results.filter((h) => h.fee >= min && h.fee <= max)
      }

      if (filters.rating) {
        const val = parseFloat(filters.rating.replace(/[a-zA-Z\s+]/g, ''))
        if (!isNaN(val)) {
          results = results.filter((h) => h.rating >= val)
        }
      }
    }

    return results
  }
}

export async function getHospitalById(id: number) {
  try {
    return await db.hospital.findUnique({
      where: { id },
    })
  } catch (error) {
    console.warn(`Database query for hospital ${id} failed. Using in-memory fallback.`, error)
    return fallbackHospitals.find((h) => h.id === id) || null
  }
}
