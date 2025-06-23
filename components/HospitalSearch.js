"use client"
import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

const HospitalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([
    'Dentist',
    'Radiology',
    'Radiology',
    'Radiology',
    'Radiology'
  ]);

  const handleRemoveFilter = (index) => {
    const newFilters = selectedFilters.filter((_, i) => i !== index);
    setSelectedFilters(newFilters);
  };

  const handleSearchSubmit = () => {
    console.log('Searching for:', searchQuery, 'in location:', location);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Search Form */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row">
          {/* Hospital Name Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by Name of Hospital"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 sm:h-12 pl-3 sm:pl-4 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4203a9] focus:border-transparent text-gray-700 placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          {/* Location Search */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4203a9] focus:border-transparent text-gray-700 placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearchSubmit}
            className="h-11 sm:h-12 px-4 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-[#4203a9]/90 transition-colors duration-300 flex items-center justify-center min-w-[100px] sm:min-w-[120px] font-medium text-sm sm:text-base"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden xs:inline sm:inline">Search</span>
            <span className="xs:hidden sm:hidden">Go</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-gray-700 font-medium text-sm sm:text-base">You may be looking for</h3>
        
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {selectedFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-300"
            >
              <span className="text-gray-700 font-medium text-xs sm:text-sm">{filter}</span>
              <button
                onClick={() => handleRemoveFilter(index)}
                className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center hover:bg-gray-300 rounded-full transition-colors duration-200 ml-1"
                aria-label={`Remove ${filter} filter`}
              >
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600" />
              </button>
            </div>
          ))}
        </div>

        {/* Add more filters button */}
        <button className="text-[#4203a9] hover:text-[#4203a9]/80 font-medium text-xs sm:text-sm transition-colors duration-200">
          + Add more filters
        </button>
      </div>

      {/* Popular Searches */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="text-xs sm:text-sm text-gray-500">
          <span className="font-medium">Popular searches:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Emergency Care', 'Cardiology', 'Pediatrics', 'Orthopedics'].map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(term)}
                className="text-[#4203a9] hover:text-[#4203a9]/80 hover:underline transition-colors duration-200 text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSearch;