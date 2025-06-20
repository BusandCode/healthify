// app/page.js or pages/index.js (ROOT PAGE - NOT NESTED)
"use client"
import Header from '@/components/Header'
import HospitalSearch from '@/components/HospitalSearch'
import NavBar from '@/components/NavBar'
import Image from 'next/image';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from 'react';

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
    <div className="w-full max-w-4xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-[#4203a9] text-center mb-12">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-800 pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0">
                {openIndex === index ? (
                  <div className="w-6 h-6 bg-[#4203a9] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">−</span>
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">+</span>
                  </div>
                )}
              </div>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4 border-t border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-600 text-sm">
          Still have questions? <a href="/contact" className="text-[#4203a9] hover:underline font-medium">Contact our support team</a>
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header />

      {/* NavBar */}
      <NavBar />

      {/* Main Content */}
      <main className="ml-[170px] pt-[100px]">
        {/* Hero Section */}
        <div className='flex flex-col items-start justify-center gap-10 mx-10 py-10'>
          <h1 className='font-semibold text-[30px] lg:text-[55px] max-w-[800px] text-[#4203a9] leading-tight'>
            Your Path to Affordable Healthcare Starts Here
          </h1>
          <p className='text-[#333333] text-[18px] lg:text-[20px] font-medium max-w-[600px] leading-relaxed'>
            Easily locate providers, view services, and schedule your next visit with confidence
          </p>

          {/* Hospital Search */}
          <HospitalSearch />

          {/* Why choose us */}
          {/* Why Choose Our Platform Section */}
          <div className="w-full py-10 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Image placeholder */}
              <div className="w-full lg:ml-10">
                <Image src="/doctor.png" alt='doctor Img' width={300} height={300}/>
              </div>

              {/* Right side - Content */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#4203a9] mb-8">
                  Why Choose Our Platform?
                </h2>
                
                <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <IoMdCheckmarkCircleOutline />
                    <p className="text-gray-700 text-[15px] text-base leading-relaxed">
                      Locate trusted doctors, clinics, and hospitals in your area
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <IoMdCheckmarkCircleOutline />
                    <p className="text-gray-700 text-[15px] text-base leading-relaxed">
                      Compare consultation fees and check accepted insurance plans
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <IoMdCheckmarkCircleOutline />
                    <p className="text-gray-700 text-[15px] text-base leading-relaxed">
                      Book appointments with reminders to ensure you never miss a visit
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <IoMdCheckmarkCircleOutline />
                    <p className="text-gray-700 text-[15px] text-base leading-relaxed">
                      Help improve healthcare by sharing your feedback
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <IoMdCheckmarkCircleOutline />
                    <p className="text-gray-700 text-[15px] text-base leading-relaxed">
                      Easily save hospitals for quick access to care in the future
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-32 bg-gradient-to-br from-[#4203a9]/10 to-[#4203a9]/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#4203a9]/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#4203a9] rounded"></div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Healthcare Service {i}</h3>
                  <p className="text-gray-600 text-sm">
                    Discover quality healthcare services tailored to your needs with our comprehensive platform.
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-32 bg-gradient-to-br from-[#4203a9]/10 to-[#4203a9]/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#4203a9]/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#4203a9] rounded"></div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Healthcare Service {i}</h3>
                  <p className="text-gray-600 text-sm">
                    Discover quality healthcare services tailored to your needs with our comprehensive platform.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <FAQ />
        </div>
      </main>
    </div>
  )
}