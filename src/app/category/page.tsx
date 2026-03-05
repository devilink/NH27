'use client';

import { useStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryIndexPage() {
    const setCursorVariant = useStore((state) => state.setCursorVariant);
    const allProducts = useStore((state) => state.allProducts);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    // Get unique categories and an image for each
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
    const categoriesDisplay = uniqueCategories.map(cat => {
        const product = allProducts.find(p => p.category === cat);
        return {
            name: cat,
            img: product?.img || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2938&auto=format&fit=crop', // default if not found
            count: allProducts.filter(p => p.category === cat).length,
            slug: cat.toLowerCase()
        };
    });

    return (
        <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen text-[var(--text-primary)]">
            <header className="mb-16 text-center reveal opacity-100 translate-y-0">
                <h1 className="font-serif text-5xl md:text-7xl mb-4">Explore by <span className="italic text-[var(--text-secondary)]">Category</span></h1>
                <p className="font-sans text-sm text-[var(--text-secondary)] tracking-widest uppercase">Find pieces tailored to your style.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left" aria-label="Collections by Category">
                {categoriesDisplay.map((cat, idx) => (
                    <div key={cat.slug} className="group relative cursor-pointer" {...withCursor('big')} style={{ animationDelay: `${idx * 0.1}s` }}>
                        <Link href={`/category/${cat.slug}`} className="block">
                            <div className="bg-[var(--bg-secondary)] aspect-[4/5] overflow-hidden relative">
                                <Image src={cat.img} fill className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0" alt={cat.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-80 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"></div>

                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8 text-center text-white">
                                    <h4 className="font-serif text-4xl mb-4 tracking-wider">{cat.name}</h4>
                                    <div className="w-12 h-[1px] bg-[var(--gold)] mb-4 transition-all duration-300 group-hover:w-24"></div>
                                    <p className="font-sans text-xs uppercase tracking-widest text-[var(--gold)]">{cat.count} {cat.count === 1 ? 'Piece' : 'Pieces'}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    );
}
