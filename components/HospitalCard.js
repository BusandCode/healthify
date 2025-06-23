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
    name: 'Ikeja General Hospital',
    image: '/ikeja.jpg',
    distance: '3.5 miles',
    fee: '$5.00 - $15.00',
    address: 'Opebi Link Road, Ikeja',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 3,
    name: 'Ikeja General Hospital',
    image: '/ikeja.jpg',
    distance: '3.5 miles',
    fee: '$5.00 - $15.00',
    address: 'Opebi Link Road, Ikeja',
    rating: 4.8,
    reviews: 120,
  },
];

const HospitalCard = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name of hospital"
            className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
          />
        </div>
        <div className="relative w-full">
          <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Enter Location"
            className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
          />
        </div>
        <button className="h-11 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md text-sm sm:text-base text-[#4203a9] hover:bg-gray-100 transition w-full sm:w-auto">
          <SlidersHorizontal size={18} /> Advanced Filters
        </button>
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden relative">
            <div className="relative">
              <Image
                src={hospital.image}
                alt={hospital.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded shadow">
                {hospital.distance}
              </span>
              <Bookmark className="absolute top-2 right-2 text-gray-600" size={20} />
            </div>
            <div className="p-4">
              <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                General Services
              </span>
              <h3 className="mt-2 font-semibold text-base sm:text-lg">{hospital.name}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-1">
                Constatation fee: <span className="font-medium">{hospital.fee}</span>
              </p>
              <p className="text-sm sm:text-base text-blue-500 underline">{hospital.address}</p>
              <div className="flex items-center text-sm text-yellow-500 mt-1">
                {'★'.repeat(Math.floor(hospital.rating))}
                <span className="text-gray-600 ml-1">({hospital.reviews})</span>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white text-sm sm:text-base py-2 rounded hover:bg-blue-700 transition">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalCard;
