import mysql, { RowDataPacket } from 'mysql2/promise';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost', // Default to localhost
  port: Number(process.env.MYSQL_PORT) || 3306, // Default My
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'your_db_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function fetchRevenue() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM revenue');

    // If you know the shape matches Revenue, you can cast:
    const revenue: Revenue[] = rows as Revenue[];

    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
       FROM invoices
       JOIN customers ON invoices.customer_id = customers.id
       ORDER BY invoices.date DESC
       LIMIT 5`
    );
    // Use LatestInvoiceRaw here for type safety
    const latestInvoices = (rows as LatestInvoiceRaw[]).map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const [[invoiceCountRow]] = await pool.query<any[]>('SELECT COUNT(*) as count FROM invoices');
    const [[customerCountRow]] = await pool.query<any[]>('SELECT COUNT(*) as count FROM customers');
    const [[statusRow]] = await pool.query<any[]>(`
      SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
      FROM invoices
    `);

    const numberOfInvoices = Number(invoiceCountRow.count ?? '0');
    const numberOfCustomers = Number(customerCountRow.count ?? '0');
    const totalPaidInvoices = formatCurrency(statusRow.paid ?? '0');
    const totalPendingInvoices = formatCurrency(statusRow.pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ? OR
        invoices.amount LIKE ? OR
        invoices.date LIKE ? OR
        invoices.status LIKE ?
      ORDER BY invoices.date DESC
      LIMIT ? OFFSET ?`,
      [
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        ITEMS_PER_PAGE,
        offset,
      ]
    );
    return rows as InvoicesTable[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const [[countRow]] = await pool.query<any[]>(
      `SELECT COUNT(*) as count
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ? OR
        invoices.amount LIKE ? OR
        invoices.date LIKE ? OR
        invoices.status LIKE ?`,
      [
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
      ]
    );
    const totalPages = Math.ceil(Number(countRow.count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ?`,
      [id]
    );
    const invoice = (rows as InvoiceForm[]).map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC`
    );
    return rows as CustomerField[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ?
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC`,
      [`%${query}%`, `%${query}%`]
    );

    const customers = (rows as CustomersTableType[]).map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return (rows as User[])[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
