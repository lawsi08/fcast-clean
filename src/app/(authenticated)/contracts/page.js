'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data?.user) {
        return router.push('/login');
      }
      
      setUser(data.user);
      fetchContracts();
    };
    
    checkUser();
  }, [router]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('contract_info')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setContracts(data || []);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      alert('Error fetching contracts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: "#F5F2E3"}}>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{
          background: "linear-gradient(to bottom, #f1daa0 0%, #C5B358 50%, #9c8a3e 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 0px 2px rgba(197, 179, 88, 0.3)"
        }}>Contracts</h1>
        
        <div className="flex gap-2">
          <Link href="/contracts/new">
            <button className="px-4 py-2 rounded-md text-white font-medium"
              style={{
                background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
                boxShadow: "0 2px 4px rgba(197, 179, 88, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
              }}
            >
              Add Contract
            </button>
          </Link>
          
          <Link href="/contracts/import">
            <button className="px-4 py-2 rounded-md font-medium border border-gray-300 bg-white">
              Import Contracts
            </button>
          </Link>
        </div>
      </div>
      
      {/* Contracts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading contracts...</div>
        ) : contracts.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">No contracts found. Add your first contract or import from Excel.</p>
            <Link href="/contracts/new">
              <button className="px-4 py-2 rounded-md text-white font-medium"
                style={{
                  background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
                  boxShadow: "0 2px 4px rgba(197, 179, 88, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                }}
              >
                Add Contract
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{contract.contract_description || 'Unnamed Contract'}</div>
                      <div className="text-sm text-gray-500">{contract.contract_number || 'No contract number'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{contract.vendor_name}</div>
                      <div className="text-sm text-gray-500">{contract.vendor_id || 'No vendor ID'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(contract.start_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(contract.end_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contract.contract_value 
                        ? `${contract.currency || 'GBP'} ${parseFloat(contract.contract_value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          contract.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          contract.status === 'Expired' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {contract.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Link href={`/contracts/${contract.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                        View
                      </Link>
                      <Link href={`/contracts/${contract.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}