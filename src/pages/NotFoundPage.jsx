import { motion } from 'framer-motion';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <h1 className="text-9xl font-bold text-primary-500">404</h1>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-8xl mb-8"
      >
        🤔
      </motion.div>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Meme Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Looks like this meme has ascended to another dimension. Let's find you something equally funny!
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Homepage
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;