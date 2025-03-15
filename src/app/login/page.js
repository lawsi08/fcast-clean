'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

// app/login/page.js
export default function Login() {
  return (
    <div className="card">
      <h1 className="heading">Welcome back</h1>
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
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Enter your password"
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              👁️
            </span>
          </div>
          <a href="#" className="link" style={{ fontSize: "0.875rem" }}>
            Forget password?
          </a>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input type="checkbox" style={{ marginRight: "0.5rem" }} />
            Remember me
          </label>
        </div>
        <button type="submit" className="button">
          Sign in
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don’t have an account?{" "}
        <a href="/signup" className="link">
          Sign up
        </a>
      </p>
    </div>
  );
}