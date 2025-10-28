import React from 'react'
import { Button }  from '@/components/ui/button'
import Link from 'next/link'
import { Ticket } from 'lucide-react'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export default function page() {
  return (
    <div className="min-h-screen flex flex-col">

   <main className="justify-center relative bg-gradient-to-r from-indigo-600 to-blue-600 w-ful lmx-auto px-6 py-10 text-white overflow-hidden mb-[-25px]">

      <div className='mx-auto text-center gap-5'>
        <h1 className="text-4xl text-center font-extrabold mb-4">TIXIFY</h1> 
        <p className="mb-8 text-lg ">Your destination for creating and managing event tickets</p>

      </div>
      
     <div className="flex justify-center gap-5 p-10 mt-10 mb-8 text-lg">

      <Button 
      className="bg-yellow-500 hover:bg-yellow-700 cursor-pointer text-black">
        <Link href="/login">Login</Link>
      </Button>
      
       <Link href="/getStarted">
       <Button className="bg-indigo-400 hover:bg-indigo-600 cursor-pointer text-white">
       Get Started
      </Button>
      </Link>
    </div>
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
      <svg
        className="relative block w-[calc(100%+1.3px)] h-32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22,103.59,29,158,17,
          70.36-15.39,136.13-57.58,206-66.66C438.18-14.11,
          512,14.88,583,35.59c69.14,20.26,138.28,32.91,
          208,24.08,66.54-8.35,130.46-38.38,196-53.69,
          C1038.4-4,1114.24,1.66,1200,29.15V0Z"
          fill="#ffffff"
        ></path>
      </svg>
    </div>

    </main>

    <div className='flex-grow max-w-[600px] sm:w-full md:w-full px-6 py-10 mt-10 '>
      <h3 className='text-indigo-600 font-bold font-2xl'>WHY TIXIFY?</h3>
      <p className='text-black font-bold font-xl'>Everything you need for your event</p>
      <p className='text-gray-600'>From small meetups to large-scale concerts, TIXIFY provides the tools to make your event a success.</p>


    </div>
      <footer className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-200 text-black w-full px-8 py-6 mt-8 text-center">
      {/* Brand */}
      <p className="flex items-center gap-2 text-2xl font-extrabold">
        <Ticket className="w-6 h-6 text-blue-500" />
        TIXIFY
      </p>

      {/* Copyright */}
      <p className="text-gray-600 text-sm">
        © 2024 <span className="font-semibold">TIXIFY</span>. All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 text-gray-500">
        <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
        <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
        <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors" />
        <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-500 transition-colors" />
      </div>
    </footer>

     

    
    
    </div>
  )
}

