import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
const Header = () => {
  return (
    <section className='flex justify-between px-10 py-5'>
      <div>
        <h1 className='text-[25px] lg:text-[40px] text-[#4203a9] font-bold'>HEALTHIFY</h1>
      </div>
      <div className='flex gap-10 items-center'>
        <IoNotificationsOutline className='w-[50px] h-[50px] rounded-[60px] text-white bg-[#4203a9] p-3'/>
        <button className='bg-[#4203a9] max-w-[250px] h-[62px] p-[15px] rounded-[5px] text-white text-[20px] font-medium'>Book Appointment</button>
      </div>
    </section>
  )
}

export default Header
