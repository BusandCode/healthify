// 'use client';

// import { MapPin, Search, SlidersHorizontal, Bookmark } from 'lucide-react';
// import Image from 'next/image';
// import React from 'react';


// const HospitalCard = () => {
//   return (
//     <div className="px-3 sm:px-4 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
//       <h1 className='font-semibold mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#4203a9] leading-tight'>
//         Find Healthcare Services
//       </h1>

//       {/* Hospital Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
//         {hospitals.map((hospital) => (
//           <div key={hospital.id} className="bg-white w-full max-w-[340px] sm:max-w-[320px] lg:max-w-[350px] rounded-2xl sm:rounded-3xl shadow-md border border-gray-200 overflow-hidden">
//             <div className="p-3 sm:p-4 lg:p-5">
//               {/* Image Container */}
//               <div className="relative mb-4">
//                 <div className="w-full h-48 sm:h-52 lg:h-56 bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
//                   <Image
//                     src={hospital.image}
//                     alt={hospital.name}
//                     width={400}
//                     height={250}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <span className="absolute top-3 left-3 bg-white text-xs px-2 py-1 rounded-md shadow-sm font-medium">
//                   {hospital.distance}
//                 </span>
//                 <button className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition">
//                   <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-[#0077CC]" />
//                 </button>
//               </div>
              
//               {/* Content */}
//               <div className="space-y-2 sm:space-y-3">
//                 <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
//                   General Services
//                 </span>
                
//                 <h3 className="font-semibold text-[16px] sm:text-xl text-gray-900 line-clamp-2">
//                   {hospital.name}
//                 </h3>
                
//                 <p className="text-sm sm:text-base text-gray-600">
//                   Consultation fee: <span className="font-medium text-gray-900">{hospital.fee}</span>
//                 </p>
                
//                 <p className="text-sm sm:text-base text-blue-500 underline line-clamp-1">
//                   {hospital.address}
//                 </p>
                
//                 <div className="flex items-center gap-1">
//                   <div className="flex text-yellow-400">
//                     {'★'.repeat(Math.floor(hospital.rating))}
//                   </div>
//                   <span className="text-sm text-gray-600">({hospital.reviews})</span>
//                 </div>
                
//                 <button className="w-full bg-blue-600 text-white text-sm sm:text-base py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium mt-4">
//                   Book Appointment
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HospitalCard;

'use client';

import { MapPin, Search, SlidersHorizontal, Bookmark, ArrowLeft, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';


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
    name: 'National OrthoRx Hospital',
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
  const [showFilter, setShowFilter] = useState(false);
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

  const specializations = [
    'Radiography',
    'General Medicine',
    'Orthopedics',
    'Pediatrician',
    'Cardiology',
    'Dermatology',
    'Neurology'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key, value) => {
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
    // Apply filter logic here
    setShowFilter(false);
  };

  return (
    <div>
    <div className="px-4 py-4 sm:py-6 max-w-7xl mx-auto">
      <h1 className='font-semibold mb-8 lg:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#4203a9] leading-tight'>
        Find Healthcare Services
      </h1>
      
            
             {/* Search Bar */}
       <div className="flex flex-col sm:flex-row gap-4 mb-8">
         <div className="relative w-full flex items-center justify-center">
           <Search className="absolute left-8 text-blue-600" size={20} />
           <input
            type="text"
            placeholder="Search by name of hospital"
            className="w-full max-w-[300px] lg:max-w-[415px] h-[50px] lg:h-[70px] pl-12 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
          />
        </div>
        <div className="relative w-full flex items-center justify-center">
          <MapPin className="absolute left-8 text-blue-600" size={20} />
          <input
            type="text"
            placeholder="Enter Location"
            className="w-full max-w-[300px] lg:max-w-[415px] h-[50px] lg:h-[70px] pl-12 pr-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#4203a9]"
          />
        </div>
          {/* <button 
            
            className="h-12 sm:h-14 lg:h-16 flex items-center justify-center gap-2 bg-[#D9D9D9] border border-gray-300 rounded-lg text-[#2C2C2C] hover:bg-gray-100 transition px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap sm:min-w-[180px]">
            
          </button> */}
        <button 
        onClick={() => setShowFilter(true)}
        className="max-w-[300px] mx-auto lg:max-w-[215px] h-[50px] lg:h-[70px] flex items-center
         justify-center gap-2 bg-[#D9D9D9] border border-gray-300 rounded-[5px] 
         text-[#2C2C2C] hover:bg-gray-100 transition w-full">
         <SlidersHorizontal size={18} className='text-blue-600 text-[20px] w-[16px] h-[18px]' /> 
         {/* <SlidersHorizontal size={16} className='text-[#4203a9]' />  */}
        <span className="sm:inline">Advanced Filters</span>
        {/* <span className="sm:hidden ">Filters</span> */}
         </button>
     </div>
        </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4 sm:gap-6 justify-items-center">
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
                
                <h3 className="font-semibold text-lg sm:text-xl text-gray-900 line-clamp-2">
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
                
                <button className="w-full bg-blue-600 cursor-pointer text-white text-sm sm:text-base py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium mt-4">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4">
          <div className="bg-white w-full max-w-md h-full max-h-screen overflow-hidden rounded-lg shadow-xl">
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
                
                <div className="relative mb-3">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
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
                onClick={clearAllFilters}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
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