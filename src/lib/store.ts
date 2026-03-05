import { create } from 'zustand';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    img: string;
}

export interface CartItem extends Product {
    qty: number;
}

interface AppState {
    // UI State
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    cursorVariant: string;
    setCursorVariant: (variant: string) => void;

    // Cart State
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    cartItems: CartItem[];

    // Mobile Menu State
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    addToCart: (product: Product) => void;
    updateQty: (id: string, delta: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

export const useStore = create<AppState>((set, get) => ({
    isLoading: true,
    setIsLoading: (loading) => set({ isLoading: loading }),

    cursorVariant: 'default',
    setCursorVariant: (variant) => set({ cursorVariant: variant }),

    isCartOpen: false,
    setIsCartOpen: (open) => set({ isCartOpen: open }),

    isMobileMenuOpen: false,
    setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

    cartItems: [],

    addToCart: (product) => {
        set((state) => {
            const existing = state.cartItems.find(item => item.id === product.id);
            if (existing) {
                return {
                    cartItems: state.cartItems.map(item =>
                        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                    )
                };
            }
            return {
                cartItems: [...state.cartItems, { ...product, qty: 1 }]
            };
        });
        get().setIsCartOpen(true);
    },

    updateQty: (id, delta) => {
        set((state) => ({
            cartItems: state.cartItems.map(item => {
                if (item.id === id) return { ...item, qty: Math.max(0, item.qty + delta) };
                return item;
            }).filter(item => item.qty > 0)
        }));
    },

    clearCart: () => set({ cartItems: [] }),

    get cartTotal() {
        return get().cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    get cartCount() {
        return get().cartItems.reduce((sum, item) => sum + item.qty, 0);
    }
}));
