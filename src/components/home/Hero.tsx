'use client';

import { ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Abstract BG Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--text-secondary)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-float pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--gold)] rounded-full mix-blend-screen filter blur-[80px] opacity-10 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

            {/* Rotating Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[80vh] h-[80vh] border border-[var(--border)] rounded-full animate-spin-slow"></div>
                <div className="absolute w-[60vh] h-[60vh] border border-[var(--border)] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
            </div>

            <div className="relative z-10 text-center px-4 mt-20 pointer-events-none">
                <div className="pointer-events-auto inline-block">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="font-sans text-xs tracking-[0.4em] text-[var(--gold)] mb-6 uppercase"
                    >
                        Est. 2026 • Bespoke Luxury
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="font-serif text-6xl md:text-[9rem] text-[var(--text-primary)] leading-none mb-6 mix-blend-difference"
                    >
                        <span className="block italic font-light drop-shadow-md">The Art of</span>
                        <span className="block font-bold drop-shadow-md">Masculinity</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-12"
                    >
                        <Link href="/shop" {...withCursor()} className="group relative inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-[var(--text-primary)] mix-blend-difference">
                            <span className="relative z-10 hover:text-[var(--gold)] transition-colors font-bold drop-shadow-md">Explore Collection</span>
                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform drop-shadow-md" />
                            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[var(--gold)] origin-right transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 pointer-events-none">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase rotate-90 mb-4 text-[var(--text-primary)]">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--text-primary)] to-transparent"></div>
            </div>
        </section>
    );
}
