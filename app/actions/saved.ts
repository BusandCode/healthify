'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { db } from '@/utils/db'
import type { Hospital } from '@/app/actions/hospitals'

export async function getSavedHospitals(): Promise<Hospital[]> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return []

  try {
    const saved = await db.savedHospital.findMany({
      where: { userId: user.id },
      include: { hospital: true },
      orderBy: { createdAt: 'desc' },
    })
    return saved.map((entry) => entry.hospital)
  } catch (dbError) {
    console.error('getSavedHospitals error:', dbError)
    return []
  }
}

export type ToggleSavedResult =
  | { success: true; saved: boolean }
  | { success: false; error: string }

export async function toggleSavedHospital(hospitalId: number): Promise<ToggleSavedResult> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { success: false, error: 'Not authenticated' }
  }

  try {
    const existing = await db.savedHospital.findUnique({
      where: {
        userId_hospitalId: {
          userId: user.id,
          hospitalId,
        },
      },
    })

    if (existing) {
      await db.savedHospital.delete({ where: { id: existing.id } })
      revalidatePath('/dashboard/saved')
      return { success: true, saved: false }
    }

    await db.savedHospital.create({
      data: { userId: user.id, hospitalId },
    })
    revalidatePath('/dashboard/saved')
    return { success: true, saved: true }
  } catch (dbError) {
    console.error('toggleSavedHospital error:', dbError)
    return { success: false, error: 'Could not update saved hospital' }
  }
}