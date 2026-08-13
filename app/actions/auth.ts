'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { db } from '@/utils/db'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const firstName = (formData.get('firstName') as string)?.trim()
  const lastName = (formData.get('lastName') as string)?.trim()

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  if (!firstName || !lastName) {
    return { error: 'First and last name are required' }
  }

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

  if (!data?.user) {
    return { error: 'Something went wrong creating your account. Please try again.' }
  }

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

  // If Supabase requires email confirmation, signUp succeeds but returns no
  // session — the user isn't actually logged in yet, so sending them to a
  // protected /dashboard route would just bounce them back out (or worse,
  // render as "logged in" against stale/absent auth state). Surface that
  // distinction to the caller instead of blindly redirecting.
  if (!data.session) {
    return {
      success: true,
      requiresEmailConfirmation: true,
      message: 'Account created! Please check your email to confirm your account before logging in.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Supabase's default copy ("Invalid login credentials") is accurate but
    // terse — keep it, just don't leak whether it was the email or password
    // that was wrong.
    return { error: error.message }
  }

  // Belt-and-suspenders: don't trust the absence of an `error` alone as proof
  // the user is signed in. Confirm there's an actual session/user before
  // sending them to a protected route.
  if (!data?.session || !data.user) {
    return { error: 'Could not sign you in. Please try again.' }
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

  if (!data?.url) {
    return { error: 'Could not start Google sign-in. Please try again.' }
  }

  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error signing out:', error)
  }

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