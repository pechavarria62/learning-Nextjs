'use client';
import { useState } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';


export default function SideNav() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-[#1c212c] flex flex-col items-center pt-5 pb-2 space-y-7 z-50">
      {/* Menu Items */}
      <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
      <Link  
        href="/"
      >
        <div >
          <AcmeLogo />
        </div>
      </Link>
      <div className="w-60 mt-6 shadow-md flex flex-col items-start p-4 bg-transparent">
          {isSignedIn ? (
          // Menu for signed-in users
          <>
            <NavLinks />
            <div
              onClick={() => setIsSignedIn(false)}
              className="cursor-pointer flex items-center mt-5 text-gray-400 hover:text-red-500"
            >
              <PowerIcon
                style={{
                  width: 34,
                  height: 34,
                  color: '#ef4444',
                  paddingLeft: '12px', 

                }}
              />
              Sign Out
            </div>
          </>
        ) : (
          // Menu for guests
          <>
            <Link href="/login" className="flex items-center gap-2 py-2">
              <ArrowRightOnRectangleIcon style={{ width: 20, height: 20, color: '#60a5fa' }} />
              Login
            </Link>
            <Link href="/register" className="flex items-center gap-2 py-2">
              <UserPlusIcon style={{ width: 20, height: 20, color: '#34d399' }} />
              Register
            </Link>
          </>
        )}
      </div>
    </div>
      </div>
  );
}
