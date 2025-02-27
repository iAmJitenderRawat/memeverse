import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';
import UploadPage from './pages/UploadPage';
import MemeDetailsPage from './pages/MemeDetailsPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const theme = useSelector((state) => state?.user?.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorerPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/meme/:id" element={<MemeDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
  );
}

export default App;