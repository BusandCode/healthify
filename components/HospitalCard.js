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
  {
    id: 4,
    name: 'Ikeja General Hospital',
    image: '/ikeja.jpg',
    distance: '3.5 miles',
    fee: '$5.00 - $15.00',
    address: 'Opebi Link Road, Ikeja',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 5,
    name: 'Ikeja General Hospital',
    image: '/ikeja.jpg',
    distance: '3.5 miles',
    fee: '$5.00 - $15.00',
    address: 'Opebi Link Road, Ikeja',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 6,
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
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
    <h1 className='font-semibold mb-5 text-[24px] sm:text-[20px] md:text-[30px] lg:text-[40px]
          text-[#4203a9]'>
          Find Healthcare Services</h1>
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative w-full flex items-center justify-center">
          <Search className="absolute left-5 text-[#4203a9] " size={20} />
          <input
            type="text"
            placeholder="Search by name of hospital"
            className="w-full max-w-[415px] h-[70px] pl-10 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
          />
        </div>
        <div className="relative w-full flex items-center justify-center">
          <MapPin className="absolute left-5 text-[#4203a9]" size={20} />
          <input
            type="text"
            placeholder="Enter Location"
            className="w-full max-w-[415px] h-[70px] pl-10 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
          />
        </div>
        <button className="max-w-[215px] h-[70px] flex items-center 
        justify-center gap-2 bg-[#D9D9D9] border border-gray-300 rounded-[5px] 
        text-[#2C2C2C] hover:bg-gray-100 transition w-full">
        <SlidersHorizontal size={18} className='text-[#4203a9] cursor-pointer text-[20px] w-[16px] h-[18px]' /> 
        Advanced Filters
        </button>
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white max-w-[330px] h-[616px] 
          rounded-[25px] shadow border border-gray-200 overflow-hidden relative">
            <div className='max-w-[280px] mx-auto h-[566px] flex flex-col justify-center items-center gap-[18px]'>
                <div className="relative">
              <Image
                src={hospital.image}
                alt={hospital.name}
                width={400}
                height={250}
                className="w-[280px] h-[280px] rounded-[15px]"
              />
              <span className="absolute top-4 left-2 bg-white text-xs px-2 py-1 rounded shadow">
                {hospital.distance}
              </span>
              <Bookmark className="absolute top-4 right-2 text-gray-600" size={20} />
            </div>
            <div className="p-4">
              <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                General Services
              </span>
              <h3 className="mt-2 font-medium text-[23px]">{hospital.name}</h3>
              <p className="text-[20px] text-gray-600 mb-1">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalCard;
