import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, FireIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { fetchTrendingMemes } from '../store/slices/memesSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('memes');
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const {trending}=useSelector(state=>state.memes)

  const [topMemes, setTopMemes] = useState([
    {
      id: '1',
      title: "When the code finally works",
      url: "https://placekitten.com/400/300",
      creator: "CodeMaster",
      likes: 1500,
      comments: 230,
      rank: 1
    },
    {
      id: '2',
      title: "Meeting vs Reality",
      url: "https://placekitten.com/401/300",
      creator: "MemeLord",
      likes: 1200,
      comments: 180,
      rank: 2
    },
    {
      id: '3',
      title: "Weekend Mood",
      url: "https://placekitten.com/402/300",
      creator: "Weekender",
      likes: 1000,
      comments: 150,
      rank: 3
    }
  ]);

  const [topUsers, setTopUsers] = useState([
    {
      id: '1',
      name: "MemeLord",
      avatar: "https://placekitten.com/100/100",
      score: 5000,
      rank: 1,
      topMeme: "When the code finally works"
    },
    {
      id: '2',
      name: "CodeMaster",
      avatar: "https://placekitten.com/101/101",
      score: 4500,
      rank: 2,
      topMeme: "Debug Dance"
    },
    {
      id: '3',
      name: "Weekender",
      avatar: "https://placekitten.com/102/102",
      score: 4000,
      rank: 3,
      topMeme: "Weekend Mood"
    }
  ]);

  useEffect(() => {
    // Simulate API call
    dispatch(fetchTrendingMemes())
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🏆 MemeVerse Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Top trending memes and creators of{" "}
            {timeRange === "all" ? "all time" : `this ${timeRange}`}
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          {["day", "week", "month", "all"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("memes")}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "memes"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            <FireIcon className="h-5 w-5" />
            <span>Top Memes</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "users"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            <ChartBarIcon className="h-5 w-5" />
            <span>Top Creators</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {activeTab === "memes" ? (
              // Top Memes
              <div className="space-y-6">
                {trending.map((meme,i) => (
                  <motion.div
                    key={meme.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="flex items-center p-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-full text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        #{i+1}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {meme.name}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                        <span>❤️ {meme.likes}</span>
                        <span>💬 {meme.comments}</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={meme.url}
                        alt={meme.title}
                        className="object-fill w-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Top Users
              <div className="space-y-4">
                {topUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-full text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      #{user.rank}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          //   className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Top meme: {user.topMeme}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrophyIcon className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {user.score} pts
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
