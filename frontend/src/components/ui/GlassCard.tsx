import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function GlassCard({ children, className = '', hoverEffect = false }: GlassCardProps) {
    return (
        <div
            className={`
        glass-panel rounded-2xl p-6 relative overflow-hidden
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:scale-[1.02] hover:shadow-accent/20 hover:border-accent/30' : ''}
        ${className}
      `}
        >
            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
