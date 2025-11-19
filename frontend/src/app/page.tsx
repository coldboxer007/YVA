"use client";

import { useState } from 'react';
import VideoInput from '@/components/VideoInput';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import GlassCard from '@/components/ui/GlassCard';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError('');
    setAnalysisData(null);
    setCurrentUrl(url);

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please check the URL and try again.');
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden selection:bg-accent selection:text-white">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent)] opacity-20 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600 opacity-10 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-50 animate-fade-in">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent)] to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-all duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-white leading-none">
              DIRECTOR'S <span className="text-gradient-accent">CUT</span>
            </h1>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">AI Video Intelligence</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Showcase</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="https://deepmind.google" target="_blank" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white text-xs font-bold tracking-wide">
            POWERED BY GEMINI
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 z-10 flex flex-col items-center">

        {!analysisData && (
          <div className="text-center max-w-4xl mx-auto mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider text-accent mb-8 neon-border">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              NEW: VIRAL SHORTS DETECTION
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]">
              Turn Content into <br />
              <span className="text-gradient-accent">Cinema.</span>
            </h2>

            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Upload any YouTube video. Get a professional <span className="text-white font-medium">director's breakdown</span>,
              cinematography insights, and AI-curated <span className="text-white font-medium">viral clips</span> ready for TikTok & Reels.
            </p>
          </div>
        )}

        <VideoInput onAnalyze={handleAnalyze} isLoading={isLoading} />

        {error && (
          <GlassCard className="w-full max-w-2xl mx-auto mt-8 !border-red-500/30 !bg-red-500/10">
            <div className="flex items-center gap-4 text-red-200">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          </GlassCard>
        )}

        {analysisData && (
          <div className="w-full mt-8 animate-slide-up">
            <AnalysisDashboard
              videoUrl={currentUrl}
              analysis={analysisData.analysis}
              videoInfo={analysisData.video_info}
            />
          </div>
        )}
      </div>
    </main>
  );
}
