'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export default function Loader() {
    const isLoading = useStore((state) => state.isLoading);
    const setIsLoading = useStore((state) => state.setIsLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1800);
        return () => clearTimeout(timer);
    }, [setIsLoading]);

    return (
        <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${isLoading ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="text-center">
                <h1 className="font-serif text-5xl italic text-white tracking-widest animate-pulse">NH27 Outfits</h1>
                <div className="w-40 h-[1px] bg-white/20 mt-6 mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-white w-full h-full -translate-x-full animate-[marquee_1s_linear_infinite]"></div>
                </div>
            </div>
        </div>
    );
}
