import SideNav from './ui/dashboard/sidenav';
import './ui/global.css';
import './global.css';


export default function Page() {
  return (
    <div className='bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 min-h-screen'>
      <SideNav />
    </div>
  );
}
