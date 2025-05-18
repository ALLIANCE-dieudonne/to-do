import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Navbar from './Navbar';
import Footer from './Footer';
import { AnimatePresence } from 'framer-motion';

const Layout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;