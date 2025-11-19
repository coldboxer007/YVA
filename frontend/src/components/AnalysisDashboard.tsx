import React from 'react';
import ReactMarkdown from 'react-markdown';
import GlassCard from './ui/GlassCard';

interface AnalysisDashboardProps {
    videoUrl: string;
    analysis: string;
    videoInfo: any;
}

export default function AnalysisDashboard({ videoUrl, analysis, videoInfo }: AnalysisDashboardProps) {
    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getVideoId(videoUrl);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto animate-slide-up pb-20">
            {/* Left Column: Video Player & Info (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
                <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group neon-glow">
                    {videoId ? (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 font-mono">
                            NO SIGNAL
                        </div>
                    )}
                </div>

                <GlassCard className="!p-6 border-l-4 border-l-accent">
                    <h2 className="text-xl font-bold mb-2 text-white tracking-tight leading-tight line-clamp-2">{videoInfo?.title || "Video Title"}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-white/40 text-xs font-bold tracking-wider uppercase mt-4">
                        <span className="bg-white/5 px-2 py-1 rounded border border-white/10">{videoInfo?.uploader || "Unknown Channel"}</span>
                        <span>•</span>
                        <span>{videoInfo?.duration ? `${Math.floor(videoInfo.duration / 60)}m ${videoInfo.duration % 60}s` : "--:--"}</span>
                    </div>
                </GlassCard>

                {/* Viral Shorts Quick Tip Card */}
                <GlassCard className="!p-6 bg-gradient-to-br from-accent/10 to-transparent !border-accent/20">
                    <h3 className="text-sm font-black text-accent mb-2 flex items-center tracking-widest uppercase">
                        <span className="mr-2 text-lg">🔥</span> Viral Potential
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Review the "Viral Shorts Potential" section in the analysis for specific timestamps to clip!
                    </p>
                </GlassCard>
            </div>

            {/* Right Column: Director's Analysis (8 cols) */}
            <GlassCard className="lg:col-span-8 !p-0 h-[800px] flex flex-col">
                <div className="sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-10 p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center">
                        <span className="w-1.5 h-6 bg-gradient-to-b from-accent to-orange-500 mr-3 rounded-full"></span>
                        Director's Log
                    </h3>
                    <div className="flex items-center space-x-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase">AI Analysis</span>
                    </div>
                </div>

                <div className="overflow-y-auto custom-scrollbar p-8 pt-4">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-3xl font-black text-white mt-8 mb-6 border-b border-white/10 pb-4" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-accent mt-10 mb-4 uppercase tracking-widest flex items-center gap-2" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-white mt-8 mb-3" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded text-[0.9em]" {...props} />,
                                ul: ({ node, ...props }) => <ul className="space-y-3 my-6" {...props} />,
                                li: ({ node, ...props }) => (
                                    <li className="relative pl-6 text-gray-300 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full" {...props} />
                                ),
                                p: ({ node, ...props }) => <p className="text-gray-300 leading-relaxed mb-6 font-light" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-accent pl-6 italic text-gray-400 my-8 bg-white/5 p-6 rounded-r-xl" {...props} />,
                            }}
                        >
                            {analysis}
                        </ReactMarkdown>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
