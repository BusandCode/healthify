// app/page.js or pages/index.js (ROOT PAGE - NOT NESTED)
"use client"
import Header from '@/components/Header'
import HospitalSearch from '@/components/HospitalSearch'
import NavBar from '@/components/NavBar'
import Image from 'next/image';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { 
  FaUserMd, 
  FaHospital, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaMapMarkerAlt, 
  FaHeartbeat 
} from "react-icons/fa"
import { useState } from 'react';
import Footer from '@/components/Footer';

// FAQ Component
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First question open by default

  const faqData = [
    {
      question: "Can I book an appointment through the platform?",
      answer: "Yes, you can book appointments directly from the provider's profile page. Choose a time that works for you, and you'll receive a confirmation and reminders."
    },
    {
      question: "Is there a fee for using this platform?",
      answer: "No, our platform is completely free to use. You only pay the healthcare provider directly for their services. There are no hidden fees or charges for booking appointments or using our search features."
    },
    {
      question: "Can I cancel or reschedule an appointment?",
      answer: "Yes, you can easily cancel or reschedule appointments through your account dashboard. Please note that some providers may have specific cancellation policies, so we recommend checking their terms before booking."
    },
    {
      question: "What if I need directions to the hospital or clinic?",
      answer: "Each provider's profile includes their complete address and integrated maps. You can get turn-by-turn directions directly from the platform, and we also provide public transportation options where available."
    },
    {
      question: "How do I know if a hospital or doctor accepts my insurance?",
      answer: "Each provider's profile clearly lists all accepted insurance plans. You can also filter your search results by your specific insurance provider to only see covered options in your area."
    },
    {
      question: "How do I find specialists in my area?",
      answer: "Use our advanced search filters to find specialists by medical specialty, location, insurance acceptance, and patient ratings. You can also browse by category or use our recommendation engine based on your health needs."
    },
    {
      question: "Can I see patient reviews and ratings?",
      answer: "Yes, each healthcare provider has verified patient reviews and ratings. You can read detailed feedback about care quality, wait times, staff friendliness, and overall patient experience to help make informed decisions."
    },
    {
      question: "What if I need emergency care?",
      answer: "For medical emergencies, please call 911 or go to your nearest emergency room immediately. Our platform is designed for scheduled appointments and non-emergency healthcare needs."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#4203a9] text-center mb-8 sm:mb-12">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-3 sm:space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-800 pr-4 text-sm sm:text-base">
                {item.question}
              </span>
              <div className="flex-shrink-0">
                {openIndex === index ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#4203a9] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-bold">−</span>
                  </div>
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-bold">+</span>
                  </div>
                )}
              </div>
            </button>
            
            {openIndex === index && (
              <div className="px-4 sm:px-6 pb-3 sm:pb-4 border-t border-gray-100">
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed pt-3">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const services = [
    {
      icon: <FaUserMd className="text-2xl sm:text-3xl text-blue-600" />,
      title: "Find Qualified Doctors",
      description: "Connect with board-certified physicians and specialists in your area. View their credentials, experience, and patient reviews to make informed healthcare decisions."
    },
    {
      icon: <FaHospital className="text-2xl sm:text-3xl text-blue-600" />,
      title: "Locate Top Hospitals",
      description: "Discover accredited hospitals and medical centers near you. Compare facilities, services offered, and quality ratings to choose the best care for your needs."
    },
    {
      icon: <FaCalendarAlt className="text-2xl sm:text-3xl text-blue-600" />,
      title: "Easy Appointment Booking",
      description: "Schedule appointments instantly with real-time availability. Get confirmation notifications and reminders to ensure you never miss important medical visits."
    },
    {
      icon: <FaShieldAlt className="text-2xl sm:text-3xl text-blue-600" />,
      title: "Insurance Verification",
      description: "Check which providers accept your insurance plan before booking. Avoid surprise bills and ensure your coverage is accepted at your chosen healthcare facility."
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl sm:text-3xl text-blue-600" />,
      title: "Location-Based Search",
      description: "Find healthcare providers by distance, neighborhood, or specific address. Get directions, parking information, and public transit options for easy access."
    },
    {
      icon: <FaHeartbeat className="text-2xl sm:text-3xl text-blue-600" />,
      title: "Emergency Care Locator",
      description: "Quickly locate the nearest emergency rooms and urgent care centers. Access critical information like wait times and specialized emergency services available."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header />

      {/* NavBar */}
      <NavBar />

      {/* Main Content */}
      <main className="lg:ml-[170px] pt-[80px] sm:pt-[100px]">
        {/* Hero Section */}
        <div className='flex flex-col items-start justify-center gap-6 sm:gap-10 mx-4 sm:mx-6 lg:mx-10 py-6 sm:py-10'>

          {/* Description */}
          <div className='flex justify-center items-center gap-4 sm:gap-1 flex-col lg:flex-row w-full'>
            <div className="text-center lg:text-left">
              <h1 className='font-semibold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[55px] lg:max-w-[800px] text-[#4203a9] leading-tight px-2 sm:px-0'>
                Your Path to Affordable Healthcare Starts Here
              </h1>
              <p className='text-[#333333] text-[16px] sm:text-[18px] lg:text-[20px] font-medium max-w-[600px] leading-relaxed mt-3 sm:mt-4 px-2 sm:px-0'>
                Easily locate providers, view services, and schedule your next visit with confidence
              </p>
            </div>
            <div className="flex-shrink-0 mt-4 lg:mt-0">
              <Image 
                src="/doctor.png" 
                width={300} 
                height={300} 
                alt='Doctor Image'
                className="sm:w-[180px] sm:h-[180px] lg:w-[250px] lg:h-[300px]"
              />
            </div>
          </div>

          {/* Hospital Search */}
          <div className="w-full">
            <HospitalSearch />
          </div>

          {/* Why Choose Our Platform Section */}
          <div className="w-full py-6 sm:py-10 mt-8 sm:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Left side - Image */}
              <div className="w-full flex justify-center lg:justify-start order-2 lg:order-1 lg:ml-10">
                <Image 
                  src="/doctor-2.png" 
                  alt='doctor Img' 
                  width={250} 
                  height={250} 
                  className='rounded-lg sm:w-[280px] sm:h-[280px] lg:w-[300px] lg:h-[300px]'
                />
              </div>

              {/* Right side - Content */}
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 px-2 sm:px-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4203a9] mb-4 sm:mb-8 text-center lg:text-left">
                  Why Choose Our Platform?
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <IoMdCheckmarkCircleOutline className="text-[#4203a9] text-lg sm:text-xl" />
                    </div>
                    <p className="text-gray-700 text-[14px] sm:text-[15px] leading-relaxed">
                      Locate trusted doctors, clinics, and hospitals in your area
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <IoMdCheckmarkCircleOutline className="text-[#4203a9] text-lg sm:text-xl" />
                    </div>
                    <p className="text-gray-700 text-[14px] sm:text-[15px] leading-relaxed">
                      Compare consultation fees and check accepted insurance plans
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <IoMdCheckmarkCircleOutline className="text-[#4203a9] text-lg sm:text-xl" />
                    </div>
                    <p className="text-gray-700 text-[14px] sm:text-[15px] leading-relaxed">
                      Book appointments with reminders to ensure you never miss a visit
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <IoMdCheckmarkCircleOutline className="text-[#4203a9] text-lg sm:text-xl" />
                    </div>
                    <p className="text-gray-700 text-[14px] sm:text-[15px] leading-relaxed">
                      Help improve healthcare by sharing your feedback
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <IoMdCheckmarkCircleOutline className="text-[#4203a9] text-lg sm:text-xl" />
                    </div>
                    <p className="text-gray-700 text-[14px] sm:text-[15px] leading-relaxed">
                      Easily save hospitals for quick access to care in the future
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section Title */}
          <div className="w-full text-center mt-8 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4203a9] mb-4">
              Our Healthcare Services
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Discover comprehensive healthcare solutions designed to make your medical journey easier and more accessible
            </p>
          </div>

          {/* Content Grid - All Services */}
          <div className="w-full max-w-6xl mx-auto px-2 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-full h-24 sm:h-32 bg-gray-200/40 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-center text-gray-900 mb-2 text-sm sm:text-base">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <FAQ />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}