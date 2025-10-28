"use client";

import { AiFillGoogleCircle } from 'react-icons/ai';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Toast = ({ message, onClose, isError }) => (
  <div
    className={`absolute top-4 right-4 px-4 py-3 rounded z-50 shadow-lg ${
      isError ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
    }`}
    role="alert"
  >
    <strong className="font-bold">{isError ? 'Error!' : 'Success!'}</strong>
    <span className="block sm:inline ml-2">{message}</span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={onClose}>&times;</span>
  </div>
);

export default function Login() {
  const router = useRouter();

  // STATE DEFINITION
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);

  // MOCK USER for local storage check
  const MOCK_USER = {
    email: 'test@tixify.com',
    password: 'password123',
    token: 'local-storage-token-12345'
  };

  // VALIDATION LOGIC
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid.';
    if (!password) newErrors.password = 'Password is required.';
    return newErrors;
  };

 // ... (rest of the component state and validation) ...

// SUBMISSION HANDLER
const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ show: false, message: '', isError: false });
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);

    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // 1. RETRIEVE SIGN-UP DATA FROM LOCALSTORAGE
    const storedUserDataString = localStorage.getItem("signupData");
    let isAuthenticated = false;

    if (storedUserDataString) {
        try {
            const storedUser = JSON.parse(storedUserDataString);
            
            // 2. COMPARE LOGIN INPUTS AGAINST STORED DATA
            if (email === storedUser.email && password === storedUser.password) {
                isAuthenticated = true;
            }
        } catch (e) {
            console.error("Failed to parse signupData from localStorage:", e);
        }
    }

    if (isAuthenticated) {
        // SUCCESS: Use the token saved during signup (or set a new one)
        localStorage.setItem('authToken', 'mock-token-12345');
        setToast({ show: true, message: 'Login successful!', isError: false });
        
        // Redirect after showing success toast
        setTimeout(() => {
          setToast({ show: false, message: '', isError: false });
          router.push('/dashboard');
        }, 2000);

    } else {
        // FAILURE (either stored data didn't exist or credentials didn't match)
        const errorMessage = 'Invalid email or password.';
        setErrors({ email: errorMessage, password: errorMessage }); 
        setToast({ show: true, message: errorMessage, isError: true });
    }
    
    setIsLoading(false);
};



  return (
    <div className="w-full flex items-center justify-center p-6 sm:p-12 relative bg-gradient-to-br from-indigo-600 to-blue-500 font-TimesNewRoman min-h-screen">
      {toast.show && <Toast message={toast.message} onClose={() => setToast({ show: false, message: '', isError: false })} isError={toast.isError} />}
      
      <div className="w-full max-w-md bg-gray-300 p-6 rounded-lg shadow-lg">
        {/* Logo and Title (Hidden on large screens) */}
        <div className="lg:hidden text-center mb-8">
          <div className="inline-block p-3 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500">
            <Ticket className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">TIXIFY</h1>
        </div>

        {/* Header Text */}
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-white mb-8">Please enter your details to sign in.</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className={`w-full pl-3 pr-4 py-3 border rounded-lg focus:ring-2 transition ${
                errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              aria-label="Email Address"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-baseline">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              className={`w-full pl-3 pr-4 py-3 border rounded-lg focus:ring-2 transition ${
                errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              aria-label="Password"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 bg-yellow-400 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300 flex items-center justify-center disabled:bg-yellow-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              'Login'
            )}
          </Button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6" role="separator">
          <div className="flex-grow border-t border-gray-300" />
          <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* Social Login Button */}
        <button
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition"
        >
          <AiFillGoogleCircle className="h-5 w-5" />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-8">
          Don't have an account? <a href="/getStarted" className="font-medium text-indigo-600 hover:underline">Get Started</a>
        </p>
      </div>
    </div>
  );
}
