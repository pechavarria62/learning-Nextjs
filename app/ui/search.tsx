'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon
        style={{
          position: 'absolute',
          left: '225px',
          top: '15%',
          transform: 'translateY(-50%)',
          height: '20px',
          width: '20px',
          color: '#6b7280',
        }}
      />
    </div>
    
  );
}
