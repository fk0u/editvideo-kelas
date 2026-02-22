"use client";

import React from "react";
import { Player } from "@remotion/player";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { Music, Cloud, Image as ImageIcon, LayoutGrid } from "lucide-react";

// ==========================================
// SCENE 1: Intro Grid (Detik 0 - 4 | 0 - 120 Frames)
// ==========================================
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi Invert di detik ke-3 (frame >= 3 * 30 = 90)
  const isNegative = frame >= 3 * fps;

  // Animasi kemunculan teks
  const yOffset = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 30 });
  const translateY = interpolate(yOffset, [0, 1], [50, 0]);
  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-4 overflow-hidden">
      {/* Grid Placeholder Box */}
      <AbsoluteFill className="grid grid-cols-4 md:grid-cols-6 gap-2 p-2 opacity-30">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="bg-gray-300 rounded-md w-full h-full aspect-square" />
        ))}
      </AbsoluteFill>

      {/* Raksasa Text */}
      <div
        style={{ transform: `translateY(${translateY}px)`, opacity }}
        className="relative z-10 text-6xl md:text-9xl font-black text-center leading-none tracking-tighter mix-blend-difference text-black"
      >
        CERITA <br /> KITA <br />
        <span className="text-blue-600 bg-blue-100 px-4 inline-block transform -rotate-2">
          SMK BISA
        </span>
      </div>

      {/* Invert Effect Overlay */}
      <div
        style={{ backdropFilter: isNegative ? "invert(100%)" : "invert(0%)" }}
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-500"
      />
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 2: Giant Lyrics (Detik 5 - 9 | 150 - 270 Frames)
// ==========================================
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const lyrics = [
    "Dan ku menyelamatkanmu",
    "Dan sekarang aku tahu",
    "Tak jauh berbeda",
  ];

  // Setiap lirik tampil 40 frame (~1.3 detik)
  return (
    <AbsoluteFill className="bg-gray-50 flex items-center justify-center px-4 overflow-hidden">
      {lyrics.map((text, i) => {
        const startFrame = i * 40;
        const isActive = frame >= startFrame && frame < startFrame + 40;

        if (!isActive) return null;

        const localFrame = frame - startFrame;
        // Animasi fade in slide up -> fade out slide up
        const opacity = interpolate(localFrame, [0, 10, 30, 40], [0, 1, 1, 0]);
        const translateY = interpolate(localFrame, [0, 10, 30, 40], [40, 0, 0, -40]);

        return (
          <div
            key={i}
            style={{ opacity, transform: `translateY(${translateY}px)` }}
            className="absolute text-5xl md:text-7xl font-bold text-center tracking-tight"
          >
            {text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 3: The Widgets (Detik 10 - 12 | 300 - 360 Frames)
// ==========================================
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background bergeser ke hitam
  const bgProgress = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Detik 11 (frame 30) widget muncul, center logo mengecil
  const showWidgets = frame >= 1 * fps;
  const logoScale = spring({ frame: frame - fps, fps, config: { damping: 15 }});
  const currentLogoScale = interpolate(logoScale, [0, 1], showWidgets ? [3, 0.8] : [0, 3], { extrapolateLeft: 'clamp' });

  // Animasi 4 Widget
  const widgetScale = spring({ frame: frame - fps, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill 
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgProgress})` }}
      className="flex items-center justify-center overflow-hidden"
    >
      <AbsoluteFill className="bg-white pointer-events-none" style={{ opacity: 1 - bgProgress }} />

      {/* Center Logo */}
      <div
        style={{ transform: `scale(${frame < fps ? interpolate(frame, [0, 15], [0, 3]) : currentLogoScale})` }}
        className="absolute z-10 flex flex-col items-center justify-center text-[#1DB954]"
      >
        <Music size={120} strokeWidth={2} />
      </div>

      {showWidgets && (
        <div className="absolute inset-0 p-8 md:p-16">
          {/* Top Left - Weather */}
          <div
            style={{ 
              transform: `scale(${widgetScale}) translate(${interpolate(widgetScale, [0, 1], [-100, 0])}px, ${interpolate(widgetScale, [0, 1], [-100, 0])}px)`
            }}
            className="absolute top-10 left-10 md:top-20 md:left-20 w-48 h-48 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 flex flex-col text-white shadow-2xl"
          >
            <Cloud size={32} className="text-blue-400 mb-2" />
            <div className="text-3xl font-bold">30°C</div>
            <div className="text-sm opacity-60">Cerah</div>
          </div>

          {/* Top Right - Photos */}
          <div
            style={{ 
              transform: `scale(${spring({ frame: frame - fps - 5, fps, config: { damping: 12 } })})` 
            }}
            className="absolute top-10 right-10 md:top-20 md:right-20 w-40 h-48 bg-gray-200 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
          >
            <ImageIcon size={48} className="text-gray-400" />
          </div>

          {/* Bottom Left - Playlist */}
          <div
             style={{ 
              transform: `scale(${spring({ frame: frame - fps - 10, fps, config: { damping: 12 } })})` 
            }}
            className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-64 h-32 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 flex items-center gap-4 shadow-2xl text-white"
          >
            <div className="w-16 h-16 bg-[#1DB954] rounded-lg flex items-center justify-center">
              <Music size={24} />
            </div>
            <div>
              <div className="font-bold">Kenangan SMK</div>
              <div className="text-sm opacity-60">Playlist • 12 Tracks</div>
            </div>
          </div>

          {/* Bottom Right - Grid */}
          <div
            style={{ 
              transform: `scale(${spring({ frame: frame - fps - 15, fps, config: { damping: 12 } })})` 
            }}
            className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-48 h-48 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl flex items-center justify-center"
          >
             <LayoutGrid size={48} className="text-white/50" />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 4: Chat Bubbles Overlay (Detik 13 - 18 | 390 - 540 Frames)
// ==========================================
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubbles = ["Namun", "Kan ku ceritakan", "Ke anak", "Anak ku nanti!"];
  const photoScale = interpolate(frame, [0, 150], [1.2, 1]);
  const photoOpacity = interpolate(frame, [0, 30], [0, 0.6]);

  return (
    <AbsoluteFill className="bg-gray-800 flex items-center justify-center overflow-hidden">
      {/* Background Photo Placeholder */}
      <div
        style={{ transform: `scale(${photoScale})`, opacity: photoOpacity }}
        className="absolute inset-0 w-full h-full bg-slate-600 bg-cover bg-center flex items-center justify-center"
      >
        <ImageIcon size={100} className="text-white/20" />
      </div>

      {/* Chat Bubbles Container */}
      <div className="z-10 w-full max-w-lg flex flex-col gap-4 p-8">
        {bubbles.map((text, idx) => {
          // Tiap bubble muncul per detik (setiap 30 frame)
          const startFrame = idx * 30;
          if (frame < startFrame) return null;

          const localFrame = frame - startFrame;
          const bubbleScale = spring({ frame: localFrame, fps, config: { damping: 12 } });
          const popY = interpolate(bubbleScale, [0, 1], [40, 0]);

          return (
            <div
              key={idx}
              style={{ transform: `translateY(${popY}px) scale(${bubbleScale})`, opacity: bubbleScale }}
              className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="bg-[#0b93f6] text-white px-6 py-3 rounded-2xl rounded-tl-sm text-2xl font-medium shadow-lg">
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 5: macOS Finder & Stickers (Detik 19 - 23 | 570 - 690 Frames)
// ==========================================
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1]);
  const windowScale = spring({ frame, fps, config: { damping: 12 } });

  const stickers = [
    { text: "Bahwa", rotate: "-12deg", color: "bg-red-500", top: "-top-6", left: "-left-10" },
    { text: "Pernah", rotate: "6deg", color: "bg-blue-500", top: "top-10", left: "-right-12" },
    { text: "Dicintai", rotate: "-6deg", color: "bg-yellow-500", top: "-bottom-8", left: "left-1/2 -translate-x-1/2" },
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center p-4">
      <AbsoluteFill className="bg-white" style={{ opacity: 1 - bgOpacity }} />

      {/* Finder Window Mockup */}
      <div
        style={{ transform: `scale(${windowScale})` }}
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200"
      >
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="flex-1 text-center text-xs font-semibold text-gray-500">
            Foto Kelas.png
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 flex items-center justify-center">
          <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center shadow-inner relative overflow-hidden">
             <div className="text-gray-400 font-bold text-2xl flex flex-col items-center">
                <ImageIcon size={48} className="mb-2" />
                <span>Foto Kelas</span>
             </div>
          </div>
        </div>

        {/* Floating Stickers */}
        {stickers.map((sticker, idx) => {
          const startFrame = 30 + (idx * 15); // Stagger interval (30 frame pertama nunggu)
          if (frame < startFrame) return null;

          const localFrame = frame - startFrame;
          const sScale = spring({ frame: localFrame, fps, config: { damping: 12 } });
          const popY = interpolate(sScale, [0, 1], [50, 0]);

          return (
            <div
              key={idx}
              style={{ transform: `translateY(${popY}px) scale(${sScale}) rotate(${sticker.rotate})` }}
              className={`absolute ${sticker.top} ${sticker.left} ${sticker.color} text-white font-black text-3xl md:text-5xl px-6 py-2 rounded-xl shadow-xl`}
            >
              {sticker.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 6: Credits (Detik 24+ | 720 - 900+ Frames)
// ==========================================
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const text1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const text2Opacity = interpolate(frame, [75, 105], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center text-white">
      <AbsoluteFill className="bg-transparent" style={{ opacity: bgOpacity }}>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p
            style={{ opacity: text1Opacity }}
            className="text-lg md:text-xl font-mono opacity-80"
          >
            Credits: Dibuat oleh Frontend Expert
          </p>
          <p
            style={{ opacity: text2Opacity }}
            className="text-lg md:text-xl font-mono opacity-80"
          >
            Musik: Everything u are - Hindia
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==========================================
// MAIN COMPOSITION
// ==========================================
const GraduationVideoComposition = () => {
  return (
    <AbsoluteFill className="bg-white">
      {/* Detik 0-4 */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1 />
      </Sequence>
      
      {/* Detik 5-9 */}
      <Sequence from={150} durationInFrames={150}>
        <Scene2 />
      </Sequence>

      {/* Detik 10-12 */}
      <Sequence from={300} durationInFrames={90}>
        <Scene3 />
      </Sequence>

      {/* Detik 13-18 */}
      <Sequence from={390} durationInFrames={180}>
        <Scene4 />
      </Sequence>

      {/* Detik 19-23 */}
      <Sequence from={570} durationInFrames={150}>
        <Scene5 />
      </Sequence>

      {/* Detik 24 - 30 */}
      <Sequence from={720} durationInFrames={180}>
        <Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};

// ==========================================
// NEXT.JS PAGE: Rendering Remotion Player
// ==========================================
export default function RemotionPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Mencegah hydration mismatch jika dirender ke DOM SSR
  
  return (
    <div className="w-full h-screen bg-[#111] flex items-center justify-center font-sans">
      {/* Bungkus player di container agar rasio video 16:9 pas di tengah */}
      <div className="relative w-full aspect-video md:w-4/5 max-h-screen rounded-md overflow-hidden shadow-2xl border border-gray-800">
        <Player
          component={GraduationVideoComposition}
          durationInFrames={900} // Total durasi: 30 detik (30detik * 30fps = 900 frame)
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: "100%",
            height: "100%",
          }}
          controls
          autoPlay
          loop
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 font-mono text-xs">
         Remotion is locked to 30 FPS. Render perfectly using Next.js!
      </div>
    </div>
  );
}
