'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  User as UserIcon,
  Mail,
  Phone,
  Pencil,
  Camera,
  Loader2,
  LogOut,
  Check,
  X,
} from 'lucide-react'
import { getAuthenticatedUser, signOut } from '@/app/actions/auth'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
// import Footer from '@/components/Footer'

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatarUrl?: string
}

interface ProfileFormState {
  firstName: string
  lastName: string
  phone: string
}

const ProfileScreen: React.FC = () => {
  const router = useRouter()

  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [form, setForm] = useState<ProfileFormState>({ firstName: '', lastName: '', phone: '' })

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

  const fetchUser = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const userData = await getAuthenticatedUser()
      if (userData) {
        const mapped: UserData = {
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: (userData as UserData).phone || '',
          avatarUrl: (userData as UserData).avatarUrl,
        }
        setUser(mapped)
        setForm({
          firstName: mapped.firstName,
          lastName: mapped.lastName,
          phone: mapped.phone || '',
        })
      } else {
        setError('Could not load your profile. Please log in again.')
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
      setError('Something went wrong loading your profile.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const displayName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.email?.split('@')[0] || 'User'
    : ''

  const initials = displayName
    ? displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  const handleEditToggle = () => {
    if (!user) return
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!user) return
    setIsSaving(true)
    setError(null)
    try {
      // TODO: replace with the real update action, e.g.
      // await updateUserProfile({ firstName: form.firstName, lastName: form.lastName, phone: form.phone })
      await new Promise((resolve) => setTimeout(resolve, 600))

      setUser((prev) =>
        prev
          ? { ...prev, firstName: form.firstName, lastName: form.lastName, phone: form.phone }
          : prev
      )
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to update profile:', err)
      setError('Could not save your changes. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarClick = () => {
    // TODO: wire up to a real avatar upload flow (e.g. Cloudinary-backed PATCH /profile/avatar)
    console.log('Open avatar upload')
  }

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true)
    try {
      await signOut()
    } catch (err) {
      console.error('Logout error:', err)
      setIsLoggingOut(false)
    }
  }

  return (
    <section className="bg-white min-h-screen">
      <Header />
      <NavBar />

      <main className="lg:ml-[170px] pt-[80px] lg:mb-0 sm:pt-[100px] flex flex-col gap-[100px]">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-24 w-full">
          <div className="flex items-center gap-2 mb-1">
            <UserIcon size={20} className="text-blue-800" />
            <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl text-gray-900">Profile</h1>
          </div>
          <p className="text-sm text-gray-500 mb-6 sm:mb-8">
            Manage your personal information and account settings
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
          ) : !user ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <UserIcon size={22} className="text-blue-800" />
              </div>
              <h2 className="text-base font-semibold text-gray-800 mb-1">We couldn&apos;t load your profile</h2>
              <p className="text-sm text-gray-500 max-w-xs mb-6">
                Please try refreshing the page, or log in again.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile header card */}
              <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 border-2 border-slate-100 flex items-center justify-center text-white font-semibold text-2xl overflow-hidden">
                      {initials}
                    </div>
                    <button
                      onClick={handleAvatarClick}
                      aria-label="Change profile photo"
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
                    >
                      <Camera size={14} className="text-blue-800" />
                    </button>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{displayName}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>

                    {!isEditing && (
                      <button
                        onClick={handleEditToggle}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-800 border border-blue-100 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Pencil size={14} />
                        Edit profile
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal information card */}
              <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-7">
                <h3 className="font-semibold text-gray-900 mb-5">Personal information</h3>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                          First name
                        </label>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 0801 234 5678"
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-400 mt-1.5">Email address cannot be changed here.</p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-800 px-5 py-2.5 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Check size={15} />
                        )}
                        {isSaving ? 'Saving...' : 'Save changes'}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        <X size={15} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    <div className="flex items-center gap-3 py-3.5 first:pt-0">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <UserIcon size={15} className="text-blue-800" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Full name</p>
                        <p className="text-sm font-medium text-gray-900">{displayName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-3.5">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Mail size={15} className="text-blue-800" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-3.5 last:pb-0">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Phone size={15} className="text-blue-800" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phone number</p>
                        <p className="text-sm font-medium text-gray-900">
                          {user.phone || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account settings card */}
              <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-7">
                <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
                <div className="divide-y divide-gray-100">
                  <button
                    onClick={() => router.push('/profile/change-password')}
                    className="w-full flex items-center justify-between py-3.5 first:pt-0 text-left group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800 transition-colors">
                      Change password
                    </span>
                    <span className="text-gray-300 group-hover:text-blue-800 transition-colors">›</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-2 py-3.5 last:pb-0 text-left text-[#ED0505] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={16} />
                    <span className="text-sm font-medium">
                      {isLoggingOut ? 'Logging out...' : 'Log out'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </section>
  )
}

export default ProfileScreen