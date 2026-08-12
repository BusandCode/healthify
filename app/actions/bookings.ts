'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { db } from '@/utils/db'
import type { Hospital } from '@/app/actions/hospitals'

export interface BookingWithHospital {
  id: string
  dateTime: Date
  status: string
  createdAt: Date
  hospital: Hospital
}

export async function createBooking(hospitalId: number, dateTime: Date) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { success: false, error: 'Not authenticated' }
  }

  try {
    await db.booking.create({
      data: {
        userId: user.id,
        hospitalId,
        dateTime,
        status: 'upcoming',
      },
    })
    revalidatePath('/dashboard/bookings')
    return { success: true }
  } catch (dbError) {
    console.error('createBooking error:', dbError)
    return { success: false, error: 'Could not create booking. Please try again.' }
  }
}

export async function getBookings(): Promise<BookingWithHospital[]> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return []

  try {
    return await db.booking.findMany({
      where: { userId: user.id },
      include: { hospital: true },
      orderBy: { dateTime: 'asc' },
    })
  } catch (dbError) {
    console.error('getBookings error:', dbError)
    return []
  }
}

export type CancelBookingResult =
  | { success: true }
  | { success: false; error: string }

export async function cancelBooking(bookingId: string): Promise<CancelBookingResult> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { success: false, error: 'Not authenticated' }
  }

  try {
    const booking = await db.booking.findUnique({ where: { id: bookingId } })
    if (!booking || booking.userId !== user.id) {
      return { success: false, error: 'Booking not found' }
    }

    await db.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled' },
    })
    revalidatePath('/dashboard/bookings')
    return { success: true }
  } catch (dbError) {
    console.error('cancelBooking error:', dbError)
    return { success: false, error: 'Could not cancel booking. Please try again.' }
  }
}