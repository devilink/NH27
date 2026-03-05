'use client';

import { useStore, Product } from '@/lib/store';
import { ShoppingBag, X, HeartCrack } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
    const wishlistItems = useStore((state) => state.wishlistItems);
    const toggleWishlist = useStore((state) => state.toggleWishlist);
    const addToCart = useStore((state) => state.addToCart);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen text-[var(--text-primary)]">
            <header className="mb-16 text-center reveal opacity-100 translate-y-0">
                <h1 className="font-serif text-5xl md:text-7xl mb-4">Your <span className="italic text-[var(--text-secondary)]">Wishlist</span></h1>
                <p className="font-sans text-sm text-[var(--text-secondary)] tracking-widest uppercase">Curated pieces for your collection.</p>
            </header>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <HeartCrack size={64} className="text-[var(--text-secondary)] mb-6 opacity-30" strokeWidth={1} />
                    <h2 className="font-serif text-3xl mb-4">Your Wishlist is Empty</h2>
                    <p className="font-sans text-[var(--text-secondary)] mb-8 max-w-md">
                        You haven't added any pieces to your wishlist yet. Explore our collection to find your next investment.
                    </p>
                    <Link
                        href="/shop"
                        {...withCursor()}
                        className="border border-[var(--border)] px-8 py-4 uppercase font-sans text-xs tracking-[0.2em] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
                    >
                        Explore Collection
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wishlistItems.map((item: Product, idx: number) => (
                        <div key={item.id} className="group relative cursor-pointer" {...withCursor('big')} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <Link href={`/product/${item.id}`} className="block">
                                <div className="bg-[var(--bg-secondary)] aspect-[4/5] overflow-hidden relative">
                                    <Image src={item.img} fill className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt={item.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                                    {/* Remove from wishlist */}
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(item); }}
                                        className="absolute top-6 right-6 w-12 h-12 bg-[var(--glass-bg)] backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black text-[var(--text-primary)] z-20 hover:scale-110"
                                        title="Remove from Wishlist"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="absolute bottom-8 left-8 pointer-events-none">
                                        <p className="font-sans text-xs text-[var(--gold)] uppercase tracking-widest mb-2">{item.category}</p>
                                        <h4 className="font-serif text-3xl mb-2 text-white">{item.name}</h4>
                                        <div className="flex items-center gap-4">
                                            <p className="font-sans text-sm text-gray-300">${item.price.toFixed(2)}</p>

                                            {/* Quick Add to Cart from wishlist */}
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(item); }}
                                                className="pointer-events-auto flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--gold)] hover:text-white transition-colors"
                                            >
                                                <ShoppingBag size={14} />
                                                <span>Add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
