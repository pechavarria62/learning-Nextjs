import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import {fetchFilteredInvoices} from '@/app/lib/data';


const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  // TODO: Replace these mock values with real data fetching logic
  const totalPaidInvoices = 0;
  const totalPendingInvoices = 0;
  const numberOfInvoices = 0;
  const numberOfCustomers = 0;
  const filteredInvoices = await fetchFilteredInvoices('invoices.amount', 1);

  return (
    <>

      <Card title="Collected" value={filteredInvoices.length} type="collected" />
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-white p-2 shadow-md w-full h-48">
      <div className="flex p-4">
        {Icon ? <Icon style={{
          width: 24,
          height: 24,
          color: '#4f46e5',
          paddingLeft: '12px',
        }} /> : null}
        <h3 className="ml-2 text-sm font-lusitana">{title}</h3>
      </div>
      <p
        className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-lusitana'
          
      >
        {value}
      </p>
    </div>
  );
}
