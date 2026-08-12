'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { db } from '@/utils/db'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

 
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) {
    // Provide better error message for existing users
    if (error.message.includes('already registered') || error.message.includes('User already registered')) {
      return { error: 'An account with this email already exists. Please log in instead.' }
    }
    return { error: error.message }
  }

  if (data?.user) {
    try {
      await db.user.upsert({
        where: { id: data.user.id },
        update: {
          email: data.user.email ?? email,
          firstName,
          lastName,
        },
        create: {
          id: data.user.id,
          email: data.user.email ?? email,
          firstName,
          lastName,
        },
      })
    } catch (dbError) {
      console.error('Error syncing user to DB during signup:', dbError)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return null
  }

  try {
    const dbUser = await db.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email!,
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
      },
      create: {
        id: user.id,
        email: user.email!,
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
      },
    })
    return dbUser
  } catch (dbError) {
    console.error('Error syncing user to DB:', dbError)
    // Fallback when DB connection is not configured or offline
    return {
      id: user.id,
      email: user.email!,
      firstName: user.user_metadata?.first_name || '',
      lastName: user.user_metadata?.last_name || '',
    }
  }
}