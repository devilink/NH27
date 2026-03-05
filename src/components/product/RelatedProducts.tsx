'use client';

import { Product } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export default function RelatedProducts({ products }: { products: Product[] }) {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-24 border-t border-[var(--border)] mt-12">
            <h2 className="font-serif text-3xl md:text-5xl mb-12 text-center text-[var(--text-primary)]">
                You May Also <span className="italic text-[var(--gold)]">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col items-center">
                        <div className="relative aspect-[3/4] w-full mb-6 overflow-hidden bg-[var(--bg-secondary)]">
                            <Image
                                src={product.img}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                        <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold)] transition-colors text-center">{product.name}</h3>
                        <span className="font-sans text-sm tracking-[0.2em] text-[var(--text-secondary)] uppercase">{product.category}</span>
                        <span className="font-sans text-sm mt-2 text-[var(--text-primary)]">${product.price.toFixed(2)}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
