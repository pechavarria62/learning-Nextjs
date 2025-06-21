import CustomersTable from '@/app/ui/customers/table';
import { customers as rawCustomers } from '@/app/lib/placeholder-data';

const customers = rawCustomers.map(customer => ({
  ...customer,
  total_invoices: 0, // Default value
  total_pending: '$0', // Default value
  total_paid: '$0', // Default value
}));

// const mockCustomers = [
//   {
//     id: '1',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     image_url: '/customers/amy-burns.png',
//     total_invoices: 5,
//     total_pending: '$200',
//     total_paid: '$800',
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     image_url: '/customers/balazs-orban.png',
//     total_invoices: 3,
//     total_pending: '$100',
//     total_paid: '$300',
//   },
// ];

export default function CustomersPage() {
  return (
    <div className="pt-6 w-10 h-10 mt-100">
      <CustomersTable customers={customers} />
      
    </div>
);
}
