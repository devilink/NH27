import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Marquee() {
    return (
        <div className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] py-5 overflow-hidden border-y border-[var(--border)]">
            <div className="animate-marquee items-center">
                {[1, 2, 3, 4].map(i => (
                    <React.Fragment key={i}>
                        <span className="text-4xl md:text-6xl font-serif italic px-8 whitespace-nowrap">Timeless Elegance</span>
                        <Sparkles size={24} className="text-[var(--gold)]" />
                        <span className="text-4xl md:text-6xl font-serif px-8 whitespace-nowrap">Uncompromising Quality</span>
                        <Sparkles size={24} className="text-[var(--gold)]" />
                        <span className="text-4xl md:text-6xl font-serif italic px-8 whitespace-nowrap">Modern Silhouette</span>
                        <Sparkles size={24} className="text-[var(--gold)]" />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
