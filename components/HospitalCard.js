'use client';

import { MapPin, Search, SlidersHorizontal, Bookmark } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const hospitals = [
  {
    id: 1,
    name: 'Ikeja General Hospital',
    image: '/ikeja.jpg',
    distance: '3.5 miles',
    fee: '$5.00 - $15.00',
    address: 'Opebi Link Road, Ikeja',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 2,
    name: 'Lagos Teaching Hospital',
    image: '/lagos.jpg',
    distance: '5.2 miles',
    fee: '$8.00 - $20.00',
    address: 'Idi-Araba, Surulere',
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 3,
    name: 'National Orthopaedic Hospital',
    image: '/national.jpg',
    distance: '4.1 miles',
    fee: '$10.00 - $25.00',
    address: 'Igbobi, Lagos',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: 'Lagos University Hospital',
    image: '/lagos.jpg',
    distance: '6.8 miles',
    fee: '$7.00 - $18.00',
    address: 'Ikeja, Lagos',
    rating: 4.3,
    reviews: 203,
  },
  {
    id: 5,
    name: 'Federal Medical Centre',
    image: '/federal.jpg',
    distance: '7.5 miles',
    fee: '$6.00 - $16.00',
    address: 'Ebute Metta, Lagos',
    rating: 4.6,
    reviews: 134,
  },
  {
    id: 6,
    name: 'Gbagada General Hospital',
    image: '/gbagada.jpg',
    distance: '8.2 miles',
    fee: '$4.00 - $12.00',
    address: 'Gbagada, Lagos',
    rating: 4.4,
    reviews: 98,
  },
];

const HospitalCard = () => {
  return (
    <div className="px-3 sm:px-4 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
      <h1 className='font-semibold mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#4203a9] leading-tight'>
        Find Healthcare Services
      </h1>
      
      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#4203a9]" size={18} />
          <input
            type="text"
            placeholder="Search by name of hospital"
            className="w-full h-12 sm:h-14 lg:h-16 pl-10 sm:pl-12 pr-4 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9] focus:border-transparent"
          />
        </div>
        
        {/* Location Input and Filter Button Container */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#4203a9]" size={18} />
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full h-12 sm:h-14 lg:h-16 pl-10 sm:pl-12 pr-4 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9] focus:border-transparent"
            />
          </div>
          
          <button className="h-12 sm:h-14 lg:h-16 flex items-center justify-center gap-2 bg-[#D9D9D9] border border-gray-300 rounded-lg text-[#2C2C2C] hover:bg-gray-100 transition px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap sm:min-w-[180px]">
            <SlidersHorizontal size={16} className='text-[#4203a9]' /> 
            <span className="hidden sm:inline">Advanced Filters</span>
            <span className="sm:hidden">Filters</span>
          </button>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white w-full max-w-[340px] sm:max-w-[320px] lg:max-w-[350px] rounded-2xl sm:rounded-3xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-5">
              {/* Image Container */}
              <div className="relative mb-4">
                <div className="w-full h-48 sm:h-52 lg:h-56 bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
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
                  General Services
                </span>
                
                <h3 className="font-semibold text-[16px] sm:text-xl text-gray-900 line-clamp-2">
                  {hospital.name}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600">
                  Consultation fee: <span className="font-medium text-gray-900">{hospital.fee}</span>
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
                
                <button className="w-full bg-blue-600 text-white text-sm sm:text-base py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium mt-4">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalCard;