"use client";

import { useState } from 'react';
import GlassCard from './ui/GlassCard';
import GradientButton from './ui/GradientButton';

interface VideoInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function VideoInput({ onAnalyze, isLoading }: VideoInputProps) {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative z-20">
      <GlassCard className={`!p-2 transition-all duration-500 ${isFocused ? 'shadow-[0_0_40px_rgba(255,46,84,0.3)] border-accent/50' : ''}`}>
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1 group">
            <div className={`absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors duration-300 ${isFocused ? 'text-accent' : 'text-white/30'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste YouTube URL for Director's Analysis..."
              className="w-full bg-transparent text-white placeholder-white/30 focus:outline-none pl-14 pr-4 py-4 text-lg font-medium rounded-xl"
              disabled={isLoading}
            />
          </div>

          <GradientButton
            type="submit"
            disabled={isLoading || !url}
            isLoading={isLoading}
            className="!py-3 !px-8 !rounded-lg"
          >
            ANALYZE
          </GradientButton>
        </form>
      </GlassCard>

      <div className="mt-4 flex justify-center items-center gap-6 text-xs font-medium text-white/40 uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Scene Detection
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Viral Clips
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Cinematography
        </span>
      </div>
    </div>
  );
}
