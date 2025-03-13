'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data?.user) {
        return router.push('/login');
      }
      
      setUser(data.user);
      setLoading(false);
    };
    
    checkUser();
  }, [router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center" style={{backgroundColor: "#F5F2E3"}}>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: "#F5F2E3"}}>
      <h1 className="text-2xl font-bold mb-6" style={{
        background: "linear-gradient(to bottom, #f1daa0 0%, #C5B358 50%, #9c8a3e 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0px 0px 2px rgba(197, 179, 88, 0.3)"
      }}>Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Welcome, {user.email}</h2>
        <p className="text-gray-600">You are now signed in to your FCAST account.</p>
        <button 
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
          }}
          className="mt-4 px-4 py-2 rounded-md text-white"
          style={{
            background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
            boxShadow: "0 2px 4px rgba(197, 179, 88, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
          }}
        >
          Sign Out
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Contracts</h3>
          <p className="text-3xl font-bold" style={{ color: "#C5B358" }}>0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Contract Value</h3>
          <p className="text-3xl font-bold" style={{ color: "#C5B358" }}>£0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Upcoming Renewals</h3>
          <p className="text-3xl font-bold" style={{ color: "#C5B358" }}>0</p>
        </div>
      </div>
    </div>
  );
}