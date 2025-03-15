'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

// app/signup/page.js
export default function Signup() {
  return (
    <div className="card">
      <h1 className="heading">Create an account</h1>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="button">
          Sign up
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account?{" "}
        <a href="/login" className="link">
          Sign in
        </a>
      </p>
    </div>
  );
}