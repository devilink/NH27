'use client';

import Link from 'next/link';
import { Instagram, Twitter } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Footer() {
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <footer className="bg-[var(--bg-secondary)] text-[var(--text-primary)] pt-32 pb-10 border-t border-[var(--border)] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
                    <div className="md:col-span-2">
                        <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Join the <br /><span className="italic text-[var(--text-secondary)]">Inner Circle.</span></h2>
                        <div className="relative max-w-md group">
                            <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[var(--border)] py-4 focus:outline-none focus:border-[var(--text-primary)] transition-colors text-lg placeholder-[var(--text-secondary)] font-serif" />
                            <button {...withCursor()} className="absolute right-0 top-1/2 -translate-y-1/2 uppercase font-sans text-xs tracking-widest hover:text-[var(--gold)] transition-colors">Subscribe</button>
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-500 group-focus-within:w-full"></span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-8">Collections</h4>
                        <ul className="space-y-4 font-serif text-xl text-[var(--text-primary)]">
                            <li><Link href="/shop" {...withCursor()} className="hover:text-[var(--gold)] hover:translate-x-2 inline-block transition-all">New Arrivals</Link></li>
                            <li><Link href="/shop" {...withCursor()} className="hover:text-[var(--gold)] hover:translate-x-2 inline-block transition-all">Timepieces</Link></li>
                            <li><Link href="/shop" {...withCursor()} className="hover:text-[var(--gold)] hover:translate-x-2 inline-block transition-all">Tailoring</Link></li>
                            <li><Link href="/shop" {...withCursor()} className="hover:text-[var(--gold)] hover:translate-x-2 inline-block transition-all">Leather Goods</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-8">Studio</h4>
                        <ul className="space-y-4 font-serif text-xl text-[var(--text-primary)]">
                            <li><Link href="/about" {...withCursor()} className="hover:text-[var(--gold)] hover:translate-x-2 inline-block transition-all">Our Story</Link></li>
                            <li><Link href="/about" {...withCursor()} className="hover:text-[var(--gold)] hover:translate-x-2 inline-block transition-all">Ateliers</Link></li>
                            <li><Link href="/about" {...withCursor()} className="hover:text-[var(--gold)] hover:translate-x-2 inline-block transition-all">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-[var(--border)]">
                    <p className="font-sans text-xs text-[var(--text-secondary)] tracking-widest uppercase">© 2026 NH27 Outfits. All Rights Reserved.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <Link href="#" {...withCursor()} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><Instagram size={20} /></Link>
                        <Link href="#" {...withCursor()} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><Twitter size={20} /></Link>
                    </div>
                </div>
            </div>

            {/* Giant BG Text */}
            <h1 className="font-serif text-[15vw] leading-none text-black/5 dark:text-white/[0.02] select-none absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none whitespace-nowrap font-bold text-center w-full">NH27 Outfits</h1>
        </footer>
    );
}
