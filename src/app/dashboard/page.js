'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

// app/dashboard/page.js
export default function Dashboard() {
  return (
    <div className="card" style={{ maxWidth: "800px" }}>
      <h1 className="heading">Dashboard</h1>
      <p style={{ textAlign: "center", color: "var(--secondary-text)" }}>
        Welcome to FCAST! Manage your cost tracking and forecasting below.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ color: "var(--primary)", marginBottom: "1rem" }}>
          Contract Info
        </h2>
        {/* Placeholder for table */}
        <p>Table for Contract Info will go here.</p>
      </div>
      {/* Add sections for other tables */}
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ color: "var(--primary)", marginBottom: "1rem" }}>
          Order Info
        </h2>
        <p>Table for Order Info will go here.</p>
      </div>
      {/* Add a logout button */}
      <button
        className="button"
        style={{ marginTop: "2rem", backgroundColor: "#6b7280" }}
      >
        Logout
      </button>
    </div>
  );
}