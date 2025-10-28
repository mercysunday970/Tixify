"use client"

import { Toaster, toast } from "sonner";

import { Button } from '@/components/ui/button'
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function getStartedPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Inside export default function getStartedPage() { ... }

const handleSubmit = (e) => {
    // 1. Prevent default form submission behavior (page reload)
    e.preventDefault(); 
    
    // 2. Run validation checks
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.error("Please fix the errors before submitting.");
        return;
    }
    
    localStorage.setItem("signupData", JSON.stringify(formData));
    localStorage.setItem("authToken", "mock-token-12345");
    
    setSuccessMsg("Signup successful! Redirecting to login...");
    toast.success("Signup successful!");

    setTimeout(() => {
        setSuccessMsg("");
        router.push("/dashboard"); 
    }, 3000); 
};


  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 min-h-screen bg-indigo-400 px-4 font-TimesNewRoman'>

        <Toaster position="top-right" />

        <h1 className='text-white text-4xl font-extrabold p-10'>TIXIFY</h1>

        <form 
        onSubmit={handleSubmit}
        id="myForm" className='flex flex-col gap-2 bg-white p-8 rounded shadow-md w-full max-w-md'>
            <h3 className='text-2xl font-extrabold mx-auto'>Sign Up</h3>
            <p className='text- xl mx-auto'>Create your TIXIFY account</p>

            <label htmlFor="fname">First Name:</label>
            <input 
            className={`border-2 border-black border-rounded bg-gray-200 text-black p-2 rounded ${errors.fname ? 'border-red-500' : 'border-black'}`}
            type="text" id="fname" name="fname" placeholder='John' value={formData.fname}
            onChange={handleChange} required />
           {errors.fname && (<p className="text-red-500 text-sm mt-1">{errors.fname}</p>)}

            <label htmlFor="lname">Last Name:</label>
            <input 
            className={`border-2 border-black border-rounded bg-gray-200 text-black p-2 rounded ${errors.lname ? 'border-red-500' : 'border-black'}`}
            type="text" id="lname" name="lname" placeholder='Doe' value={formData.lname}
            onChange={handleChange} required />
            {errors.lname && (<p className="text-red-500 text-sm mt-1">{errors.lname}</p>)}

            <label htmlFor="username">Username:</label>
            <input 
            className={`border-2 border-black border-rounded bg-gray-200 text-black p-2 rounded ${errors.username ? 'border-red-500' : 'border-black'}`}
            type="text" id="username" name="username" placeholder='johndoe' value={formData.username}
            onChange={handleChange} required />
            {errors.username && (<p className="text-red-500 text-sm mt-1">{errors.username}</p>)}

            <label htmlFor="email">Email:</label>
            <input 
            className={`border-2 border-black border-rounded bg-gray-200 text-black p-2 rounded ${errors.email ? 'border-red-500' : 'border-black'}`}
            type="email" id="email" name="email" placeholder='johndoe@example.com' value={formData.email}
            onChange={handleChange} required />
            {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}

            <label htmlFor="password">Password:</label>
            <input 
            className={`border-2 border-black border-rounded bg-gray-200 text-black p-2 rounded ${errors.password ? 'border-red-500' : 'border-black'}`}
            type="password" id="password" name="password" placeholder='********' value={formData.password}
            onChange={handleChange} required />
            {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password}</p>)}

            <Button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-800 text-white mt-4 cursor-pointer hover:scale-105 transition-transform"
            disabled={!!successMsg}>
                Sign Up
            </Button>
        </form>

        {successMsg && (
        <div className="mt-4 text-green-600 font-semibold text-center">
          {successMsg}
        </div>
        )}
    </div>
  )
}
