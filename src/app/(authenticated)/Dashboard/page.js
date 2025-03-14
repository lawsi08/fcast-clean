'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContracts: 0,
    totalValue: 0,
    activeContracts: 0,
    expiringContracts: 0
  });
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data?.user) {
        return router.push('/login');
      }
      
      setUser(data.user);
      fetchStats();
    };
    
    checkUser();
  }, [router]);

  const fetchStats = async () => {
    try {
      // Get total contracts
      const { data: contracts, error: contractsError } = await supabase
        .from('contract_info')
        .select('id, contract_value, currency, status, end_date');
      
      if (contractsError) throw contractsError;
      
      // Calculate stats
      const now = new Date();
      const inThreeMonths = new Date();
      inThreeMonths.setMonth(now.getMonth() + 3);
      
      const activeContracts = contracts?.filter(c => c.status === 'Active') || [];
      const expiringContracts = contracts?.filter(c => {
        if (!c.end_date) return false;
        const endDate = new Date(c.end_date);
        return endDate > now && endDate < inThreeMonths && c.status === 'Active';
      }) || [];
      
      // Calculate total value (simplified - assumes all same currency)
      const totalValue = contracts?.reduce((sum, contract) => {
        return sum + (parseFloat(contract.contract_value) || 0);
      }, 0) || 0;
      
      setStats({
        totalContracts: contracts?.length || 0,
        totalValue,
        activeContracts: activeContracts.length,
        expiringContracts: expiringContracts.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center" style={{backgroundColor: "#F5F2E3"}}>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: "#F5F2E3"}}>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold" style={{
          background: "linear-gradient(to bottom, #f1daa0 0%, #C5B358 50%, #9c8a3e 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 0px 2px rgba(197, 179, 88, 0.3)"
        }}>Dashboard</h1>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Welcome, {user.email}</span>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/login');
            }}
            className="px-4 py-2 text-sm rounded-md text-white"
            style={{
              background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
              boxShadow: "0 2px 4px rgba(197, 179, 88, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Contracts</h3>
          <p className="text-3xl font-bold" style={{ color: "#C5B358" }}>{stats.totalContracts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Contract Value</h3>
          <p className="text-3xl font-bold" style={{ color: "#C5B358" }}>
            £{stats.totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Contracts</h3>
          <p className="text-3xl font-bold" style={{ color: "#C5B358" }}>{stats.activeContracts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Expiring Soon</h3>
          <p className="text-3xl font-bold" style={{ color: "#C5B358" }}>{stats.expiringContracts}</p>
        </div>
      </div>
      
      {/* Main Data Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Data Tables Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Data Tables</h2>
          <p className="text-gray-600 mb-4">Manage your critical contract data and information.</p>
          
          <div className="space-y-3">
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <Link href="/contracts" className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Contracts</h3>
                  <p className="text-sm text-gray-500">Manage contract information and details</p>
                </div>
                <span className="text-blue-600">&rarr;</span>
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <Link href="/orders" className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Orders</h3>
                  <p className="text-sm text-gray-500">Track purchase orders and details</p>
                </div>
                <span className="text-blue-600">&rarr;</span>
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <Link href="/schedule" className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Schedule</h3>
                  <p className="text-sm text-gray-500">Manage activity schedules and timelines</p>
                </div>
                <span className="text-blue-600">&rarr;</span>
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <Link href="/rates" className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Contract Rates</h3>
                  <p className="text-sm text-gray-500">Manage contract rate information</p>
                </div>
                <span className="text-blue-600">&rarr;</span>
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <Link href="/estimates" className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Cost Estimates</h3>
                  <p className="text-sm text-gray-500">Manage cost estimate information</p>
                </div>
                <span className="text-blue-600">&rarr;</span>
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <Link href="/wbs" className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Work Breakdown Structure</h3>
                  <p className="text-sm text-gray-500">Manage WBS information</p>
                </div>
                <span className="text-blue-600">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Data Import and Management Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <p className="text-gray-600 mb-4">Import, export, and manage your data.</p>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md bg-blue-50">
              <h3 className="font-medium mb-2">Import Data</h3>
              <p className="text-sm text-gray-600 mb-3">Upload data from Excel spreadsheets</p>
              <div className="flex flex-wrap gap-2">
                <Link href="/import/contracts">
                  <button className="px-3 py-1.5 text-sm text-white rounded-md"
                    style={{
                      background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
                    }}
                  >
                    Import Contracts
                  </button>
                </Link>
                <Link href="/import/orders">
                  <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md">
                    Import Orders
                  </button>
                </Link>
                <Link href="/import/schedule">
                  <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md">
                    Import Schedule
                  </button>
                </Link>
                <Link href="/import/rates">
                  <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md">
                    Import Rates
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium mb-2">Export Data</h3>
              <p className="text-sm text-gray-600 mb-3">Export your data to Excel for external use</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md">
                  Export Contracts
                </button>
                <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md">
                  Export Orders
                </button>
                <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md">
                  Export Schedule
                </button>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium mb-2">Financial Ledger</h3>
              <p className="text-sm text-gray-600 mb-3">Upload your financial ledger transactions</p>
              <Link href="/import/ledger">
                <button className="px-3 py-1.5 text-sm text-white rounded-md"
                  style={{
                    background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
                  }}
                >
                  Upload Ledger Data
                </button>
              </Link>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium mb-2">Generate Forecast</h3>
              <p className="text-sm text-gray-600 mb-3">Create cost forecasts based on current data</p>
              <Link href="/forecast">
                <button className="px-3 py-1.5 text-sm text-white rounded-md"
                  style={{
                    background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
                  }}
                >
                  Generate Forecast
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}