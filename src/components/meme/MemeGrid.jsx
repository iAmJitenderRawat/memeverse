import { motion } from "framer-motion";
import { Link } from "react-router";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Masonry from "react-masonry-css";
import "./../../components/meme/MasonryGrid.css";

const MemeGrid = ({ memes, emptyMessage }) => {
  if (!memes.length) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1,
  };
  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {memes.map((meme) => (
          <motion.div
            key={meme.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md mb-10"
          >
            <Link to={`/meme/${meme.id}`}>
              {/* <div className="aspect-w-16 aspect-h-9"> */}
                <img
                  src={meme.url}
                  alt={meme.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
              {/* </div> */}

              {/* Overlay with stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium truncate">
                    {meme.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-white">
                      <HeartIcon className="h-5 w-5 mr-1" />
                      {meme.likes}
                    </div>
                    <div className="flex items-center text-white">
                      <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                      {meme.comments}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </Masonry>
    </>
  );
};

export default MemeGrid;
