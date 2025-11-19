import React from 'react';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
}

export default function GradientButton({
    children,
    className = '',
    variant = 'primary',
    isLoading = false,
    ...props
}: GradientButtonProps) {

    const baseStyles = "relative px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group";

    const variants = {
        primary: "bg-gradient-to-r from-[var(--accent)] to-orange-600 text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 border-none",
        secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10",
        outline: "bg-transparent border border-accent text-accent hover:bg-accent/10"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {/* Shimmer effect */}
            {variant === 'primary' && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-20" />
            )}

            <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </>
                ) : children}
            </span>
        </button>
    );
}
