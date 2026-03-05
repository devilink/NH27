'use client';

import { Product, useStore } from '@/lib/store';
import { ShoppingBag, Star, ShieldCheck, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import RelatedProducts from '@/components/product/RelatedProducts';
import { useEffect, useState } from 'react';

export default function ProductClientSide({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const addToCart = useStore((state) => state.addToCart);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    // Simple mount animation state
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                {/* Product Image */}
                <div className="relative aspect-[4/5] bg-[var(--bg-secondary)] overflow-hidden group w-full max-h-[80vh]">
                    <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center h-full xl:pr-12">
                    <div className="mb-6 flex items-center justify-between">
                        <span className="font-sans text-xs tracking-[0.3em] text-[var(--gold)] uppercase">{product.category}</span>
                        <span className="font-sans text-xs text-[var(--text-secondary)] tracking-widest uppercase">ID: {product.id}</span>
                    </div>

                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] text-[var(--text-primary)]">{product.name}</h1>

                    <div className="flex items-center gap-6 mb-10 pb-10 border-b border-[var(--border)]">
                        <span className="font-sans text-3xl text-[var(--text-primary)]">${product.price.toFixed(2)}</span>
                        <div className="flex text-[var(--gold)] gap-1">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                    </div>

                    <div className="space-y-6 font-sans text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-12">
                        <p>
                            Meticulously crafted to perfection, the {product.name} embodies the zenith of modern luxury.
                            Designed for individuals who appreciate silence over noise, this piece stands as a testament
                            to uncompromising quality and timeless elegance.
                        </p>
                        <p>
                            Every detail, from the material selection to the final polish, is executed with absolute precision
                            by master artisans.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-12 bg-[var(--bg-secondary)] p-8 rounded-sm">
                        <div className="flex flex-col items-center text-center gap-3">
                            <ShieldCheck className="text-[var(--gold)]" size={28} strokeWidth={1.5} />
                            <div>
                                <h4 className="font-sans text-xs uppercase tracking-widest text-[var(--text-primary)] mb-1">Authenticity</h4>
                                <p className="font-sans text-xs text-[var(--text-secondary)]">Certified Original</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <RefreshCcw className="text-[var(--gold)]" size={28} strokeWidth={1.5} />
                            <div>
                                <h4 className="font-sans text-xs uppercase tracking-widest text-[var(--text-primary)] mb-1">Returns</h4>
                                <p className="font-sans text-xs text-[var(--text-secondary)]">30-Day Guarantee</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        {...withCursor('big')}
                        className="w-full flex items-center justify-center gap-4 bg-[var(--text-primary)] text-[var(--bg-primary)] py-5 uppercase font-sans text-sm tracking-[0.2em] hover:bg-[var(--gold)] transition-colors group"
                    >
                        <ShoppingBag size={20} className="group-hover:-translate-y-1 transition-transform" />
                        <span className="font-bold">Add To Collection</span>
                    </button>

                    <div className="mt-8 text-center">
                        <span className="font-sans text-xs text-[var(--text-secondary)] tracking-widest uppercase block mb-2">Complimentary Global Shipping</span>
                        <span className="font-sans text-[10px] text-[var(--text-secondary)] opacity-60">Delivered within 3-5 business days</span>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <RelatedProducts products={relatedProducts} />
        </div>
    );
}

