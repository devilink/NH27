'use client';

import { Watch, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BentoGrid() {
    const addToCart = useStore((state) => state.addToCart);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <section id="collection" className="py-32 px-6 md:px-12 bg-transparent relative">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-20"
                >
                    <h2 className="font-serif text-5xl md:text-7xl text-[var(--text-primary)]">Curated <br /><span className="italic text-[var(--text-secondary)]">Essentials</span></h2>
                    <p className="font-sans text-sm text-[var(--text-secondary)] max-w-sm mt-6 md:mt-0 leading-loose">
                        Designed for the modern gentleman who values precision, texture, and silence over noise. Every piece is an investment in character.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    {/* Big Left Item */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="md:col-span-7"
                    >
                        <div className="relative w-full h-[600px] bg-[var(--bg-secondary)] overflow-hidden group">
                            <Image src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2794&auto=format&fit=crop" alt="Watch" fill className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                            <div className="absolute top-6 right-6 backdrop-blur-md bg-[var(--glass-bg)] border border-[var(--border)] p-4 rounded-full">
                                <Watch size={24} className="text-[var(--text-inverse)] dark:text-white" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 text-white">
                                    <span className="font-sans text-xs tracking-widest text-[var(--gold)] uppercase">Chronograph</span>
                                    <h3 className="font-serif text-4xl mt-2 mb-4">The Midnight Caliber</h3>
                                    <div className="flex justify-between items-center pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <span className="font-sans text-lg">$12,500</span>
                                        <button
                                            onClick={() => addToCart({ id: 'prod_5', name: 'The Midnight Caliber', category: 'Watch', price: 12500, img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2794&auto=format&fit=crop' })}
                                            {...withCursor()}
                                            className="text-xs uppercase tracking-widest border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Small Right Top + Quote */}
                    <div className="md:col-span-5 flex flex-col gap-8 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full h-[400px] bg-[var(--bg-secondary)] overflow-hidden relative group"
                        >
                            <Image src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=2930&auto=format&fit=crop" alt="Shoes" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent text-white"></div>
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h3 className="font-serif text-3xl italic mb-1">Oxford Noir</h3>
                                <div className="flex justify-between items-center">
                                    <p className="font-sans text-xs text-gray-400 tracking-widest uppercase">Italian Calfskin</p>
                                    <button onClick={() => addToCart({ id: 'prod_6', name: 'Oxford Noir', category: 'Shoes', price: 850, img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=2930&auto=format&fit=crop' })} {...withCursor()} className="text-white hover:text-[var(--gold)]"><ShoppingBag size={20} /></button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="p-10 border border-[var(--border)] backdrop-blur-sm bg-[var(--glass-bg)] flex-1 flex flex-col justify-center"
                        >
                            <Sparkles className="text-[var(--gold)] mb-6" size={32} />
                            <p className="font-serif text-2xl leading-relaxed italic text-[var(--text-secondary)]">
                                &quot;Style is a way to say who you are without having to speak. It is the silent architecture of your presence.&quot;
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
