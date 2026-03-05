'use client';

import { X, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Image from 'next/image';

export default function CartDrawer() {
    const isCartOpen = useStore((state) => state.isCartOpen);
    const setIsCartOpen = useStore((state) => state.setIsCartOpen);
    const cartItems = useStore((state) => state.cartItems);
    const updateQty = useStore((state) => state.updateQty);
    const cartTotal = useStore((state) => state.cartTotal);
    const clearCart = useStore((state) => state.clearCart);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    const router = useRouter();

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    const handleCheckout = () => {
        setIsCartOpen(false);
        clearCart();
        router.push('/success');
    };

    return (
        <>
            {/* CART DRAWER */}
            <div className={`fixed inset-y-0 right-0 h-[100dvh] w-full md:w-[400px] bg-[var(--bg-secondary)] text-[var(--text-primary)] z-[80] border-l border-[var(--border)] p-6 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-10 mt-12 md:mt-20">
                    <h2 className="font-serif text-3xl">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} {...withCursor()} className="p-2 hover:text-[var(--gold)] transition-colors"><X size={24} /></button>
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-6">
                    {cartItems.length === 0 ? (
                        <div className="text-[var(--text-secondary)] font-sans text-sm tracking-widest uppercase text-center mt-20">Your cart is empty</div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 bg-[var(--bg-tertiary)] p-4 rounded-sm">
                                <div className="relative w-20 h-24 shrink-0">
                                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <h4 className="font-serif text-xl line-clamp-1">{item.name}</h4>
                                        <p className="font-sans text-xs text-[var(--gold)]">${item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <button onClick={() => updateQty(item.id, -1)} {...withCursor()}><Minus size={14} /></button>
                                        <span className="font-sans text-sm">{item.qty}</span>
                                        <button onClick={() => updateQty(item.id, 1)} {...withCursor()}><Plus size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="pt-6 border-t border-[var(--border)] mt-6">
                        <div className="flex justify-between items-center mb-6 font-sans">
                            <span className="text-sm text-[var(--text-secondary)] uppercase tracking-widest">Subtotal</span>
                            <span className="text-xl text-[var(--text-primary)] font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckout} {...withCursor()} className="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-sans text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[var(--gold)] hover:text-white transition-colors">
                            Checkout Securely
                        </button>
                    </div>
                )}
            </div>

            {/* OVERLAY FOR CART */}
            {isCartOpen && <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[70] transition-opacity" onClick={() => setIsCartOpen(false)} />}
        </>
    );
}
