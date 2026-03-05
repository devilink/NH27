'use client';

import { useRef } from 'react';
import { useStore } from '@/lib/store';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { motion } from 'framer-motion';

export default function HorizontalCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const addToCart = useStore(state => state.addToCart);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    const scrollCarousel = (dir: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 400 : 300;
            carouselRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-32 bg-[var(--bg-primary)] overflow-hidden">
            <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end max-w-[1400px] mx-auto gap-6 text-[var(--text-primary)]">
                <h2 className="font-serif text-5xl md:text-6xl">New Arrivals</h2>
                <div className="flex gap-4">
                    <button onClick={() => scrollCarousel('left')} {...withCursor()} className="w-14 h-14 border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"><ArrowLeft strokeWidth={1} /></button>
                    <button onClick={() => scrollCarousel('right')} {...withCursor()} className="w-14 h-14 border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"><ArrowRight strokeWidth={1} /></button>
                </div>
            </div>

            <div
                ref={carouselRef}
                className="flex space-x-8 px-6 md:px-12 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory"
            >
                {products.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: Math.min(idx * 0.1, 0.5) }}
                        className="min-w-[320px] md:min-w-[420px] snap-center group relative cursor-pointer"
                        {...withCursor('big')}
                    >
                        <div className="bg-[var(--bg-secondary)] aspect-[4/5] overflow-hidden relative">
                            <Image src={item.img} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt={item.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                            <button
                                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--gold)] text-white hover:text-black z-20"
                            >
                                <Plus size={20} />
                            </button>

                            <div className="absolute bottom-8 left-8 pointer-events-none text-white">
                                <p className="font-sans text-xs text-[var(--gold)] uppercase tracking-widest mb-2">{item.category}</p>
                                <h4 className="font-serif text-3xl mb-2">{item.name}</h4>
                                <p className="font-sans text-sm text-gray-300">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
