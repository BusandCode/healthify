"use client"
import Header from '@/components/Header'
import HospitalSearch from '@/components/HospitalSearch'
import Image from 'next/image'
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { FaUserMd, FaHospital, FaCalendarAlt, FaShieldAlt, FaMapMarkerAlt, FaHeartbeat, FaStar, FaSearch, FaRegCalendarCheck, FaHandHoldingHeart, FaUsers, FaLightbulb } from "react-icons/fa"
import { useState, useRef, useEffect, ReactNode } from 'react'
// import Footer from '@/components/Footer'
import LandingFooter from '@/components/LandingFooter'
import Link from 'next/link'

/* ──────────────────────────────────────────────
   Scroll-reveal utilities
   ────────────────────────────────────────────── */

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })
    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return { ref, inView }
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
  as?: 'div' | 'span'
}

function Reveal({ children, className = '', delay = 0, direction = 'up', as = 'div' }: RevealProps) {
  const { ref, inView } = useInView()

  const hiddenTransform =
    direction === 'up' ? 'translate-y-8' :
    direction === 'down' ? '-translate-y-8' :
    direction === 'left' ? 'translate-x-8' :
    direction === 'right' ? '-translate-x-8' :
    direction === 'scale' ? 'scale-90' : ''

  const Tag = as as 'div'

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement> & React.RefObject<HTMLSpanElement>}
      className={`transition-all ease-out duration-700 ${inView ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${hiddenTransform}`} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

/* ──────────────────────────────────────────────
   Sections
   ────────────────────────────────────────────── */

function AboutUs() {
  const values = [
    {
      icon: <FaHandHoldingHeart className="text-xl text-blue-700" />,
      title: "Patient-first",
      description: "Every decision starts with what makes a patient's care easier, faster, and more transparent.",
    },
    {
      icon: <FaUsers className="text-xl text-blue-700" />,
      title: "Community-rooted",
      description: "Built with input from real doctors, clinics, and patients across the communities we serve.",
    },
    {
      icon: <FaLightbulb className="text-xl text-blue-700" />,
      title: "Radically simple",
      description: "Healthcare is complicated enough. Finding and booking care shouldn't be.",
    },
  ]

  return (
    <section id="about" className="py-20 sm:py-28 bg-white scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <Reveal direction="right">
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              About us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-6 leading-tight">
              We&apos;re making healthcare easier to find and afford
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              Healthify started with a simple frustration: finding a trustworthy doctor nearby,
              understanding what it would actually cost, and booking a time that worked shouldn&apos;t
              take a dozen phone calls and a leap of faith.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Today, we work with thousands of verified hospitals, clinics, and independent
              practitioners to give patients one place to search, compare, and book — with
              transparent pricing and real reviews from real patients, every time.
            </p>

            <div className="flex flex-wrap gap-8">
              {[
                { value: "2021", label: "Founded" },
                { value: "10k+", label: "Verified providers" },
                { value: "30+", label: "Cities covered" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-blue-800">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={150} className="relative flex justify-center">
            <div className="w-[280px] h-[320px] sm:w-[340px] sm:h-[380px] bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl overflow-hidden flex items-end justify-center shadow-2xl transition-transform duration-500 hover:scale-[1.03] hover:shadow-blue-900/30">
              <Image src="/doctor-2.png" alt="Healthify team" width={320} height={380} className="object-contain animate-[float_6s_ease-in-out_infinite]" />
            </div>
            <div className="absolute bottom-6 -left-4 sm:-left-8 bg-white border border-gray-100 shadow-lg rounded-2xl px-5 py-4 animate-[float_5s_ease-in-out_infinite]">
              <p className="text-sm font-semibold text-gray-900">Our mission</p>
              <p className="text-xs text-gray-400 mt-1 max-w-[160px] leading-relaxed">
                Affordable, transparent care within reach of everyone.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Reveal key={index} delay={index * 120}>
              <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-200">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const { ref: lineRef, inView: lineInView } = useInView()

  const steps = [
    {
      icon: <FaSearch className="text-xl text-blue-700" />,
      title: "Search your area",
      description: "Enter your location or condition to see doctors, clinics, and hospitals near you, ranked by rating and distance.",
    },
    {
      icon: <FaShieldAlt className="text-xl text-blue-700" />,
      title: "Compare providers",
      description: "Check credentials, consultation fees, accepted insurance, and real patient reviews side by side.",
    },
    {
      icon: <FaRegCalendarCheck className="text-xl text-blue-700" />,
      title: "Book your visit",
      description: "Pick a time that works for you and get instant confirmation, plus reminders so you never miss it.",
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-4">
            Three steps to your next appointment
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            No calling around, no guesswork on cost. Just search, compare, and book.
          </p>
        </Reveal>

        <div ref={lineRef} className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 relative">
          <div className="hidden sm:block absolute top-7 left-[16.5%] right-[16.5%] h-[2px] bg-blue-100 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-[1400ms] ease-out"
              style={{ width: lineInView ? '100%' : '0%' }}
            />
          </div>

          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 200} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 w-14 h-14 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 hover:scale-110 hover:shadow-md">
                {step.icon}
              </div>
              <span className="text-xs font-semibold text-blue-300 tracking-widest mb-2">
                STEP {index + 1}
              </span>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[260px]">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const reviews = [
    {
      name: "Amara Chukwu",
      role: "Booked a consultation in Lagos",
      quote: "I found a cardiologist near my office in under five minutes and booked the same day. The reminders meant I actually showed up on time for once.",
      rating: 5,
    },
    {
      name: "Tunde Bakare",
      role: "Booked a dental checkup in Abuja",
      quote: "Seeing accepted insurance plans upfront saved me from three phone calls. I knew exactly what I'd pay before I even walked in.",
      rating: 5,
    },
    {
      name: "Ngozi Eze",
      role: "Booked a pediatric visit in Port Harcourt",
      quote: "The reviews were spot on. I picked a clinic based on wait-time feedback from other parents and it made a stressful morning so much easier.",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Patient stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-4">
            Trusted by patients across the country
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Reveal key={index} delay={index * 150} direction="scale">
              <div className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm transition-transform duration-300 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-sm">
                    {review.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqData = [
    { question: "Can I book an appointment through the platform?", answer: "Yes, you can book appointments directly from the provider's profile page. Choose a time that works for you, and you'll receive a confirmation and reminders." },
    { question: "Is there a fee for using this platform?", answer: "No, our platform is completely free to use. You only pay the healthcare provider directly for their services. There are no hidden fees or charges for booking appointments or using our search features." },
    { question: "Can I cancel or reschedule an appointment?", answer: "Yes, you can easily cancel or reschedule appointments through your account dashboard. Please note that some providers may have specific cancellation policies, so we recommend checking their terms before booking." },
    { question: "What if I need directions to the hospital or clinic?", answer: "Each provider's profile includes their complete address and integrated maps. You can get turn-by-turn directions directly from the platform, and we also provide public transportation options where available." },
    { question: "How do I know if a hospital or doctor accepts my insurance?", answer: "Each provider's profile clearly lists all accepted insurance plans. You can also filter your search results by your specific insurance provider to only see covered options in your area." },
    { question: "How do I find specialists in my area?", answer: "Use our advanced search filters to find specialists by medical specialty, location, insurance acceptance, and patient ratings. You can also browse by category or use our recommendation engine based on your health needs." },
    { question: "Can I see patient reviews and ratings?", answer: "Yes, each healthcare provider has verified patient reviews and ratings. You can read detailed feedback about care quality, wait times, staff friendliness, and overall patient experience." },
    { question: "What if I need emergency care?", answer: "For medical emergencies, please call 911 or go to your nearest emergency room immediately. Our platform is designed for scheduled appointments and non-emergency healthcare needs." }
  ]

  return (
    <section id="faq" className="w-full bg-gray-50 py-20 px-4 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <Reveal key={index} delay={Math.min(index, 4) * 80}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 group"
              >
                <span className={`font-medium text-base transition-colors duration-200 ${openIndex === index ? 'text-blue-800' : 'text-gray-800 group-hover:text-blue-800'}`}>
                  {item.question}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${openIndex === index ? 'bg-blue-800 border-blue-800 text-white rotate-180' : 'border-gray-300 text-gray-400 group-hover:border-blue-800 group-hover:text-blue-800'}`}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const services = [
    { icon: <FaUserMd className="text-2xl text-blue-700" />, title: "Find qualified doctors", description: "Connect with board-certified physicians and specialists. View credentials, experience, and verified patient reviews." },
    { icon: <FaHospital className="text-2xl text-blue-700" />, title: "Locate top hospitals", description: "Discover accredited hospitals and medical centers near you. Compare facilities, services, and quality ratings." },
    { icon: <FaCalendarAlt className="text-2xl text-blue-700" />, title: "Easy appointment booking", description: "Schedule appointments instantly with real-time availability and get confirmation notifications and reminders." },
    { icon: <FaShieldAlt className="text-2xl text-blue-700" />, title: "Insurance verification", description: "Check which providers accept your insurance plan before booking. No surprise bills." },
    { icon: <FaMapMarkerAlt className="text-2xl text-blue-700" />, title: "Location-based search", description: "Find healthcare providers by distance, neighborhood, or address with directions included." },
    { icon: <FaHeartbeat className="text-2xl text-blue-700" />, title: "Emergency care locator", description: "Quickly locate the nearest emergency rooms and urgent care centers with live wait times." }
  ]

  const whyUs = [
    "Locate trusted doctors, clinics, and hospitals in your area",
    "Compare consultation fees and check accepted insurance plans",
    "Book appointments with reminders so you never miss a visit",
    "Help improve healthcare by sharing your feedback",
    "Easily save hospitals for quick access in the future",
  ]

  const stats = [
    { value: "10k+", label: "Verified providers" },
    { value: "50k+", label: "Appointments booked" },
    { value: "98%", label: "Patient satisfaction" },
    { value: "24/7", label: "Platform access" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* No dashboard NavBar here — this route is public/anonymous, unlike /dashboard */}
      <main className="pt-20">

        {/* ── Hero ── */}
        <section id="home" className="relative bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden scroll-mt-24">
          <div className="absolute top-0 right-0 w-125 h-125 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none animate-[blob_10s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 left-0 w-75 h-75 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none animate-[blob_12s_ease-in-out_infinite_reverse]" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span
                className={`inline-block text-xs font-semibold tracking-widest text-blue-200 uppercase mb-5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
              >
                Healthcare made simple
              </span>
              <h1
                className={`text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-white leading-[1.1] mb-5 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '120ms' }}
              >
                Your path to <br />
                <span className="text-blue-300">affordable</span> healthcare
              </h1>
              <p
                className={`text-blue-100 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '240ms' }}
              >
                Locate providers, view services, and schedule your next visit — all in one place.
              </p>
              <div
                className={`w-full max-w-2xl mx-auto lg:mx-0 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '360ms' }}
              >
                <HospitalSearch />
              </div>
            </div>

            <div
              className={`hidden lg:flex hrink-0 relative transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-75 h-95 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden flex items-end justify-center">
                <Image src="/doctor.png" width={280} height={360} alt="Doctor" className="object-contain animate-[float_6s_ease-in-out_infinite]" />
              </div>
              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl px-5 py-4 animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}>
                <p className="text-2xl font-bold text-blue-800">10k+</p>
                <p className="text-xs text-gray-500 mt-0.5">Verified providers</p>
              </div>
              <div className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-xl px-5 py-4 animate-[float_5.5s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
                <p className="text-2xl font-bold text-blue-800">98%</p>
                <p className="text-xs text-gray-500 mt-0.5">Patient satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 100} direction="scale" className="flex flex-col items-center">
                <p className="text-3xl sm:text-4xl font-bold text-blue-800">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── About us ── */}
        <AboutUs />

        <HowItWorks />

        {/* ── Why us ── */}
        <section className="py-20 sm:py-28 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right" className="relative flex justify-center">
              <div className="w-70 h-85 sm:w-[320px] sm:h-95 bg-linear-to-br from-blue-800 to-blue-600 rounded-3xl overflow-hidden flex items-end justify-center shadow-2xl transition-transform duration-500 hover:scale-[1.03]">
                <Image src="/doctor-2.png" alt="Doctor" width={300} height={360} className="object-contain animate-[float_6s_ease-in-out_infinite]" />
              </div>
              <div className="absolute top-6 -right-4 sm:right-0 bg-white border border-gray-100 shadow-lg rounded-2xl px-5 py-4 text-center animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}>
                <p className="text-2xl font-bold text-blue-800">50k+</p>
                <p className="text-[11px] text-gray-400 leading-tight mt-1">Appointments<br/>booked</p>
              </div>
            </Reveal>

            <Reveal direction="left" delay={150}>
              <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                Why choose us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight">
                Built around your <br />healthcare needs
              </h2>
              <ul className="space-y-5">
                {whyUs.map((item, i) => (
                  <Reveal key={i} delay={200 + i * 100} direction="left" as="div">
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 shrink-0 rounded-full bg-blue-50 flex items-center justify-center mt-0.5 transition-transform duration-300 hover:scale-125">
                        <IoMdCheckmarkCircleOutline className="text-blue-700 text-base" />
                      </div>
                      <span className="text-gray-600 text-base leading-relaxed">{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-20 sm:py-28 bg-gray-50 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <Reveal className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                What we offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-4">Our healthcare services</h2>
              <p className="text-gray-400 text-base max-w-xl mx-auto">
                Comprehensive solutions designed to make your medical journey easier and more accessible.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Reveal key={index} delay={(index % 3) * 120} direction="scale">
                  <div className="group bg-white border border-gray-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-base">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* ── CTA ── */}
        <section className="relative bg-blue-800 py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 w-150 h-150 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-[pulseSlow_6s_ease-in-out_infinite]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to take control of your health?
              </h2>
              <p className="text-blue-200 text-base mb-10 max-w-lg mx-auto">
                Join thousands of patients already using Healthify to find trusted, affordable care.
              </p>
            </Reveal>
            <Reveal delay={150} className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Get Started now routes through the splash screen, which redirects to /signup */}
                      <Link
            href="/splash"
            className="inline-block bg-white text-blue-800 font-semibold text-sm px-8 py-4 rounded-xl hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Get started for free
          </Link>
          <Link
          href="/explore"
          className="inline-block bg-transparent border-2 border-white/40 text-white font-semibold text-sm px-8 py-4 rounded-xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Browse providers
        </Link>
            </Reveal>
          </div>
        </section>

        <FAQ />

        <LandingFooter />
      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(var(--tx, 0), var(--ty, -50%)) scale(1); }
          50% { transform: translate(calc(var(--tx, 0) + 20px), calc(var(--ty, -50%) - 10px)) scale(1.08); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  )
}