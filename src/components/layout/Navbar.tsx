'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const cartCount = useStore((state) => state.cartCount);
    const setIsCartOpen = useStore((state) => state.setIsCartOpen);
    const setCursorVariant = useStore((state) => state.setCursorVariant);
    const isMobileMenuOpen = useStore((state) => state.isMobileMenuOpen);
    const setIsMobileMenuOpen = useStore((state) => state.setIsMobileMenuOpen);

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isCartOpen = useStore((state) => state.isCartOpen);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Hide on scroll down
                setIsVisible(false);
            } else {
                // Show on scroll up
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Lock body scroll when mobile menu or cart is open
    useEffect(() => {
        if (isMobileMenuOpen || isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen, isCartOpen]);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    return (
        <>
            <nav className={`fixed w-full z-[60] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 transform ${(!isVisible && !isMobileMenuOpen) ? '-translate-y-full' : 'translate-y-0'} ${isScrolled ? 'bg-[var(--bg-primary)]/80 backdrop-blur-md py-4 border-b border-[var(--border)]' : 'bg-transparent'}`}>
                <Link href="/" {...withCursor()} className="font-serif text-2xl font-bold tracking-widest text-[var(--text-primary)]">NH27 Outfits</Link>

                <div className="hidden md:flex space-x-12 font-sans text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)]">
                    <Link href="/shop" {...withCursor()} className="hover:text-[var(--gold)] transition-colors">Shop</Link>
                    <Link href="/category" {...withCursor()} className="hover:text-[var(--gold)] transition-colors">Categories</Link>
                    <Link href="/about" {...withCursor()} className="hover:text-[var(--gold)] transition-colors">About</Link>
                </div>

                <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button {...withCursor()} className="text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors text-xs tracking-[0.2em] uppercase font-sans">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-8 h-8",
                                }
                            }}
                        />
                    </SignedIn>
                    <button onClick={() => setIsCartOpen(true)} {...withCursor()} className="relative text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--gold)] text-black text-[10px] flex items-center justify-center rounded-full font-sans font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        {...withCursor()}
                        className="md:hidden group flex flex-col gap-1.5 items-end ml-4"
                    >
                        <span className="w-8 h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover:w-4"></span>
                        <span className="w-8 h-[1px] bg-[var(--text-primary)]"></span>
                        <span className="w-8 h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover:w-6"></span>
                    </button>
                </div>

            </nav>

            {/* FULL SCREEN MOBILE MENU */}
            <div className={`fixed inset-0 h-[100dvh] bg-[var(--bg-primary)] z-[100] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col px-6 py-8 md:hidden ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}`}>
                <div className="flex justify-between items-center w-full mb-16">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-2xl font-bold tracking-widest text-[var(--text-primary)]">NH27 Outfits</Link>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors">
                        <X size={28} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex flex-col gap-8 items-center justify-center flex-1">
                    <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl hover:text-[var(--gold)] transition-colors">Shop</Link>
                    <Link href="/category" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl hover:text-[var(--gold)] transition-colors">Categories</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl hover:text-[var(--gold)] transition-colors">About</Link>
                </div>
            </div>
        </>
    );
}
