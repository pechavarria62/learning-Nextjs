'use client';

import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import Link from 'next/link';

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
    <div className='flex items-center justify-center border shadow-black-md bg-white rounded w-90 h-48'>  
      <form onSubmit={handleSubmit} className="space-y-4 p-6  w-full">
        <div className=" w-full flex-1 flex-col  p-6">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Sign In.
          </h1>
          <div className=" w-full">
            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer w-full block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-0 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
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
                className="block text-sm font-medium text-gray-600 mb-1"
                htmlFor="password"
              >
                <br/>
                Password
              </label>
              <div className=" relative">
                <input
                  className=" w-full peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
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
              {/* Remember Me and Forgot Password */}
          <div className="flex items-center mt-4 justify-between w-full">
            <div className="flex items-center">
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
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="mt-8 items-center justify-center content-center flex w-full">
            <LoginButton />
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don&#39;t have an account?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
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
        width: '350px',
        height: '32px',
        padding: '14px',
        backgroundColor: '#3b82f6',
        color: 'white',
        fontSize: '14px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Log in
    </Button>
  );
}
