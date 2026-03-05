'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 text-[var(--text-primary)]">
            <div className="text-center max-w-lg">
                <CheckCircle className="w-20 h-20 text-[var(--gold)] mx-auto mb-8 animate-float" />
                <h1 className="font-serif text-5xl md:text-6xl mb-6">Order <span className="italic text-[var(--text-secondary)]">Confirmed</span></h1>
                <p className="font-sans text-[var(--text-secondary)] mb-10 leading-loose">
                    Thank you for your purchase. Your order has been securely processed and is now being prepared in our ateliers. A confirmation email with tracking details will be sent shortly.
                </p>
                <Link href="/" className="inline-block px-10 py-5 border border-[var(--border)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-500 font-sans text-xs uppercase tracking-widest">
                    Return to Collection
                </Link>
            </div>
        </div>
    );
}
