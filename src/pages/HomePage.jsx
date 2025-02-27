import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { fetchTrendingMemes } from '../store/slices/memesSlice';
import MemeGrid from '../components/meme/MemeGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { trending, loading, error } = useSelector((state) => state.memes);

  useEffect(() => {
    dispatch(fetchTrendingMemes());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
        >
          Welcome to MemeVerse
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-400"
        >
          Your daily dose of laughter and entertainment
        </motion.p>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link to="/explore" className="text-gray-600 dark:text-gray-400">
            Explore Memes
          </Link>
          <Link to="/upload" className="text-gray-600 dark:text-gray-400">
            Upload Meme
          </Link>
        </motion.div>
      </section>

      {/* Trending Section */}
      <section className="space-y-6 w-1/2 m-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trending Memes
          </h2>
          <Link
            to="/explore"
            className="text-indigo-600 hover:text-primary-600 font-medium"
          >
            View All →
          </Link>
        </div>
        <MemeGrid
          memes={trending}
          emptyMessage="No trending memes found. Check back later!"
        />
      </section>
    </motion.div>
  );
};

export default HomePage;