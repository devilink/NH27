'use client';

import { useStore, Product } from '@/lib/store';
import { ShoppingBag, Plus, Heart, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export default function CategoryDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const addToCart = useStore((state) => state.addToCart);
    const wishlistItems = useStore((state) => state.wishlistItems);
    const toggleWishlist = useStore((state) => state.toggleWishlist);
    const setCursorVariant = useStore((state) => state.setCursorVariant);
    const allProducts = useStore((state) => state.allProducts);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    const resolvedParams = use(params);
    const categorySlug = resolvedParams.slug.toLowerCase();
    const categoryProducts = allProducts.filter(p => p.category.toLowerCase() === categorySlug);
    const categoryName = categoryProducts.length > 0 ? categoryProducts[0].category : resolvedParams.slug;

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen text-[var(--text-primary)]">
            <Link
                href="/category"
                {...withCursor()}
                className="inline-flex items-center gap-2 mb-8 font-sans text-xs tracking-[0.2em] uppercase hover:text-[var(--gold)] transition-colors"
            >
                <ArrowLeft size={16} />
                <span>Back to Categories</span>
            </Link>

            <header className="mb-16 text-center reveal opacity-100 translate-y-0">
                <h1 className="font-serif text-5xl md:text-7xl mb-4"><span className="italic text-[var(--text-secondary)]">{categoryName}</span></h1>
                <p className="font-sans text-sm text-[var(--text-secondary)] tracking-widest uppercase">{categoryProducts.length} {categoryProducts.length === 1 ? 'Piece' : 'Pieces'}</p>
            </header>

            {categoryProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="font-serif text-2xl text-[var(--text-secondary)]">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.map((item: Product, idx: number) => (
                        <div key={item.id} className="group relative cursor-pointer" {...withCursor('big')} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <Link href={`/product/${item.id}`} className="block">
                                <div className="bg-[var(--bg-secondary)] aspect-[4/5] overflow-hidden relative">
                                    <Image src={item.img} fill className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt={item.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(item); }}
                                        className={`absolute top-6 right-20 w-12 h-12 bg-[var(--glass-bg)] backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20 hover:scale-110 ${wishlistItems.some(w => w.id === item.id) ? 'text-red-500' : 'text-white hover:text-red-500'}`}
                                    >
                                        <Heart size={20} className={wishlistItems.some(w => w.id === item.id) ? "fill-current" : ""} />
                                    </button>
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
            )}
        </div>
    );
}
