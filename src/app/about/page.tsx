'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function AboutPage() {
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)]">
            {/* HERO SECTION */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2940&auto=format&fit=crop"
                        alt="Atelier Background"
                        fill
                        className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-[2000ms]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-primary)]"></div>
                </div>

                <div className="relative z-10 text-center px-6 md:px-12 max-w-[1400px] mx-auto reveal opacity-100 translate-y-0 mt-20">
                    <span className="font-sans text-xs tracking-[0.4em] text-[var(--gold)] uppercase block mb-6 animate-pulse">Our Heritage</span>
                    <h1 className="font-serif text-6xl md:text-[8rem] lg:text-[10rem] mb-6 leading-[0.9] mix-blend-difference">
                        <span className="block italic text-[var(--text-secondary)] font-light">The Ateliers</span>
                        <span className="block font-bold">of NH27 Outfits</span>
                    </h1>
                    <div className="w-[1px] h-32 bg-gradient-to-b from-[var(--gold)] to-transparent mx-auto mt-12 animate-float"></div>
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section className="py-32 px-6 md:px-12 bg-[var(--bg-secondary)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)] mix-blend-screen opacity-5 filter blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-[1100px] mx-auto text-center relative z-10">
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-[var(--text-primary)] leading-tight mb-12">
                        &quot;True luxury is the absence of pretense. It is found in the weight of cold steel, the drape of heavy cashmere, and the quiet assurance of wearing something made perfectly.&quot;
                    </h2>
                    <span className="block font-sans text-xs tracking-[0.3em] text-[var(--text-secondary)] uppercase">— The Founder, 2026</span>
                </div>
            </section>

            {/* UNCOMPROMISING STANDARD (Left Text, Right Img Split) */}
            <section className="py-0 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto min-h-[800px]">
                <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-24 bg-[var(--bg-tertiary)] dark:bg-[#0a0a0px] relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
                    <div className="max-w-xl">
                        <span className="font-sans text-xs tracking-[0.3em] text-[var(--gold)] uppercase block mb-6">Chapter I</span>
                        <h2 className="font-serif text-5xl md:text-6xl mb-10 leading-none">Uncompromising <br /><span className="italic text-[var(--text-secondary)]">Standard</span></h2>
                        <div className="space-y-8 font-sans text-sm md:text-base text-[var(--text-secondary)] leading-loose">
                            <p>
                                Founded in 2026, NH27 Outfits represents a return to the absolute fundamentals of luxury. We eschew logos and loud branding in favor of impeccable fit, superior materials, and silent confidence.
                            </p>
                            <p>
                                Every garment is meticulously constructed by second-generation artisans in boutique ateliers across Italy and Switzerland. We believe that true elegance requires uncompromising standards—a dedication to the craft that simply cannot be rushed.
                            </p>
                            <p>
                                When you wear a piece from our collection, you are not merely wearing clothing; you are stepping into a legacy of craftsmanship that has been perfected over decades.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 relative h-[600px] lg:h-auto group overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1585487000160-b6a4ce38ed8f?q=80&w=2834&auto=format&fit=crop"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] opacity-90 group-hover:opacity-100"
                        alt="Craftsmanship"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>
            </section>

            {/* OUR DISCIPLINES (Masonry Layout) */}
            <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="text-center mb-24">
                    <h2 className="font-serif text-5xl md:text-7xl mb-6">Our <span className="italic text-[var(--text-secondary)]">Disciplines</span></h2>
                    <p className="font-sans text-sm text-[var(--text-secondary)] tracking-widest uppercase mb-8">The Pillars of NH27 Outfits</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

                    {/* Sartorial */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="relative aspect-[3/4] w-full overflow-hidden group">
                            <Image src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2960&auto=format&fit=crop" alt="Sartorial" fill className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                                <h3 className="font-serif text-3xl mb-2">Sartorial</h3>
                                <p className="font-sans text-xs tracking-widest text-[#d4af37] uppercase">Vicuña & Cashmere</p>
                            </div>
                        </div>
                    </div>

                    {/* Leather / Accessories (Smaller center tile) */}
                    <div className="md:col-span-3 space-y-6 md:-mt-32">
                        <div className="relative aspect-square w-full overflow-hidden group">
                            <Image src="https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=687&auto=format&fit=crop" alt="Leather Goods" fill className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none p-6 text-center">
                                <h3 className="font-serif text-2xl mb-2">Leather</h3>
                                <p className="font-sans text-[10px] tracking-widest text-[#d4af37] uppercase">Cordovan & Calfskin</p>
                            </div>
                        </div>
                    </div>

                    {/* Timepieces */}
                    <div className="md:col-span-4 space-y-6 md:mt-48">
                        <div className="relative aspect-auto h-[600px] w-full overflow-hidden group">
                            <Image src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2794&auto=format&fit=crop" alt="Timepieces" fill className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-8 right-8 text-white text-right pointer-events-none">
                                <h3 className="font-serif text-3xl mb-2">Timepieces</h3>
                                <p className="font-sans text-xs tracking-widest text-[#d4af37] uppercase">Precision Engineering</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FULL WIDTH IMAGE WITH PARALLAX EFFECT */}
            <section className="relative h-[80vh] w-full flex items-center justify-center group overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2940&auto=format&fit=crop"
                    alt="Elegance"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] brightness-50"
                />
                <div className="relative z-10 text-center text-white mix-blend-overlay">
                    <h2 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-widest">BESPOKE</h2>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 px-6 text-center bg-[var(--bg-primary)]">
                <h2 className="font-serif text-4xl md:text-5xl mb-12">Begin Your <span className="italic text-[var(--gold)]">Journey</span></h2>
                <Link href="/shop" {...withCursor()} className="group relative inline-flex items-center gap-4 font-sans text-sm tracking-[0.2em] uppercase text-[var(--text-primary)]">
                    <span className="relative z-10 transition-colors font-bold group-hover:text-[var(--gold)]">Explore The Collection</span>
                    <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform text-[var(--gold)]" />
                    <span className="absolute -bottom-3 left-0 w-full h-[1px] bg-[var(--gold)] origin-right transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left"></span>
                </Link>
            </section>
        </div>
    );
}
