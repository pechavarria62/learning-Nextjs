// import './ui/global.css';
import './ui/css/admin.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='flex min-h-screen items-center justify-center bg-black'>{children}</body>
    </html>
  );
}
