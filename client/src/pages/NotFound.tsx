import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-secondary-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-md w-full p-10 bg-white rounded-xl shadow-lg glassmorphism text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.h1 
          className="text-8xl font-bold text-primary-500"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.5, 
            type: "spring", 
            stiffness: 200 
          }}
        >
          404
        </motion.h1>
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Page not found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <motion.div 
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center px-6 py-3"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;