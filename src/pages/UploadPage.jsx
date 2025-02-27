import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { uploadMeme } from '../store/slices/memesSlice';
import MemeEditor from '../components/meme/MemeEditor';
import Button from '../components/ui/Button';

const UploadPage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (PNG, JPG, GIF)');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please drop an image file (PNG, JPG, GIF)');
    }
  };

  const generateAICaption = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI caption generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      const captions = [
        "When you finally fix that bug after 4 hours",
        "Me explaining my code to the rubber duck",
        "POV: It's Monday morning standup",
        "That moment when your code works but you don't know why"
      ];
      setCaption(captions[Math.floor(Math.random() * captions.length)]);
    } catch (error) {
      setError('Failed to generate caption. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('caption', caption);

      await dispatch(uploadMeme(formData)).unwrap();
      
      // Reset form after successful upload
      setSelectedFile(null);
      setPreviewUrl('');
      setCaption('');
      setError('');
    } catch (error) {
      setError('Failed to upload meme. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create Your Meme
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Upload an image and add your creative caption
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center
          ${previewUrl ? 'border-primary-500' : 'border-gray-300 dark:border-gray-700'}
          hover:border-primary-500 transition-colors cursor-pointer`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-96 mx-auto rounded-lg"
            />
            <p className="text-sm text-gray-500">
              Click or drag to replace the image
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <PhotoIcon className="mx-auto h-16 w-16 text-gray-400" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Drag and drop your image here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports PNG, JPG, and GIF
              </p>
            </div>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Caption Editor */}
      {previewUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <MemeEditor
            caption={caption}
            setCaption={setCaption}
            onGenerateCaption={generateAICaption}
            isGenerating={isGenerating}
          />

          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={!selectedFile}
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            Upload Meme
          </Button>
        </motion.div>
      )}

      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}
    </div>
  );
};

export default UploadPage;