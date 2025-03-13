'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;
      
      setSuccess('Please check your email for the confirmation link.');
    } catch (error) {
      setError(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Similar UI structure to login page with form fields for signup
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: "#F5F2E3"}}>
      {/* Similar structure to login page, adapted for signup form */}
      <div className="w-full max-w-md">
        {/* Logo and Brand (same as login) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
              color: "#C5B358",
              filter: "drop-shadow(0 0 1px rgba(255, 215, 0, 0.5))"
            }}>
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <span style={{
              background: "linear-gradient(to bottom, #f1daa0 0%, #C5B358 50%, #9c8a3e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 2px rgba(197, 179, 88, 0.3)"
            }} className="ml-2 text-3xl font-bold">FCAST</span>
          </div>
          <p style={{ color: "#C5B358", textShadow: "0px 0px 1px rgba(197, 179, 88, 0.5)" }} className="mt-2">
            Cost Forecasting Made Simple
          </p>
        </div>
        
        {/* Signup Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 style={{
              background: "linear-gradient(to bottom, #f1daa0 0%, #C5B358 50%, #9c8a3e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 2px rgba(197, 179, 88, 0.3)"
            }} className="text-2xl font-bold mb-6">Create an account</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label style={{ color: "#C5B358" }} className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                {/* Password Field */}
                <div>
                  <label style={{ color: "#C5B358" }} className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
                        {showPassword ? (
                          <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></>
                        ) : (
                          <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Confirm Password Field */}
                <div>
                  <label style={{ color: "#C5B358" }} className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Confirm your password"
                  />
                </div>
                
                {/* Signup Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors disabled:opacity-70"
                    style={{
                      background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
                      boxShadow: "0 4px 6px rgba(197, 179, 88, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                    }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </>
                    ) : 'Sign up'}
                  </button>
                </div>
              </div>
            </form>
            
            {/* Sign In Option */}
            <div className="mt-6 text-center">
              <p style={{ color: "#C5B358" }} className="text-sm">
                Already have an account?{' '}
                <Link href="/login" style={{ color: "#C5B358", textShadow: "0px 0px 1px rgba(197, 179, 88, 0.5)" }} className="font-medium hover:text-[#A89A48]">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          
          {/* Decorative Bottom Border */}
          <div className="h-1" style={{
            background: "linear-gradient(to right, #f1daa0 0%, #C5B358 50%, #9c8a3e 100%)",
            boxShadow: "0 1px 3px rgba(197, 179, 88, 0.3)"
          }}></div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p style={{ color: "#C5B358" }} className="text-xs">
            &copy; 2025 FCAST.co.uk. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}