import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemes, searchMemes } from '../store/slices/memesSlice';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MemeCard from '../components/meme/MemeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';
import Masonry from "react-masonry-css";
import "./../components/meme/MasonryGrid.css";

const categories = ['Trending', 'New', 'Classic', 'Random'];

const ExplorerPage = () => {
  const dispatch = useDispatch();
  const { memes, loading, hasMore } = useSelector((state) => state.memes);
  const [activeCategory, setActiveCategory] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const observer = useRef();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const lastMemeElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(searchMemes({ query: debouncedSearch, page: 1 }));
      setPage(1);
    } else if (page === 1 && !debouncedSearch) {
      dispatch(fetchMemes({ category: activeCategory.toLowerCase(), page: 1 }));
      setPage(1);
    }else if (page > 1 && !debouncedSearch) {
      dispatch(fetchMemes({ category: activeCategory.toLowerCase(), page }));
    }
  }, [debouncedSearch, activeCategory, dispatch, page]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search memes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Category Filters */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap
              ${
                activeCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Memes Grid */}
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
        {memes?.length > 0
          ? memes.map((meme, index) => {
              return (
                <div key={meme.timestamp} ref={lastMemeElementRef}>
                  <MemeCard meme={meme} />
                </div>
              );
            })
          : null}
      </Masonry>

      {loading && <LoadingSpinner />}

      {!loading && memes?.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No memes found. Try a different search or category!
        </div>
      )}
    </div>
  );
};

export default ExplorerPage;
