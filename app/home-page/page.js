// app/page.js or pages/index.js (ROOT PAGE - NOT NESTED)
import Header from '@/components/Header'
import HospitalSearch from '@/components/HospitalSearch'
import NavBar from '@/components/NavBar'
import Image from 'next/image';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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
        </div>
      </main>
    </div>
  )
}