import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Masonry from 'react-masonry-css';
import './MasonryGrid.css';

const MemeCard = ({ meme }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(meme.likes || 0);

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    // TODO: Implement API call to update likes
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-fit meme-card"
    >
      <Link to={`/meme/${meme.id}`}>
        <div>
          <img
            src={meme.url}
            alt={meme.title}
            className="w-full object-cover h-auto align-middle inline-block"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {meme.title}
        </h3>

        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-red-500 transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
            <span>{likes}</span>
          </button>

          <Link
            to={`/meme/${meme.id}`}
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span>{meme.comments || 0}</span>
          </Link>

          <button
            onClick={() => {
              navigator.share({
                title: meme.title,
                url: window.location.origin + `/meme/${meme.id}`,
              }).catch(console.error);
            }}
            className="hover:text-blue-500 transition-colors"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;