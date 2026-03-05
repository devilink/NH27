'use client';

import { useStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ParallaxFeature() {
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <section className="py-32 relative overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--bg-secondary)] skew-x-12 translate-x-32 z-0"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="font-sans text-xs tracking-[0.3em] uppercase font-bold text-[var(--text-secondary)]">Craftsmanship</span>
                    <h2 className="font-serif text-6xl md:text-8xl mt-6 mb-8 leading-none">Rare & <br /><span className="italic text-[var(--text-secondary)]">Exceptional</span></h2>
                    <p className="font-sans text-sm leading-8 text-[var(--text-secondary)] mb-10 max-w-md">
                        We traverse the globe to source materials that define luxury. From Vicuña wool in the Andes to full-grain cordovan leather from Chicago, every fiber tells a story of resilience and grace.
                    </p>
                    <Link href="/about" {...withCursor()} className="inline-block px-10 py-5 border border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-500 uppercase text-xs tracking-[0.2em] font-medium">
                        Read The Journal
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative mt-12 md:mt-0"
                >
                    <div className="relative z-10 w-[80%] aspect-[3/4] bg-[var(--bg-tertiary)] shadow-2xl overflow-hidden group">
                        <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" alt="Fabric" />
                    </div>
                    <div className="absolute top-1/2 -right-4 md:-right-12 w-[60%] aspect-square bg-[var(--text-primary)] z-20 shadow-2xl p-3 transform -translate-y-1/2 group overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1599012307530-d163bd04ecab?q=80&w=687&auto=format&fit=crop" fill className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" alt="Leather" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
