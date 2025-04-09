import NavLinks from './ui/dashboard/nav-links';
import Link from 'next/link';

export default function Page() {
  return (
    
    <main className="flex min-h-screen flex-col p-6">
      <div className=" w-48 bg-white border border-black p-4">
      <div style={{
        color: 'blue',
        fontWeight: 'bold',
        padding: '15px',
        width:'15px',
        height:'15px',
        borderRadius: '15px',
        backgroundColor: 'lightblue',
        display: 'flex',
        }}>
        <NavLinks />
      </div>
        <Link href="/" className="py-2 text-gray-800 hover:text-blue-500">
          Home
        </Link>
        <br/>
        <Link href="/about" className="py-2 text-gray-800 hover:text-blue-500">
          About
        </Link>
        <br/>
        <Link href="/services" className="py-2 text-gray-800 hover:text-blue-500">
          Services
        </Link>
        <br/>
        <Link href="/contact" className="py-2 text-gray-800 hover:text-blue-500">
          Contact
        </Link>
        <br/>
        <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              Login
            </span>
          </Link>
      </div>
      
     
    </main>
  );
}
