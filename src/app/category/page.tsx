'use client';

import { products } from '@/lib/data';
import { useStore, Product } from '@/lib/store';
import { ShoppingBag, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopPage() {
    const addToCart = useStore((state) => state.addToCart);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen text-[var(--text-primary)]">
            <header className="mb-16 text-center reveal opacity-100 translate-y-0">
                <h1 className="font-serif text-5xl md:text-7xl mb-4">The <span className="italic text-[var(--text-secondary)]">Collection</span></h1>
                <p className="font-sans text-sm text-[var(--text-secondary)] tracking-widest uppercase">Every piece is an investment in character.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((item: Product, idx: number) => (
                    <div key={item.id} className="group relative cursor-pointer" {...withCursor('big')} style={{ animationDelay: `${idx * 0.1}s` }}>
                        <Link href={`/product/${item.id}`} className="block">
                            <div className="bg-[var(--bg-secondary)] aspect-[4/5] overflow-hidden relative">
                                <Image src={item.img} fill className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt={item.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(item); }}
                                    className="absolute top-6 right-6 w-12 h-12 bg-[var(--glass-bg)] backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--gold)] text-white hover:text-black z-20"
                                >
                                    <Plus size={20} />
                                </button>

                                <div className="absolute bottom-8 left-8 pointer-events-none">
                                    <p className="font-sans text-xs text-[var(--gold)] uppercase tracking-widest mb-2">{item.category}</p>
                                    <h4 className="font-serif text-3xl mb-2 text-white">{item.name}</h4>
                                    <p className="font-sans text-sm text-gray-300">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
