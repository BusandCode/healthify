'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, SlidersHorizontal, Bookmark, ArrowLeft, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getHospitals, Hospital } from '@/app/actions/hospitals';
import { createBooking } from '@/app/actions/bookings';
import { useRouter } from 'next/navigation';

const HospitalCard: React.FC = () => {
  const router = useRouter();
  const [hospitalsList, setHospitalsList] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');
  
  const [filters, setFilters] = useState({
    specialization: '',
    consultationFees: '',
    distance: '',
    insurance: '',
    rating: ''
  });

  const [expandedSections, setExpandedSections] = useState({
    consultationFees: false,
    distance: false,
    insurance: false,
    rating: false
  });

  // State for inline booking selection
  const [bookingHospitalId, setBookingHospitalId] = useState<number | null>(null);
  const [bookingDateTime, setBookingDateTime] = useState<string>('');
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const specializations = [
    'Radiography',
    'General Medicine',
    'Orthopedics',
    'Pediatrician',
    'Cardiology',
    'Dermatology',
    'Neurology'
  ];

  const fetchHospitalsList = async () => {
    setLoading(true);
    try {
      const list = await getHospitals(searchName, searchLocation, filters);
      setHospitalsList(list);
    } catch (error) {
      console.error('Failed to load hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalsList();
  }, [filters]); // Refetch on filter changes

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    fetchHospitalsList();
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      specialization: '',
      consultationFees: '',
      distance: '',
      insurance: '',
      rating: ''
    });
  };

  const applyFilters = () => {
    fetchHospitalsList();
    setShowFilter(false);
  };

  const handleStartBooking = (hospitalId: number) => {
    setBookingHospitalId(hospitalId);
    setBookingDateTime('');
    setBookingStatus(null);
  };

  const handleConfirmBooking = async (hospitalId: number) => {
    if (!bookingDateTime) {
      setBookingStatus('Please select a date and time');
      return;
    }

    setBookingLoading(true);
    setBookingStatus(null);

    try {
      const res = await createBooking(hospitalId, new Date(bookingDateTime));
      if (res.success) {
        setBookingStatus('Success! Appointment booked.');
        setTimeout(() => {
          setBookingHospitalId(null);
          router.push('/dashboard/bookings');
        }, 1500);
      } else {
        setBookingStatus(res.error || 'Failed to book appointment');
      }
    } catch (error) {
      console.error(error);
      setBookingStatus('An error occurred. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div>
      <div className="px-4 py-4 sm:py-6 max-w-7xl mx-auto">
        <h1 className='font-semibold mb-8 lg:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-800 leading-tight'>
          Find Healthcare Services
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative w-full flex items-center justify-center">
            <Search className="absolute left-8 text-blue-600" size={20} />
            <input
              type="text"
              placeholder="Search by name of hospital"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full max-w-[300px] lg:max-w-[415px] h-[50px] lg:h-[70px] pl-12 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
            />
          </div>
          <div className="relative w-full flex items-center justify-center">
            <MapPin className="absolute left-8 text-blue-600" size={20} />
            <input
              type="text"
              placeholder="Enter Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full max-w-[300px] lg:max-w-[415px] h-[50px] lg:h-[70px] pl-12 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
            />
          </div>

          <div className="flex gap-2 w-full max-w-[300px] mx-auto lg:max-w-[350px]">
            <button 
              type="submit"
              className="h-[50px] lg:h-[70px] flex items-center justify-center bg-blue-800 text-white rounded-[5px] hover:bg-blue-900 transition flex-1 font-medium"
            >
              Search
            </button>
            <button 
              type="button"
              onClick={() => setShowFilter(true)}
              className="h-[50px] lg:h-[70px] flex items-center justify-center gap-2 bg-[#D9D9D9] border border-gray-300 rounded-[5px] text-[#2C2C2C] hover:bg-gray-100 transition px-3 sm:px-4"
            >
              <SlidersHorizontal size={18} className='text-blue-600' /> 
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </form>
      </div>

      {/* Hospital Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : hospitalsList.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium">
          No hospitals found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4 sm:gap-6 items-center justify-center max-w-7xl mx-auto">
          {hospitalsList.map((hospital) => (
            <div key={hospital.id} className="bg-white w-full max-w-[340px] sm:max-w-[320px] lg:max-w-[350px] rounded-2xl sm:rounded-3xl shadow-md border border-gray-200 overflow-hidden mx-auto">
              <div className="p-3 sm:p-4 lg:p-5">
                {/* Image Container */}
                <div className="relative mb-4">
                  <div className="w-full h-48 sm:h-52 lg:h-56 bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden relative">
                    <Image
                      src={hospital.image}
                      alt={hospital.name}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded-md shadow-sm font-medium">
                    {hospital.distance}
                  </span>
                  <button className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition">
                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-[#0077CC]" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3">
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {hospital.specializations && hospital.specializations[0] ? hospital.specializations[0] : 'General Services'}
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
                  
                  {/* Inline Booking Interface */}
                  {bookingHospitalId === hospital.id ? (
                    <div className="mt-4 p-3 bg-blue-50 rounded-xl space-y-3 border border-blue-100">
                      <label className="block text-xs font-semibold text-blue-800">
                        Select Date & Time:
                      </label>
                      <input
                        type="datetime-local"
                        value={bookingDateTime}
                        onChange={(e) => setBookingDateTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-800 bg-white text-gray-700"
                      />
                      {bookingStatus && (
                        <p className={`text-xs font-medium ${bookingStatus.startsWith('Success') ? 'text-green-600' : 'text-red-600'}`}>
                          {bookingStatus}
                        </p>
                      )}
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleConfirmBooking(hospital.id)}
                          disabled={bookingLoading}
                          className="flex-1 bg-blue-800 text-white text-xs py-2 rounded hover:bg-blue-900 transition font-semibold disabled:opacity-50"
                        >
                          {bookingLoading ? 'Confirming...' : 'Confirm'}
                        </button>
                        <button
                          onClick={() => setBookingHospitalId(null)}
                          disabled={bookingLoading}
                          className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs py-2 rounded hover:bg-gray-50 transition font-semibold disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleStartBooking(hospital.id)}
                      className="w-full bg-blue-800 cursor-pointer text-white text-sm sm:text-base py-2.5 sm:py-3 rounded-lg hover:bg-blue-900 transition font-medium mt-4"
                    >
                      Book Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 mt-6 text-center">
        <Link href="/" className='inline-block underline text-blue-600 font-medium'>
          See more
        </Link>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4">
          <div className="bg-white w-full max-w-md h-full max-h-screen overflow-hidden rounded-lg shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
              <button 
                onClick={() => setShowFilter(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Specialization */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-gray-900">Specialization</h3>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {specializations.map((spec, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="specialization"
                        value={spec}
                        checked={filters.specialization === spec}
                        onChange={(e) => handleFilterChange('specialization', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consultation Fees */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection('consultationFees')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                >
                  <h3 className="text-base font-medium text-gray-900">Consultation Fees</h3>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform ${expandedSections.consultationFees ? 'rotate-180' : ''}`} 
                  />
                </button>
                {expandedSections.consultationFees && (
                  <div className="px-4 pb-4 space-y-2">
                    {['$0 - $10', '$10 - $20', '$20 - $30', '$30+'].map((fee, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="consultationFees"
                          value={fee}
                          checked={filters.consultationFees === fee}
                          onChange={(e) => handleFilterChange('consultationFees', e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{fee}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Distance */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection('distance')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                >
                  <h3 className="text-base font-medium text-gray-900">Distance</h3>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform ${expandedSections.distance ? 'rotate-180' : ''}`} 
                  />
                </button>
                {expandedSections.distance && (
                  <div className="px-4 pb-4 space-y-2">
                    {['Within 2 miles', '2-5 miles', '5-10 miles', '10+ miles'].map((dist, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="distance"
                          value={dist}
                          checked={filters.distance === dist}
                          onChange={(e) => handleFilterChange('distance', e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{dist}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Accepted Insurance */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection('insurance')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                >
                  <h3 className="text-base font-medium text-gray-900">Accepted Insurance</h3>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform ${expandedSections.insurance ? 'rotate-180' : ''}`} 
                  />
                </button>
                {expandedSections.insurance && (
                  <div className="px-4 pb-4 space-y-2">
                    {['NHIS', 'Private Insurance', 'HMO', 'Self Pay'].map((ins, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="insurance"
                          value={ins}
                          checked={filters.insurance === ins}
                          onChange={(e) => handleFilterChange('insurance', e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{ins}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Average Rating */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection('rating')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                >
                  <h3 className="text-base font-medium text-gray-900">Average Rating</h3>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} 
                  />
                </button>
                {expandedSections.rating && (
                  <div className="px-4 pb-4 space-y-2">
                    {['4.5+ Stars', '4.0+ Stars', '3.5+ Stars', '3.0+ Stars'].map((rating, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={(e) => handleFilterChange('rating', e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{rating}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition animate-pulse-slow"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="flex-1 py-3 px-4 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalCard;
