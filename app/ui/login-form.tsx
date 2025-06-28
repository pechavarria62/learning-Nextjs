'use client';

import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './button';


export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false); // Add state for remember me
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData, rememberMe }), // Include rememberMe in the request
      });
      const data = await res.json();
      if (data.success) {
        router.push('/'); // Redirect on success
      } else {
        setError(data.error || 'Invalid email or password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center border shadow-lg rounded bg-black/50 w-90'>  
      <form onSubmit={handleSubmit} className=" p-6 w-full max-w-md flex items-center justify-center">
        <div className="  flex-1 flex-col items-center justify-center p-6 space-y-4">
          <h1 className="mb-3 text-2xl flex items-center justify-center content-center text-gray-300">Please log in to continue.</h1>
          <div className="">
            <div>
              <label
                className=" flex mb-3 mt-5 text-xs items-center justify-center content-center"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative flex items-center justify-center content-center">
                <input
                  className="peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-0 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                className="flex mb-3 mt-5 text-xs items-center justify-center content-center"
                htmlFor="password"
              >
                <br/>
                Password
              </label>
              <div className="relative flex items-center justify-center content-center">
                <input
                  className="peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-8 items-center justify-center content-center flex">
            <LoginButton />
          </div>

          {error && (
            <div className="flex items-center text-sm text-red-600 mt-4">
              <ExclamationCircleIcon 
                style={{
                  width:'10px',
                  height:'10px',
                  marginRight: '4px',

                }} 
              />
              {error}
            </div>
          )}

             {/* Remember Me checkbox */}
          <div className="flex items-center mt-4 space-x-px">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  return (
    <Button
      type="submit"
      style={{
        marginTop: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        height: '32px',
        padding: '14px',
        backgroundColor: '#3b82f6',
        color: 'white',
        fontSize: '14px',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Log in
    </Button>
  );
}
