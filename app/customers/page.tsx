import CustomersTable from '@/app/ui/customers/table';

const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    image_url: '/path/to/image.jpg',
    total_invoices: 5,
    total_pending: '$200',
    total_paid: '$800',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    image_url: '/path/to/image2.jpg',
    total_invoices: 3,
    total_pending: '$100',
    total_paid: '$300',
  },
];

export default function CustomersPage() {
  return (
    <div className="p-6">
      <CustomersTable customers={mockCustomers} />
    </div>
);
}
