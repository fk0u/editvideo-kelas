import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronDown, Music, Image as ImageIcon, Search, LayoutGrid, MapPin, CheckCircle2, Folder, ArrowUpRight, ChevronLeft, ChevronRight, Mic2, MonitorSpeaker, ListMusic, Monitor } from 'lucide-react';

import { LyricsDisplay } from './components/LyricsDisplay';

// --- DUMMY ASSETS ---
// (Modifikasi: Mengubah link unsplash menjadi picsum.photos sesuai instruksi user "Dilarang Ambil Asset dari Unsplash")
const ASSETS = {
  mpls: "https://lh3.googleusercontent.com/rd-d/ALs6j_Hd2Dnaac-Le0cm_fNR6FMhkgvOcFn5eNVWrVrrI2tKnCi150kKD-quAtVUk0TdhDNgewKC1yxwhwqPqPpVyF0ZnZDlqe12SrenOCQeE_SXK-HPGcZIfwhySl2XSFMLqxbPSB3FomuOLxGmegT0gaO-ZYZ4sf_bb-I2tK6T3carqaD5i47pIE28CvVSHGzguwLohxIMEgeWMFZ4IARh6n7UK51vBfqSNbYODRlW34DtumJP_9pAnMe0BVQ7ebZz1z6wt4fRDuEszMsGOdha0ShQsWq2KyUopwZlK-W0D8Tu2xFCBg3M2_1vJITTxvAmIiFxJjKYFpNF3bBeVFYYF3sTA0Wx9xKPTYs9ylBmjWLiDJtAKzoMeerwQKLdwFxiWBrWPG7efSSDMOVHNLljKXtjWMapyemZCKgwCq9LrSok0HJrVsCqxiHNhmcYN7Tnc2A0zdodVXxRWslbA2DB63GlCq66ZzuVN8AExDMuEs5gRnYvFznZpFnj_YRAA35i8PWxq_yvI5XJ9rEHGjoXMS_hObenjgPHokQ1tX2H4orF8ThLrRrTQArjb61JgbqdEmEmdMIaXypTmQin6WW1PTwGh50pafvvu3DytsvLNb2OqgKgRPbbHKZkm0lJFk9329MfLxB5FqbIPVyy6NqZ8cF-CqCBedEEiWAt4R4OZI8jclqLs8dOfXNcOSRKKk7LJWftTVdcnSREQjGArrEYcqWo5Wyo4uEgwWnBR6ZQODNJfhIbyz_JsRShtKyLWZyOmL0_tbOk3I_Mg7mKSQT9vSSRQlLJTTgOBD-iiCh0J9sow8m_yWDnxbDADcoVZnOr6v_jb__yR7ENw9eNwfY842UGX5VKRVGipd8x5UI8Pac8jXq8ryHzmaJi3GIWCBGebd5c565nENpUYUEhPplfC3TmQzdVRfdJNM4Nd12HBA9GZwEcsMtOwVeYe3HIfBRuCbCjssxYLoOEevq2DLuFMXLweuKqHJ4IbLtXNWhvgqjA0ucc1Hg64DMalezq7LZH16vt88VsPX8ANIozZF_Oka1OuV24aHXq2rMpqL3dvaxgBHOmn47-LmV1ezZi4ox5op9s1k4TilCxXXkYTP0Oa9aIxN9VO-M_luD10Ul93nOTLaNBXFrSshy8IBJWqZBjrYBz1lEG9qaJi7Z19_pUEQ=w800-h800?auditContext=forDisplay", 
  studio: "https://lh3.gokelactogleusercontent.com/rd-d/ALs6j_FHfLbhrPgvN9RCkU-vnqO8_DgqNHweSzp7q5vBiKDrfRziV42qtxjgaEBG3LMx0FtnWe85PsQnqgp8VjeM6HVrtGNPfDdlMjjlAn12FE81WpDAygu7u4Jdl1cUT9C0DilSGxpynKTdVsc8dhmzMDY3kCbZG2uoTBhP_6z0DDuPu9_sVXAGKo0EPILjCWguEHSyF2uy_pfveTwW3aa_7yoD3YmMxHl9iqV_T7Q9nZM2gIESlaTHBMy56aAn2OhchbKKHev3QBj4hoKgRmnYKLS0QrC2gJlGRsa0QNvEsumjPDcij_6WStTZnaNyqIEG2lSxtO6VWCtMLK9n40GhZOxRHKkJtAwbnGaXVTtNXyzjdSdCO9EHf4pj1m7J3UXl-mDQO6RCdQufwULk3fulb_wuMYfR7J1YKJyAJgXMi03o1yHxhDB38nFFyZ6hrb8EDQRoSTohdB5YxIy5Q5TSmxQP9dVtXndIBDODuz7MVQWmO_v_zyvUfzKNHkEmGkPn0eMxMwuZHxPBXiAqfOYBTM-_tRuk2_cYrFHHJsIiDEZnkVWiHqze78cNTNTFKesOW2JBI1RR2OM1V9ocIxynsQ1Bgdgs8NrVdfKSspAAxTRcURLFy3f9cE4wjQPvOdCRIpTtcZXlCOlojjMUC17nDM1wnnyI5ATQ8IddwVE2-zpV11TFS0J0e0x1JaW4jTAlk9P9kQ3j23HFyKpRNV3cx1qt6wWwIiEUaeKOMxYW44eblCpr0QZ0t83aEKyRNNNHVL-xpqO3kqXtKheKF7_ltxfyYZtl2qG_xY2ZprEBalFbVUGeWIxS0q58WAFKf0_tLsCp90CNv8cF42o3UUbO26AIphheZEfA7zpgqQMTxPCCyRVpEjVP-d1_jcuxYstbiq9GVDl0DqA8rpI6DoDENkFDl3eADyJxbOMHUicqx9MJ1duAGeTq5RpekyhggyMv1dT50DUwZNLFpjFNyn9jsTu9I-JdPZi41-mMwtXdUJXOni2usH905B6IMGVSkMbuX2j5B6Oc2GSUMHUyDoutLn45Uvbxiau5qMM27PRyLuNYuNjDEbfZ5F-zn-7UjV73B1fd0xOg7MBqUV0cyO9GimJSql1EJm-1UkXlFdxxmspXDo0hMt9TL2kOYphK8PbaQPrl4-OomZEp8empiF6-dw=w800-h800?auditContext=forDisplay",
  igVideo: "https://www.w3schools.com/html/mov_bbb.mp4", 
  albumArt: "https://resources.tidal.com/images/2f820858/3fcd/4b0c/9e88/fe9efde8fa3d/160x160.jpg",
  schoolBg: "https://picsum.photos/seed/schoolBg/1920/1080", 
  audioTrack: "https://s3.ustatik.com/audio.com.audio/transcoding/59/80/1857828603378059-1857828603398220-1857828617116437.mp3?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=F0E8U41NBMMW3Y027UTJ%2F20260222%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260222T123111Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=92b5ccd4723deae83801858f367b0e6b98acd72453c5a887605da11f52511d4a",
  gallery: [
    "https://lh3.googleusercontent.com/rd-d/ALs6j_Hd2Dnaac-Le0cm_fNR6FMhkgvOcFn5eNVWrVrrI2tKnCi150kKD-quAtVUk0TdhDNgewKC1yxwhwqPqPpVyF0ZnZDlqe12SrenOCQeE_SXK-HPGcZIfwhySl2XSFMLqxbPSB3FomuOLxGmegT0gaO-ZYZ4sf_bb-I2tK6T3carqaD5i47pIE28CvVSHGzguwLohxIMEgeWMFZ4IARh6n7UK51vBfqSNbYODRlW34DtumJP_9pAnMe0BVQ7ebZz1z6wt4fRDuEszMsGOdha0ShQsWq2KyUopwZlK-W0D8Tu2xFCBg3M2_1vJITTxvAmIiFxJjKYFpNF3bBeVFYYF3sTA0Wx9xKPTYs9ylBmjWLiDJtAKzoMeerwQKLdwFxiWBrWPG7efSSDMOVHNLljKXtjWMapyemZCKgwCq9LrSok0HJrVsCqxiHNhmcYN7Tnc2A0zdodVXxRWslbA2DB63GlCq66ZzuVN8AExDMuEs5gRnYvFznZpFnj_YRAA35i8PWxq_yvI5XJ9rEHGjoXMS_hObenjgPHokQ1tX2H4orF8ThLrRrTQArjb61JgbqdEmEmdMIaXypTmQin6WW1PTwGh50pafvvu3DytsvLNb2OqgKgRPbbHKZkm0lJFk9329MfLxB5FqbIPVyy6NqZ8cF-CqCBedEEiWAt4R4OZI8jclqLs8dOfXNcOSRKKk7LJWftTVdcnSREQjGArrEYcqWo5Wyo4uEgwWnBR6ZQODNJfhIbyz_JsRShtKyLWZyOmL0_tbOk3I_Mg7mKSQT9vSSRQlLJTTgOBD-iiCh0J9sow8m_yWDnxbDADcoVZnOr6v_jb__yR7ENw9eNwfY842UGX5VKRVGipd8x5UI8Pac8jXq8ryHzmaJi3GIWCBGebd5c565nENpUYUEhPplfC3TmQzdVRfdJNM4Nd12HBA9GZwEcsMtOwVeYe3HIfBRuCbCjssxYLoOEevq2DLuFMXLweuKqHJ4IbLtXNWhvgqjA0ucc1Hg64DMalezq7LZH16vt88VsPX8ANIozZF_Oka1OuV24aHXq2rMpqL3dvaxgBHOmn47-LmV1ezZi4ox5op9s1k4TilCxXXkYTP0Oa9aIxN9VO-M_luD10Ul93nOTLaNBXFrSshy8IBJWqZBjrYBz1lEG9qaJi7Z19_pUEQ=w800-h800?auditContext=forDisplay",
    "https://lh3.googleusercontent.com/rd-d/ALs6j_FHfLbhrPgvN9RCkU-vnqO8_DgqNHweSzp7q5vBiKDrfRziV42qtxjgaEBG3LMx0FtnWe85PsQnqgp8VjeM6HVrtGNPfDdlMjjlAn12FE81WpDAygu7u4Jdl1cUT9C0DilSGxpynKTdVsc8dhmzMDY3kCbZG2uoTBhP_6z0DDuPu9_sVXAGKo0EPILjCWguEHSyF2uy_pfveTwW3aa_7yoD3YmMxHl9iqV_T7Q9nZM2gIESlaTHBMy56aAn2OhchbKKHev3QBj4hoKgRmnYKLS0QrC2gJlGRsa0QNvEsumjPDcij_6WStTZnaNyqIEG2lSxtO6VWCtMLK9n40GhZOxRHKkJtAwbnGaXVTtNXyzjdSdCO9EHf4pj1m7J3UXl-mDQO6RCdQufwULk3fulb_wuMYfR7J1YKJyAJgXMi03o1yHxhDB38nFFyZ6hrb8EDQRoSTohdB5YxIy5Q5TSmxQP9dVtXndIBDODuz7MVQWmO_v_zyvUfzKNHkEmGkPn0eMxMwuZHxPBXiAqfOYBTM-_tRuk2_cYrFHHJsIiDEZnkVWiHqze78cNTNTFKesOW2JBI1RR2OM1V9ocIxynsQ1Bgdgs8NrVdfKSspAAxTRcURLFy3f9cE4wjQPvOdCRIpTtcZXlCOlojjMUC17nDM1wnnyI5ATQ8IddwVE2-zpV11TFS0J0e0x1JaW4jTAlk9P9kQ3j23HFyKpRNV3cx1qt6wWwIiEUaeKOMxYW44eblCpr0QZ0t83aEKyRNNNHVL-xpqO3kqXtKheKF7_ltxfyYZtl2qG_xY2ZprEBalFbVUGeWIxS0q58WAFKf0_tLsCp90CNv8cF42o3UUbO26AIphheZEfA7zpgqQMTxPCCyRVpEjVP-d1_jcuxYstbiq9GVDl0DqA8rpI6DoDENkFDl3eADyJxbOMHUicqx9MJ1duAGeTq5RpekyhggyMv1dT50DUwZNLFpjFNyn9jsTu9I-JdPZi41-mMwtXdUJXOni2usH905B6IMGVSkMbuX2j5B6Oc2GSUMHUyDoutLn45Uvbxiau5qMM27PRyLuNYuNjDEbfZ5F-zn-7UjV73B1fd0xOg7MBqUV0cyO9GimJSql1EJm-1UkXlFdxxmspXDo0hMt9TL2kOYphK8PbaQPrl4-OomZEp8empiF6-dw=w800-h800?auditContext=forDisplay",
    "/1770374436851.jpg",
    "/1770374400238.jpg",
    "/IMG_0027.jpg",
    "/IMG-20240419-WA0004.jpg",
    "/WhatsApp Image 2026-02-06 at 10.32.40 (2).jpeg",
    "/1770373180444.jpg",
    "/1770374054328.jpg",
    "/WhatsApp Image 2026-02-06 at 10.32.39.jpeg",
  ]
};

// --- SCENE 1: [0:00 - 0:03] "Cerita kita" (Intro) ---
const Scene1Intro = () => (
  <motion.div 
    className="w-full h-full relative flex items-center justify-center bg-zinc-900 overflow-hidden"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)" }} transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 p-2 opacity-30">
      {[...ASSETS.gallery, ASSETS.mpls, ASSETS.studio].map((img, i) => (
        <motion.div key={i} className="w-full h-full bg-zinc-800 overflow-hidden rounded-xl"
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }}
        >
          <img src={img} alt="grid" className="w-full h-full object-cover grayscale" />
        </motion.div>
      ))}
    </div>

    <motion.div className="z-20 w-full h-full flex flex-col justify-center items-center mix-blend-difference"
      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}
    >
      <motion.div animate={{ filter: ["invert(0%)", "invert(100%)", "invert(0%)"] }} transition={{ delay: 1, duration: 1.5 }} className="text-center relative w-full h-full flex items-center justify-center">
        <h1 className="text-[15vw] font-black leading-none tracking-tighter text-white drop-shadow-2xl absolute top-[20%] left-[10%]">CERITA</h1>
        <h1 className="text-[15vw] font-black leading-none tracking-tighter text-yellow-300 drop-shadow-2xl absolute bottom-[20%] right-[10%]">KITA</h1>
      </motion.div>
    </motion.div>
  </motion.div>
);

// --- SCENE 2: [0:03 - 0:07] "Tak jauh berbeda" (Apple Music UI 3D Realistic) ---
const Scene2MusicPlayer = () => (
  <motion.div className="w-full h-full bg-[#050505] flex items-center justify-center relative overflow-hidden" style={{ perspective: 1500 }}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  >
    {/* Background ambient light */}
    <div className="absolute inset-0 bg-red-900/20 blur-[150px] z-0 transform-gpu" />

    {/* Phone Device Frame */}
    <motion.div className="w-[430px] h-[932px] bg-black rounded-[55px] border-[8px] border-zinc-800 shadow-[0_0_100px_rgba(250,36,60,0.3),inset_0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden z-10 flex flex-col will-change-transform" style={{ transformStyle: 'preserve-3d' }}
      initial={{ rotateX: 20, rotateY: -15, scale: 0.8, y: 150, z: -200 }} 
      animate={{ rotateX: 0, rotateY: 0, scale: 0.95, y: 0, z: 0 }} 
      transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
    >
      {/* Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50 flex items-center justify-between px-3">
        <div className="w-3 h-3 rounded-full bg-zinc-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-60 shadow-[0_0_5px_#22c55e]" />
      </div>

      <div className="w-full h-full bg-[#fa243c] flex flex-col relative overflow-hidden transform-gpu">
        {/* Animated blurred background */}
        <motion.div className="absolute inset-0 z-0 opacity-60 blur-[80px] mix-blend-screen transform-gpu"
          animate={{ 
            background: [
              'radial-gradient(circle at 10% 10%, rgba(255,100,100,0.8) 0%, transparent 60%)',
              'radial-gradient(circle at 90% 90%, rgba(255,150,150,0.8) 0%, transparent 60%)',
              'radial-gradient(circle at 10% 10%, rgba(255,100,100,0.8) 0%, transparent 60%)'
            ] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Top Header */}
        <div className="w-full pt-14 pb-4 px-6 flex justify-between items-center text-white/90 z-20">
          <ChevronDown size={28} className="drop-shadow-md cursor-pointer" />
          <div className="flex gap-1.5">
             <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
             <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_white]" />
             <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          </div>
          <MoreHorizontal size={28} className="drop-shadow-md cursor-pointer" />
        </div>

        {/* Lyrics Area */}
        <div className="flex-1 relative z-20 w-full overflow-hidden">
           {/* Gradient fade for lyrics text at top */}
           <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#fa243c] to-transparent z-30 pointer-events-none transform-gpu" />
           <LyricsDisplay />
        </div>

        {/* Footer Real Apple Music Player */}
        <div className="w-full px-6 pb-10 pt-4 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-30 relative backdrop-blur-md transform-gpu">
          <div className="flex justify-between items-center mb-6 text-white">
            <div className="flex gap-4 items-center">
               <motion.div className="w-14 h-14 rounded-md overflow-hidden shadow-2xl" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
                 <img src={ASSETS.albumArt} className="w-full h-full object-cover" />
               </motion.div>
               <div>
                 <h3 className="font-bold text-[18px] drop-shadow-md leading-tight">Everything u are</h3>
                 <p className="text-white/70 font-medium text-[15px] flex items-center gap-1">Hindia <span className="bg-white/20 text-[9px] px-1 rounded-sm uppercase">E</span></p>
               </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition">
              <MoreHorizontal size={18} className="text-white" />
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full flex items-center gap-3 mb-6 group cursor-pointer">
            <p className="text-[11px] text-white/50 font-medium w-8 font-mono">2:14</p>
            <div className="flex-1 h-[5px] bg-white/20 rounded-full overflow-hidden relative">
              <motion.div className="absolute top-0 left-0 h-full bg-white rounded-full" initial={{ width: "50%" }} animate={{ width: "58%" }} transition={{ duration: 4.5, ease: "linear" }} />
            </div>
            <p className="text-[11px] text-white/50 font-medium w-8 text-right font-mono">-1:58</p>
          </div>
          
          {/* Controls */}
          <div className="flex justify-between items-center text-white px-4">
            <Shuffle size={20} className="text-white/40 hover:text-white transition cursor-pointer" />
            <SkipBack size={36} className="fill-white cursor-pointer hover:opacity-80 transition" />
            <motion.div className="w-[60px] h-[60px] rounded-full bg-white/10 flex items-center justify-center backdrop-blur-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              whileTap={{ scale: 0.9 }}
            >
              <Pause size={32} className="fill-white" />
            </motion.div>
            <SkipForward size={36} className="fill-white cursor-pointer hover:opacity-80 transition" />
            <Repeat size={20} className="text-white/40 hover:text-white transition cursor-pointer" />
          </div>

          <div className="flex justify-between items-center text-white/60 px-6 mt-8">
            <Mic2 size={20} className="hover:text-white transition cursor-pointer" />
            <MonitorSpeaker size={20} className="hover:text-white transition cursor-pointer" />
            <ListMusic size={20} className="text-white cursor-pointer hover:opacity-80 transition" />
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// --- SCENE 3: [0:07 - 0:10] "Got beat down by the world" (IG Post Carousel) ---
const profilePicUrl = "/image.png"
const Scene3PhotoReveal = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    // Foto ganti otomatis setiap 400ms biar cepat seperti ketukan lagu
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % 5); 
    }, 450); 
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="w-full h-full bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
    >
      <div className="w-[1200px] h-[750px] bg-black border border-zinc-800 rounded-sm flex overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative"
           style={{ zIndex: 10 }}>
        
        {/* Left: Carousel */}
        <div className="w-[65%] h-full bg-zinc-950 relative flex items-center overflow-hidden border-r border-zinc-800">
           <motion.div 
             className="flex h-full w-full"
             animate={{ x: `-${slideIndex * 100}%` }}
             transition={{ type: "spring", stiffness: 350, damping: 35 }}
           >
             {ASSETS.gallery.slice(0, 5).map((img, i) => (
                <div key={i} className="min-w-full h-full flex items-center justify-center bg-black">
                  <img src={img} className="w-full h-full object-cover grayscale contrast-125" />
                </div>
             ))}
           </motion.div>
           
           {/* Slider Controls UI */}
           <div className="absolute right-4 w-8 h-8 bg-zinc-800/80 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm z-10 transition-transform cursor-pointer hover:bg-zinc-700">
              <ChevronRight size={20} className="text-white ml-0.5" />
           </div>
           {slideIndex > 0 && (
             <div className="absolute left-4 w-8 h-8 bg-zinc-800/80 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm z-10 transition-transform cursor-pointer hover:bg-zinc-700">
                <ChevronLeft size={20} className="text-white mr-0.5" />
             </div>
           )}

           {/* Dots */}
           <div className="absolute bottom-6 w-full flex justify-center gap-1.5 z-10">
             {ASSETS.gallery.slice(0, 5).map((_, i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? 'bg-blue-500 w-4 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-white/50 w-1.5'}`} />
             ))}
           </div>
        </div>

        {/* Right: Post Details */}
         <div className="w-[35%] h-full bg-black flex flex-col text-[#f5f5f5] text-sm relative">
           {/* Header */}
           <div className="h-[72px] border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                   <img src={profilePicUrl} className="w-full h-full rounded-full object-cover border-2 border-black" />
                 </div>
                 <div className="leading-tight">
                    <p className="font-semibold text-[14px] flex items-center gap-1">kou.sozo <span className="opacity-60 font-normal">and</span> actone.pplg</p>
                    <p className="text-[12px] opacity-60">SMK NEGERI 7 Samarinda</p>
                 </div>
              </div>
              <MoreHorizontal size={24} className="text-zinc-500 cursor-pointer hover:text-white transition"/>
           </div>

           {/* Comments Area (Caption) */}
           <div className="flex-1 overflow-y-auto px-4 py-5 font-sans relative" style={{ scrollbarWidth: 'none' }}>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px] shrink-0">
                   <img src="/kou.png" className="w-full h-full rounded-full object-cover border-2 border-black" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[14px] mb-2 leading-relaxed"><span className="font-semibold mr-2 text-[14px]">kou.sozo</span></p>
                    <p className="text-[13px] mb-4 text-zinc-300 leading-relaxed font-light">
                      "Cerita kita tak jauh berbeda  
                      Got beat down by the world, sometimes I wanna fold  
                      Namun suratmu kan kuceritakan ke anak-anakku nanti  
                      Bahwa aku pernah dicintai—dengan segala yang ada.

                      Lulus SMK bukan akhir, tapi awal baru. Dari coding malam-malam, project gagal, sampe hari ini pegang ijazah. Terima kasih temen, guru, dan diri sendiri yang bertahan. Next: software dev dreams! 🚀

                      #KelulusanSMK7Samarinda #EverythingUAreHindia #LulusSMK #FutureCoder"
                    </p>
                    <p className="text-[12px] text-zinc-500 font-medium">98w</p>
                 </div>
              </div>
              
              <div className="mt-8 flex gap-4 border-t border-zinc-800/80 pt-6">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px] shrink-0">
                   <img src={profilePicUrl} className="w-full h-full rounded-full object-cover border-2 border-black" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[14px] leading-relaxed"><span className="font-semibold mr-2">actone.pplg</span>Slide keempat misterius</p>
                    <div className="flex gap-4 text-[12px] text-zinc-500 font-medium mt-1 mb-2">
                       <p>98w</p>
                       <p className="font-bold cursor-pointer">Reply</p>
                    </div>
                    <p className="text-[12px] text-zinc-500 font-medium flex items-center gap-3 mt-4 cursor-pointer">
                       <span className="w-8 h-px bg-zinc-600 block"></span> View replies (1)
                    </p>
                 </div>
                 <Heart size={14} className="text-zinc-500 cursor-pointer mt-1" />
              </div>
           </div>

           {/* View insights button - Fixed bottom part 1 */}
           <div className="border-t border-zinc-800 bg-black py-3 px-4 flex items-center justify-between shrink-0">
              <p className="text-blue-500 font-semibold text-[14px] cursor-pointer hover:text-white transition">View insights</p>
              <button className="bg-[#0057f0] hover:bg-[#004bd1] text-white px-6 py-1.5 rounded-lg font-semibold text-[14px] transition">Boost post</button>
           </div>

           {/* Footer - Fixed bottom part 2 */}
           <div className="border-t border-zinc-800 shrink-0 bg-black pb-4">
             <div className="p-4 py-3">
                <div className="flex justify-between items-center mb-3">
                   <div className="flex gap-4">
                     <Heart size={26} className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] fill-red-500 hover:scale-110 cursor-pointer transition-transform" />
                     <MessageCircle size={26} className="text-white hover:text-zinc-400 cursor-pointer transition-colors" />
                     <Send size={26} className="text-white hover:text-zinc-400 cursor-pointer transition-colors" />
                   </div>
                   <div className="hover:text-zinc-400 cursor-pointer transition-colors text-white"><ArrowUpRight size={28}/></div>
                </div>
                <p className="font-semibold text-[14px] mb-1">Liked by m1kha_san and 27 others</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wide">April 1, 2024</p>
             </div>
             <div className="px-4 py-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-800 shrink-0">
                  <img src={profilePicUrl} className="w-full h-full object-cover" />
                </div>
                <p className="text-zinc-500 text-[14px] flex-1">Add a comment...</p>
                <button className="text-blue-500 font-semibold text-[14px] opacity-50 cursor-default">Post</button>
             </div>
           </div>
        </div>
      </div>

      {/* Center Background Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 pointer-events-none" />

      {/* FLASH TEXT - GOT BEAT DOWN */}
      <motion.div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none mix-blend-difference"
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 1], scale: [0.5, 1.2, 1] }} transition={{ delay: 1, duration: 1, type: "spring" }}
      >
        <h1 className="text-white text-[12vw] font-black uppercase tracking-tighter leading-none text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">GOT BEAT<br/>DOWN</h1>
      </motion.div>
    </motion.div>
  );
};

// --- SCENE 4: [0:11 - 0:13] "Sometimes I wanna fold" (Bento Widgets Premium 3D) ---
const Scene4Bento = () => (
  <motion.div className="w-full h-full bg-[#050505] flex items-center justify-center relative overflow-hidden" style={{ perspective: 1500 }}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, z: 200 }} transition={{ duration: 0.5 }}
  >
    {/* Ambient Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full translate-x-32" />

    {/* 3D Global Depth Wrapper - Continuous Floating */}
    <motion.div className="w-full max-w-6xl grid grid-cols-4 grid-rows-3 gap-8 h-[700px] will-change-transform z-10" style={{ transformStyle: 'preserve-3d' }}
      initial={{ rotateX: 25, rotateY: -15, rotateZ: 5, scale: 0.75, z: -800, opacity: 0 }} 
      animate={{ 
        rotateX: [12, 15, 12], 
        rotateY: [-8, -10, -8], 
        rotateZ: [2, -1, 2],
        scale: 1, 
        z: 0,
        y: [0, -20, 0],
        opacity: 1
      }} 
      transition={{ 
        duration: 1.8, type: "spring", bounce: 0.4,
        rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {/* 1. Main Large Photo (Span 2x2) */}
      <motion.div className="col-span-2 row-span-2 rounded-[2.5rem] overflow-hidden relative shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5 transform-gpu group"
        initial={{ z: -300, opacity: 0, y: 50 }} animate={{ z: 40, opacity: 1, y: 0 }} transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
      >
        <img src={ASSETS.gallery[3]} className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <p className="text-blue-400 font-bold tracking-widest uppercase mb-1 flex items-center gap-2"><MapPin size={16}/> SMKN 7 Samarinda</p>
          <h2 className="text-6xl font-black leading-none tracking-tighter drop-shadow-2xl">WHERE IT<br/>ALL STARTED.</h2>
        </div>
      </motion.div>

      {/* 2. Spotify Now Playing (Span 2x1) */}
      <motion.div className="col-span-2 row-span-1 rounded-[2.5rem] bg-zinc-900/80 backdrop-blur-3xl p-8 flex shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden transform-gpu"
        initial={{ z: -200, x: 50, opacity: 0 }} animate={{ z: 80, x: 0, opacity: 1 }} transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1DB954]/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] shrink-0 border border-white/10 relative z-10 rotate-3 group-hover:rotate-6 transition-transform"><img src={ASSETS.albumArt} className="w-full h-full object-cover" /></div>
        <div className="ml-8 justify-center flex flex-col z-10 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-[#1DB954] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 drop-shadow-md"><Music size={14} fill="currentColor"/> Now Playing</p>
          <h3 className="text-4xl font-black text-white leading-tight mb-1 drop-shadow-xl">Everything<br/>u are</h3>
          <p className="text-white/60 font-medium drop-shadow-md">Hindia</p>
        </div>
      </motion.div>

      {/* 3. Quote Widget (Span 1x1) */}
      <motion.div className="col-span-1 row-span-1 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-800 p-8 flex flex-col justify-between shadow-[0_40px_80px_rgba(37,99,235,0.4)] border border-blue-400/30 transform-gpu relative overflow-hidden"
        initial={{ z: -200, y: -50, opacity: 0 }} animate={{ z: 60, y: 0, opacity: 1 }} transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
      >
        <MessageCircle size={36} className="text-blue-300 opacity-60 drop-shadow-lg" fill="currentColor"/>
        <h3 className="text-3xl font-black text-white leading-tight tracking-tight mt-4 relative z-10 drop-shadow-xl transform-gpu" style={{ transform: 'translateZ(20px)' }}>
          "Sometimes I<br/>wanna fold..."
        </h3>
        <div className="absolute -bottom-10 -right-10 text-white/5"><MessageCircle size={180} fill="currentColor"/></div>
      </motion.div>

      {/* 4. Timeline / Year Widget (Span 1x1) */}
      <motion.div className="col-span-1 row-span-1 rounded-[2.5rem] bg-yellow-400 p-8 flex flex-col justify-center items-center text-black shadow-[0_40px_80px_rgba(250,204,21,0.4)] transform-gpu relative overflow-hidden"
        initial={{ z: -200, y: -50, opacity: 0 }} animate={{ z: 120, y: 0, opacity: 1 }} transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
      >
        <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
        <p className="font-bold uppercase tracking-widest text-black/60 text-sm mb-1 transform-gpu" style={{ transform: 'translateZ(10px)' }}>Class of</p>
        <h3 className="text-7xl font-black tracking-tighter drop-shadow-lg transform-gpu" style={{ transform: 'translateZ(30px)' }}>2026</h3>
      </motion.div>

      {/* 5. Photo Strip Widget (Span 2x1) */}
      <motion.div className="col-span-2 row-span-1 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl p-6 flex items-center gap-4 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10 transform-gpu"
        initial={{ z: -200, y: 50, opacity: 0 }} animate={{ z: 50, y: 0, opacity: 1 }} transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
      >
        <div className="flex-1 h-full rounded-2xl overflow-hidden relative group border border-white/10 transform-gpu" style={{ transform: 'translateZ(15px)' }}>
          <img src={ASSETS.gallery[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" />
        </div>
        <div className="flex-1 h-full rounded-2xl overflow-hidden relative group border border-white/10 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
          <img src={ASSETS.gallery[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" />
        </div>
        <div className="w-20 h-full rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 text-white/50 bg-black/30 hover:bg-white/10 hover:border-white/40 transition-colors cursor-pointer transform-gpu" style={{ transform: 'translateZ(10px)' }}>
          <ImageIcon size={28}/>
          <span className="text-xs font-bold uppercase tracking-widest">+12</span>
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);

// --- SCENE 5: [0:13 - 0:16] "Namun suratmu kan kuceritakan..." (IG Story) ---
const Scene5IGStory = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    // Timing untuk stiker IG disesuaikan untuk transisi antar pesan
    const intervals = [
      setTimeout(() => setStep(1), 400),  // Namun suratmu...
      setTimeout(() => setStep(2), 1100), // kan kuceritakan
      setTimeout(() => setStep(3), 2000)  // ke anak-anakku nanti!
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="w-full h-full bg-[#050505] flex justify-center items-center relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5" />
      <motion.div className="w-[480px] h-[880px] bg-zinc-900 rounded-[3.5rem] border-[10px] border-zinc-950 overflow-hidden relative shadow-[0_0_150px_rgba(59,130,246,0.2)]"
        initial={{ scale: 0.8, y: 150, rotateX: 10 }} animate={{ scale: 1, y: 0, rotateX: 0 }} transition={{ type: "spring", bounce: 0.4 }}
        style={{ perspective: 1000 }}
      >
        <video src={ASSETS.igVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

        <div className="absolute top-0 w-full p-6 z-10 pt-8">
          <div className="flex gap-1.5 mb-4">
            <div className="h-1 flex-1 bg-white/30 rounded-full"><motion.div className="h-full bg-white" initial={{ width: "100%" }} /></div>
            <div className="h-1 flex-1 bg-white/30 rounded-full"><motion.div className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} /></div>
            <div className="h-1 flex-1 bg-white/30 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2.5px]">
                  <img src="/image.png" className="w-full h-full object-cover rounded-full border-2 border-black" />
               </div>
               <div>
                 <p className="text-white font-bold text-sm flex items-center gap-1">actone.pplg <CheckCircle2 size={14} className="text-blue-500" fill="currentColor"/></p>
                 <p className="text-white/70 text-xs font-medium">Minggu, 12 Mei • Kenangan</p>
               </div>
            </div>
          </div>
        </div>

        {/* IG Lyrics Chat Overlay */}
        <div className="absolute top-1/2 left-0 w-full px-6 flex flex-col gap-5 -translate-y-1/2 z-20">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div className="self-start bg-blue-600/90 backdrop-blur-xl text-white px-6 py-4 rounded-3xl rounded-tl-sm shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-blue-400/30"
                initial={{ opacity: 0, x: -30, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ type: "spring" }}
              >
                <p className="text-2xl font-bold leading-tight">Namun suratmu...</p>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div className="self-end bg-white/95 text-black px-6 py-4 rounded-3xl rounded-br-sm shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/50" 
                initial={{ opacity: 0, x: 30, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ type: "spring" }}
              >
                <p className="text-2xl font-bold leading-tight">kan kuceritakan</p>
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div className="self-start bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-4 rounded-3xl rounded-bl-sm shadow-[0_10px_30px_rgba(0,0,0,0.3)]" 
                initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring" }}
              >
                <p className="text-2xl font-black leading-tight">ke anak-anakku nanti! 😆</p>
                <div className="absolute -bottom-2 -right-2"><Heart size={28} className="text-red-500 drop-shadow-sm" fill="currentColor"/></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 w-full p-6 pb-10 flex items-center gap-5 z-10">
          <div className="flex-1 border border-white/30 bg-white/10 rounded-full px-6 py-3.5 backdrop-blur-lg"><span className="text-white/70 font-medium">Kirim pesan...</span></div>
          <Heart color="white" size={32} />
          <Send color="white" size={30} className="-rotate-12" />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- SCENE 6: [0:18 - 0:25] "Bahwa~ aku~~ pernah dicintai" (macOS Finder) ---
const Scene6MacOS = () => (
  <motion.div className="w-full h-full bg-cover bg-center flex items-center justify-center p-12 relative overflow-hidden" style={{ backgroundImage: `url(${ASSETS.schoolBg})` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-yellow-900/40 backdrop-blur-lg" />

    {/* Finder Window (Belakang) */}
    <motion.div className="absolute w-full max-w-[1300px] h-[780px] top-[8%] left-[8%] bg-white/80 backdrop-blur-2xl rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.4)__inset] flex flex-col z-10 overflow-hidden"
      initial={{ y: 200, scale: 0.9, opacity: 0, rotateX: 15 }} animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }} transition={{ type: "spring", bounce: 0.3 }} style={{ perspective: 1200 }}
    >
      <div className="h-14 bg-gradient-to-b from-white/60 to-white/40 border-b border-black/5 flex items-center px-5 justify-between select-none backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex gap-2"><div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></div><div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div><div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div></div>
          <p className="font-bold text-zinc-800 text-sm flex items-center gap-2 bg-white/50 px-3 py-1 rounded-md border border-black/5"><Folder size={16} fill="#3b82f6" className="text-blue-500" /> Kenangan SMK 7</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 bg-white/30 backdrop-blur-md border-r border-black/5 p-4 flex flex-col gap-8 text-sm">
          <ul className="space-y-1 text-zinc-700 font-medium tracking-wide">
            <li className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-lg font-semibold"><Folder size={20} fill="#3b82f6" className="text-blue-500"/> Kenangan SMK 7</li>
          </ul>
        </div>
        <div className="flex-1 bg-white/60 backdrop-blur-lg p-10 overflow-y-auto">
          <div className="grid grid-cols-4 gap-8 content-start">
            {ASSETS.gallery.map((img, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-48 h-48 bg-white/80 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] border border-black/5 p-2 transition-transform hover:scale-105"><img src={img} className="w-full h-full object-cover rounded-xl" /></div>
                <span className="text-sm font-semibold text-zinc-600">IMG_2024_{i}.jpg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>

    {/* Photo Viewer / Preview (Depan) */}
    <motion.div className="absolute w-[800px] h-[650px] top-[12%] right-[8%] bg-zinc-100/95 backdrop-blur-3xl rounded-xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/50 flex flex-col z-10 overflow-hidden origin-bottom-right"
      initial={{ scale: 0.5, opacity: 0, rotate: 10, y: 100 }} animate={{ scale: 1, opacity: 1, rotate: -2, y: 0 }} transition={{ type: "spring", delay: 0.8, bounce: 0.4 }}
    >
      <div className="h-12 bg-gradient-to-b from-white to-gray-200 border-b border-gray-300 flex items-center justify-center relative select-none">
         <div className="absolute left-4 flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></div><div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div><div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
         </div>
         <span className="text-sm font-bold text-gray-700 font-sans tracking-wide">Preview - Memori_Studio.jpg</span>
      </div>
      <div className="flex-1 bg-zinc-200/50 p-6 flex items-center justify-center">
         <div className="w-full h-full rotate-2 shadow-2xl bg-white p-4">
           {/* Menyatukan foto kelas di Viewer */}
           <img src={ASSETS.studio} className="w-full h-full object-cover grayscale" />
         </div>
      </div>
    </motion.div>

    {/* macOS DOCK */}
    <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-2xl border border-white/40 rounded-3xl px-6 py-4 flex gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-30"
       initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, type: "spring", bounce: 0.5 }}
    >
        <div className="w-20 h-20 bg-gradient-to-bl from-blue-400 to-blue-600 rounded-2xl shadow-lg border border-white/20 flex items-center justify-center transition-transform hover:-translate-y-4 cursor-pointer hover:scale-110"><Folder size={40} color="white" fill="white"/></div>
        <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-2xl shadow-lg border border-white/20 flex items-center justify-center transition-transform hover:-translate-y-4 cursor-pointer hover:scale-110"><ImageIcon size={40} color="white"/></div>
        <div className="w-20 h-20 bg-gradient-to-bl from-green-400 to-[#1db954] rounded-2xl shadow-lg border border-white/20 flex items-center justify-center transition-transform hover:-translate-y-4 cursor-pointer hover:scale-110"><Music size={40} color="white"/></div>
        <div className="w-px h-16 bg-white/50 mx-2 self-center"></div>
        <div className="w-20 h-20 bg-zinc-900 rounded-2xl shadow-lg border border-white/20 flex items-center justify-center transition-transform hover:-translate-y-4 cursor-pointer hover:scale-110"><Search size={40} color="white"/></div>
    </motion.div>

    {/* Pop-up Stickers synchronized with lyrics */}
    <motion.div className="absolute z-40 top-[20%] left-[10%] bg-blue-600 text-white px-12 py-4 rounded-2xl text-6xl font-black shadow-[15px_15px_0px_rgba(0,0,0,1)] border-[5px] border-white origin-bottom-left rotate-[-15deg]"
      initial={{ scale: 0, rotate: -60 }} animate={{ scale: 1, rotate: -15 }} transition={{ type: "spring", delay: 0.5, bounce: 0.6 }}
    >Bahwa~</motion.div>

    <motion.div className="absolute z-40 top-[40%] right-[10%] bg-yellow-400 text-black px-12 py-4 rounded-2xl text-6xl font-black shadow-[15px_15px_0px_rgba(0,0,0,1)] border-[5px] border-white origin-bottom-right rotate-[15deg]"
      initial={{ scale: 0, rotate: 60 }} animate={{ scale: 1, rotate: 15 }} transition={{ type: "spring", delay: 1.8, bounce: 0.6 }}
    >Aku pernah</motion.div>

    <motion.div className="absolute z-40 bottom-[22%] left-1/2 -translate-x-1/2 bg-pink-500 text-white px-16 py-6 rounded-full text-7xl font-black shadow-[0_20px_0px_rgba(0,0,0,0.3)] border-[8px] border-white origin-center rotate-[-4deg]"
      initial={{ scale: 0, y: 200 }} animate={{ scale: 1, y: 0, rotate: -4 }} transition={{ type: "spring", delay: 3.2, bounce: 0.5 }}
    >Dicintai</motion.div>
  </motion.div>
);

// --- SCENE 7: [0:25 - 0:28] "Seada-adanya, sekurang-kurangnya" (Bridge/Outro) ---
const Scene7Bridge = () => (
  <motion.div className="w-full h-full bg-[#050505] text-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow" />
    <motion.div initial={{ y: 20, opacity: 0, filter: "blur(10px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.5, duration: 2 }} className="space-y-6 relative z-10 w-full max-w-5xl">
      <h2 className="text-6xl font-black tracking-tight leading-snug bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-yellow-200 drop-shadow-lg">
        "Seada-adanya,<br/>sekurang-kurangnya."
      </h2>
      <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto my-12 rounded-full shadow-lg"></div>

      {/* Credits Section */}
      <div className="grid grid-cols-3 gap-8 mt-16 text-left border-t border-white/10 pt-12">
         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, type: "spring" }}>
            <p className="text-zinc-500 uppercase tracking-widest font-bold text-sm mb-2">Developer</p>
            <p className="text-3xl font-black flex items-center gap-2"><ArrowUpRight className="text-blue-400" size={32}/> KOU</p>
            <p className="text-blue-400 font-semibold mt-1">https://kou.it.com</p>
         </motion.div>
         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.7, type: "spring" }}>
            <p className="text-zinc-500 uppercase tracking-widest font-bold text-sm mb-2">Music Track</p>
            <p className="text-3xl font-black flex items-center gap-2 line-clamp-1"><Music className="text-[#1DB954]" size={32}/> Everything u are</p>
            <p className="text-zinc-300 font-medium mt-1">Hindia - Spotify Music</p>
         </motion.div>
         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.9, type: "spring" }}>
            <p className="text-zinc-500 uppercase tracking-widest font-bold text-sm mb-2">Inspirasi</p>
            <p className="text-3xl font-black">TikTok Trends</p>
            <p className="text-zinc-300 font-medium mt-1">Video memori kelulusan</p>
         </motion.div>
      </div>

      <p className="text-xl text-zinc-500 tracking-widest uppercase font-bold mt-20">SMK Negeri 7 Samarinda • 2026</p>
    </motion.div>
  </motion.div>
);


// --- MAIN APP (TIMELINE CONTROLLER) ---
export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scene, setScene] = useState(0); 
  const audioRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;

    // Timeline logic disinkronkan tepat dengan lirik Everything u are (155bpm pacing)
    const timeline = [
      setTimeout(() => setScene(1), 0),      // 0.00s: "Cerita kita" (Intro)
      setTimeout(() => setScene(2), 3000),   // 3.00s: "Tak jauh berbeda" (Apple Music UI) - dur 4.55s
      setTimeout(() => setScene(3), 7550),   // 7.55s: "Got beat down by the world" - dur 3.18s
      setTimeout(() => setScene(4), 10330),  // 10.73s: "Sometimes I wanna fold"
      setTimeout(() => setScene(5), 12300),  // 13.30s: "Namun suratmu kan kuceritakan..." (dipercepat -100ms agar Scene 4 sedikit lebih pendek)
      setTimeout(() => setScene(6), 16800),  // 16.40s: "Bahwa aku pernah dicintai" (dimundurkan +390ms agar Scene 5 bisa dibaca)
      setTimeout(() => setScene(7), 21630),  // 21.63s: "Seada-adanya..." - dur 4.15s
      setTimeout(() => {
         setIsPlaying(false);
         if (audioRef.current) audioRef.current.pause();
      }, 29000) // Reset di 29s
    ];

    return () => timeline.forEach(clearTimeout);
  }, [isPlaying]);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed: ", e));
    }
    setScene(1);
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-screen bg-black font-sans overflow-hidden select-none relative antialiased">
      
      {/* Audio element untuk BGM */}
      <audio ref={audioRef} src={ASSETS.audioTrack} preload="auto" />

      {/* Font & Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Permanent+Marker&display=swap');
        div { font-family: 'Inter', sans-serif; }
        .marker-font { font-family: 'Permanent Marker', cursive; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.4; } }
      `}</style>

      {/* Start Button Overlay */}
      {!isPlaying && scene === 0 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-xl">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="text-center">
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400">SMK 7 Samarinda</h1>
            <h2 className="text-2xl font-bold text-zinc-300 mb-12 tracking-wide uppercase">Everything U Are - Motion</h2>
            <button onClick={handleStart}
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 to-yellow-400 text-black font-black text-3xl rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-5 shadow-[0_20px_60px_rgba(59,130,246,0.4)] border-4 border-white/20"
            >
              <Play className="fill-black w-10 h-10" />
              MULAI RENDER 🎬
            </button>
            <p className="text-zinc-400 mt-8 text-sm font-medium bg-black/30 px-6 py-3 rounded-full backdrop-blur-md inline-flex items-center gap-2">
              <Monitor size={16}/> Audio akan otomatis diputar. Siapkan OBS di mode Fullscreen (F11).
            </p>
          </motion.div>
        </div>
      )}

      {/* Progress Bar Cinematic (Atas) */}
      {isPlaying && (
        <div className="absolute top-0 left-0 w-full h-2 bg-white/10 z-50 backdrop-blur-md">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-400 relative overflow-hidden"
            initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 31, ease: "linear" }}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30 mix-blend-overlay animate-pulse-slow"></div>
          </motion.div>
        </div>
      )}

      {/* Scene Render Engine */}
      <AnimatePresence mode="wait">
        {scene === 1 && <Scene1Intro key="scene1" />}
        {scene === 2 && <Scene2MusicPlayer key="scene2" />}
        {scene === 3 && <Scene3PhotoReveal key="scene3" />}
        {scene === 4 && <Scene4Bento key="scene4" />}
        {scene === 5 && <Scene5IGStory key="scene5" />}
        {scene === 6 && <Scene6MacOS key="scene6" />}
        {scene === 7 && <Scene7Bridge key="scene7" />}
      </AnimatePresence>

      {/* Cinematic Film Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-40" style={{ background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.4) 100%)' }}></div>
      <div className="pointer-events-none absolute inset-0 z-40 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
    </div>
  );
}
