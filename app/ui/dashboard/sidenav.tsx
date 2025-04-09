import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
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
        <NavLinks />
        <form>
          <button >
            <PowerIcon />
            <div>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
