import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LYRICS = [
  "Cerita kita",
  "tak jauh berbeda",
  "Got beat down by the world",
  "Sometimes I wanna fold",
  "Namun suratmu kan kuceritakan",
  "Bahwa aku pernah dicintai",
  "Sekurang-kurangnya"
];

export function LyricsDisplay() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // In Scene 2 (durasi 4.5s), sinkronisasi lirik agar scroll pelan mengikuti beat
    const t0 = setTimeout(() => setActiveIndex(0), 100);
    const t1 = setTimeout(() => setActiveIndex(1), 1200);   // "tak jauh berbeda"
    const t2 = setTimeout(() => setActiveIndex(2), 4200);   // bersiap ke scene 3
    
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start pt-[35%] overflow-visible px-4">
      <motion.div 
        className="w-full relative space-y-12"
        animate={{ y: `-${activeIndex * 96}px` }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        {LYRICS.map((line, i) => {
          const isActive = i === activeIndex;
          const isPassed = i < activeIndex;
          
          return (
            <motion.p
              key={i}
              className={`text-[54px] lg:text-[68px] font-black tracking-tighter origin-left filter will-change-transform leading-none ${isActive ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'text-white/30'}`}
              animate={{
                scale: isActive ? 1.05 : (isPassed ? 0.95 : 0.95),
                filter: isActive ? 'blur(0px)' : (isPassed ? 'blur(6px)' : 'blur(2px)'),
                opacity: isActive ? 1 : 0.4
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {line}
            </motion.p>
          );
        })}
      </motion.div>
    </div>
  );
}
