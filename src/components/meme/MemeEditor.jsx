import { SparklesIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const MemeEditor = ({ caption, setCaption, onGenerateCaption, isGenerating }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="caption"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Caption
        </label>
        <div className="flex space-x-2">
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter your meme caption..."
            className="flex-1 min-h-[100px] p-3 border rounded-lg bg-white dark:bg-gray-800 
                     dark:border-gray-700 focus:ring-2 focus:ring-primary-500 
                     focus:border-transparent resize-none"
          />
        </div>
      </div>

      <Button
        onClick={onGenerateCaption}
        variant="secondary"
        disabled={isGenerating}
        className="w-full"
      >
        <SparklesIcon className="h-5 w-5 mr-2" />
        {isGenerating ? 'Generating...' : 'Generate AI Caption'}
      </Button>
    </div>
  );
};

export default MemeEditor;