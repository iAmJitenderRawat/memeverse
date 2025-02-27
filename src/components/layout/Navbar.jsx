import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      className={`${
        darkMode === "dark" ? "bg-white" : "bg-gray-800"
      } shadow-lg sticky top-0 z-10 backdrop-blur-[15px]`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              MemeVerse
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-white">
            <Link to="/explore" className="nav-link hover:text-yellow-500">
              Explore
            </Link>
            <Link to="/upload" className="nav-link hover:text-yellow-500">
              Upload
            </Link>
            <Link to="/leaderboard" className="nav-link hover:text-yellow-500">
              Leaderboard
            </Link>
            <Link to="/profile" className="nav-link hover:text-yellow-500">
              Profile
            </Link>
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;