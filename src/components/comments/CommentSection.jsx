import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Button from '../ui/Button';

const CommentSection = ({ memeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load comments from localStorage
    const loadComments = () => {
      const savedComments = localStorage.getItem(`meme-${memeId}-comments`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
      setLoading(false);
    };

    loadComments();
  }, [memeId]);

  const saveComments = (updatedComments) => {
    localStorage.setItem(`meme-${memeId}-comments`, JSON.stringify(updatedComments));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      user: {
        name: 'Anonymous User',
        avatar: 'https://via.placeholder.com/40',
      },
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    saveComments(updatedComments);
    setNewComment('');
  };

  const handleLike = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
    saveComments(updatedComments);
  };

  if (loading) return <div className="animate-pulse">Loading comments...</div>;

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 
                       dark:border-gray-700 focus:ring-2 focus:ring-primary-500 
                       focus:border-transparent resize-none"
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <Button
                type="submit"
                disabled={!newComment.trim()}
              >
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex space-x-4"
          >
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {comment.user.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="text-gray-500 hover:text-primary-500 transition-colors"
                  >
                    ❤️ {comment.likes}
                  </button>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {comment.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {comments.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default CommentSection;