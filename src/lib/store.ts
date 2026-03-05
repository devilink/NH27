import { create } from 'zustand';
import { products } from './data';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    img: string; // Keep as primary/main image
    images?: string[]; // Optional array of additional images
    description?: string; // Product description
    stock?: number; // Available inventory count
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

    // Wishlist State
    wishlistItems: Product[];
    toggleWishlist: (product: Product) => void;
    wishlistCount: number;

    // Mobile Menu State
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    addToCart: (product: Product) => void;
    updateQty: (id: string, delta: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;

    // Admin State
    inventory: Product[]; // Unified state for static + dynamic products
    addProduct: (product: Product) => void;
    updateProduct: (id: string, data: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    allProducts: Product[]; // Getter for backward compatibility
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
    wishlistItems: [],
    // Initialize unified inventory with static products, giving them a default stock of 10
    inventory: products.map(p => ({ ...p, stock: 10 })),

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
    },

    get wishlistCount() {
        return get().wishlistItems.length;
    },

    toggleWishlist: (product) => {
        set((state) => {
            const exists = state.wishlistItems.some(item => item.id === product.id);
            if (exists) {
                return {
                    wishlistItems: state.wishlistItems.filter(item => item.id !== product.id)
                };
            }
            return {
                wishlistItems: [...state.wishlistItems, product]
            };
        });
    },

    addProduct: (product) => {
        set((state) => ({
            inventory: [...state.inventory, product]
        }));
    },

    updateProduct: (id, data) => {
        set((state) => ({
            inventory: state.inventory.map(p => p.id === id ? { ...p, ...data } : p)
        }));
    },

    deleteProduct: (id) => {
        set((state) => ({
            inventory: state.inventory.filter(p => p.id !== id)
        }));
    },

    get allProducts() {
        return get().inventory;
    }
}));
