import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-white border-t border-gray-200 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
          <div className="mt-2 md:mt-0 flex items-center">
            <p className="text-sm text-gray-500 inline-flex items-center">
              Made with <Heart className="h-4 w-4 text-accent-500 mx-1" /> using React & TypeScript
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;