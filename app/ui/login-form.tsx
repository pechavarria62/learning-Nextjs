'use client';


import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './button';

const mockUsers = [
  { email: 'user@example.com', password: 'password123' },
  { email: 'danny@ramp.com', password: 'securepass' },
];

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      router.push('/'); // ✅ Redirect to homepage
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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

        <div className="mt-10">
          <LoginButton />
        </div>

        {error && (
          <div className="flex items-center text-sm text-red-600 mt-4">
            <ExclamationCircleIcon className="h-5 w-5 mr-1" />
            {error}
          </div>
        )}

        <div className="flex h-8 items-end space-x-1 mt-10">Remember me</div>
      </div>
    </form>
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
