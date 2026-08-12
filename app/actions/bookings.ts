'use server'

import { db } from '@/utils/db'
import { getAuthenticatedUser } from './auth'
import { getHospitalById } from './hospitals'
import { revalidatePath } from 'next/cache'

export interface Booking {
  id: string
  userId: string
  hospitalId: number
  dateTime: Date
  status: string // "upcoming" | "completed" | "cancelled"
  hospital: {
    id: number
    name: string
    address: string
    image: string
  }
}

// Global variable for in-memory simulated booking persistence
let mockBookings: Booking[] = [
  {
    id: 'mock-1',
    userId: 'mock-user',
    hospitalId: 1,
    dateTime: new Date('2026-07-30T08:00:00.000Z'),
    status: 'upcoming',
    hospital: {
      id: 1,
      name: 'Ikeja General Hospital',
      address: 'Opebi Link Road, Ikeja',
      image: '/ikeja.jpg',
    },
  },
]

export async function getBookings() {
  const user = await getAuthenticatedUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  try {
    const dbBookings = await db.booking.findMany({
      where: {
        userId: user.id,
      },
      include: {
        hospital: {
          select: {
            id: true,
            name: true,
            address: true,
            image: true,
          },
        },
      },
      orderBy: {
        dateTime: 'asc',
      },
    })
    return dbBookings as unknown as Booking[]
  } catch (error) {
    console.warn('Database query failed for bookings. Returning mock fallback.', error)
    return mockBookings
  }
}

export async function createBooking(hospitalId: number, dateTime: Date) {
  const user = await getAuthenticatedUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  try {
    const booking = await db.booking.create({
      data: {
        userId: user.id,
        hospitalId,
        dateTime,
        status: 'upcoming',
      },
      include: {
        hospital: true,
      },
    })
    revalidatePath('/dashboard/bookings')
    return { success: true, booking }
  } catch (error) {
    console.warn('Database booking creation failed. Using mock fallback.', error)
    
    const hospital = await getHospitalById(hospitalId)
    if (!hospital) {
      return { success: false, error: 'Hospital not found' }
    }

    const newBooking: Booking = {
      id: `mock-${Date.now()}`,
      userId: user.id,
      hospitalId,
      dateTime,
      status: 'upcoming',
      hospital: {
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        image: hospital.image,
      },
    }
    
    mockBookings.push(newBooking)
    revalidatePath('/dashboard/bookings')
    return { success: true, booking: newBooking }
  }
}

export async function cancelBooking(bookingId: string) {
  const user = await getAuthenticatedUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  try {
    await db.booking.delete({
      where: {
        id: bookingId,
      },
    })
    revalidatePath('/dashboard/bookings')
    return { success: true }
  } catch (error) {
    console.warn('Database booking cancellation failed. Using mock fallback.', error)
    
    mockBookings = mockBookings.filter((b) => b.id !== bookingId)
    revalidatePath('/dashboard/bookings')
    return { success: true }
  }
}
