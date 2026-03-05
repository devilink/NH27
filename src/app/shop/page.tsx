'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/data';
import { useStore, Product } from '@/lib/store';
import { Search, Plus, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopPage() {
    const addToCart = useStore((state) => state.addToCart);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // Assuming newer products have higher id numbers or last in the array
                result.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'bestsale':
                // Mock bestselling by just using the default order but slightly shifted
                result.sort((a, b) => a.id.localeCompare(b.id));
                break;
            default:
                break;
        }

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen text-[var(--text-primary)]">
            <header className="mb-16 text-center reveal opacity-100 translate-y-0">
                <h1 className="font-serif text-5xl md:text-7xl mb-4">The <span className="italic text-[var(--text-secondary)]">Shop</span></h1>
                <p className="font-sans text-sm text-[var(--text-secondary)] tracking-widest uppercase">Curated essentials and luxurious pieces.</p>
            </header>

            {/* Filters & Search Bar */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-y border-[var(--border)] py-6">

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search collection..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--gold)] outline-none py-2 pl-8 font-sans text-sm transition-colors"
                    />
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
                </div>

                {/* Categories Desktop */}
                <div className="hidden md:flex flex-wrap gap-8 font-sans text-xs tracking-widest uppercase">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`transition-colors pb-1 border-b-2 ${selectedCategory === cat ? 'border-[var(--gold)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sort & Mobile Filter Toggle */}
                <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-4">
                    <button
                        className="md:hidden flex items-center gap-2 font-sans text-xs tracking-widest uppercase"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <SlidersHorizontal size={14} />
                        Filters
                    </button>

                    <div className="relative group">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-transparent border-none outline-none font-sans text-xs tracking-widest uppercase cursor-pointer pr-6 text-[var(--text-primary)]"
                        >
                            <option value="newest" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">New Arrivals</option>
                            <option value="bestsale" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">Best Sellers</option>
                            <option value="price-desc" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">Price: High to Low</option>
                            <option value="price-asc" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">Price: Low to High</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)]" />
                    </div>
                </div>
            </div>

            {/* Mobile Categories Dropdown */}
            {isFilterOpen && (
                <div className="md:hidden flex flex-wrap gap-4 font-sans text-xs tracking-widest uppercase mb-8 pb-8 border-b border-[var(--border)]">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 border ${selectedCategory === cat ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-[var(--border)] text-[var(--text-secondary)]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {filteredAndSortedProducts.map((item: Product, idx: number) => (
                        <div key={item.id} className="group relative cursor-pointer" {...withCursor('big')}>
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
                                        <h4 className="font-serif text-2xl md:text-3xl mb-2 text-white">{item.name}</h4>
                                        <p className="font-sans text-sm text-gray-300">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center">
                    <h3 className="font-serif text-3xl mb-4 text-[var(--text-secondary)]">No pieces found</h3>
                    <p className="font-sans text-sm text-[var(--text-secondary)] tracking-widest uppercase">Try adjusting your filters</p>
                </div>
            )}
        </div>
    );
}
