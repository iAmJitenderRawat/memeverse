import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircleIcon,
  PencilSquareIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { setProfile } from '../store/slices/userSlice';
import MemeGrid from '../components/meme/MemeGrid';
import Button from '../components/ui/Button';
import ProfileEditModal from '../components/profile/ProfileEditModal';
import TabButton from '../components/ui/TabButton';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, likedMemes, uploadedMemes } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('uploads');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleProfileUpdate = (updatedProfile) => {
    dispatch(setProfile(updatedProfile));
    setIsEditModalOpen(false);
  };

  const tabs = [
    { id: 'uploads', label: 'Uploads', count: uploadedMemes.length },
    { id: 'liked', label: 'Liked Memes', count: likedMemes.length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-gray-400" />
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <PhotoIcon className="w-8 h-8 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile?.username || 'Anonymous User'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {profile?.bio || 'No bio yet'}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">
                  {uploadedMemes.length} uploads
                </span>
                <span className="text-sm text-gray-500">
                  {likedMemes.length} liked memes
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={() => setIsEditModalOpen(true)}
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Edit Profile
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </TabButton>
        ))}
      </div>

      {/* Meme Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MemeGrid
            memes={activeTab === 'uploads' ? uploadedMemes : likedMemes}
            emptyMessage={
              activeTab === 'uploads'
                ? "You haven't uploaded any memes yet"
                : "You haven't liked any memes yet"
            }
          />
        </motion.div>
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleProfileUpdate}
        profile={profile}
      />
    </div>
  );
};

export default ProfilePage;