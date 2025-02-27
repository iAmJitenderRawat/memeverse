import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { getMemeById, toggleLikeMeme } from "../store/slices/memesSlice";
import CommentSection from '../components/comments/CommentSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const MemeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentMeme, loading, error } = useSelector((state) => state.memes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    dispatch(getMemeById(id));
  }, [id, dispatch]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    dispatch(toggleLikeMeme({isLiked}));
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: currentMeme.title,
        text: 'Check out this awesome meme!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!currentMeme) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="secondary"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        {/* Meme Image */}
        <div className="relative">
          <img
            src={currentMeme.url}
            alt={currentMeme.title}
            className="w-full object-cover max-h-[600px]"
          />
        </div>

        {/* Meme Info */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentMeme.title}
            </h1>
            <span className="text-sm text-gray-500">
              {new Date(currentMeme.timestamp).toLocaleDateString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              onClick={handleLike}
              className={`${isLiked ? 'text-red-500' : ''}`}
            >
              {isLiked ? (
                <HeartIconSolid className="h-5 w-5 mr-2" />
              ) : (
                <HeartIcon className="h-5 w-5 mr-2" />
              )}
              {currentMeme.likes} Likes
            </Button>

            <Button variant="secondary" onClick={handleShare}>
              <ShareIcon className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 py-4 border-b dark:border-gray-700">
            <img
              src={currentMeme.creator?.avatar || 'https://via.placeholder.com/40'}
              alt="Creator"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {currentMeme.creator?.username || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500">
                {currentMeme.creator?.bio || 'Meme enthusiast'}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
              Comments
            </h2>
            <CommentSection memeId={id} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemeDetailsPage;