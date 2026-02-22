import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export function SpotifyWidget() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate progress bar
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(p => {
          if (p >= 100) return 0;
          return p + 0.5; // slow progress
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
      className="fixed bottom-8 right-8 w-80 glass-panel p-4 flex flex-col gap-4 text-gray-800 z-50"
    >
      <div className="flex items-center gap-4">
        {/* Album Cover Mockup */}
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gradient-to-br from-purple-400 to-indigo-500 shadow-md flex-shrink-0 animate-pulse relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <span className="text-white font-bold text-xs">HINDIA</span>
            </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <h4 className="font-semibold text-sm truncate">Everything U Are</h4>
          <p className="text-xs text-gray-600 truncate">Hindia</p>
        </div>
        
        <button className="text-gray-500 hover:text-gray-800 transition-colors">
          <Volume2 size={18} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
        <span>{Math.floor((progress / 100) * 240 / 60)}:{(Math.floor((progress / 100) * 240 % 60)).toString().padStart(2, '0')}</span>
        <div className="flex-1 h-1.5 bg-gray-200/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>4:00</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          <SkipBack size={20} fill="currentColor" />
        </button>
        <button 
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 shadow-md hover:scale-105 transition-all"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          <SkipForward size={20} fill="currentColor" />
        </button>
      </div>
    </motion.div>
  );
}
