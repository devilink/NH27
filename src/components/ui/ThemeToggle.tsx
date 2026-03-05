'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useStore } from '@/lib/store';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const setCursorVariant = useStore((state) => state.setCursorVariant);
    const [mounted, setMounted] = React.useState(false);

    // Prevent hydration mismatch by only rendering after mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const withCursor = (variant = 'big') => ({
        onMouseEnter: () => setCursorVariant(variant),
        onMouseLeave: () => setCursorVariant('default')
    });

    if (!mounted) {
        return <div className="w-5 h-5 mx-2" />; // Placeholder of same size
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            {...withCursor()}
            className="relative text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors p-1"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun size={20} strokeWidth={1.5} />
            ) : (
                <Moon size={20} strokeWidth={1.5} />
            )}
        </button>
    );
}
