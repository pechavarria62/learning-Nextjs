'use client';
import { useState } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';


export default function SideNav() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <div >
      <Link style={{ textDecoration: 'none',padding:'0px' }}
        href="/"
      >
        <div >
          <AcmeLogo />
        </div>
      </Link>
      <div >
      {isSignedIn ? (
          // Menu for signed-in users
          <>
            <NavLinks />
            <div onClick={() => setIsSignedIn(false)} className="cursor-pointer">
              <PowerIcon className="h-5 w-5 inline-block" /> Sign Out
            </div>
          </>
        ) : (
          // Menu for guests
          <>
            <Link href="/login" className="block py-2">
              Login
            </Link>
            <br/>
            <Link href="/register" className="block py-2">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
