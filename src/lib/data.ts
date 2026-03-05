import { Product } from './store';

export const products: Product[] = [
    { id: 'prod_1', name: "Oud Wood Intense", category: "Fragrance", price: 240, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2787&auto=format&fit=crop" },
    { id: 'prod_2', name: "Aviator Gold", category: "Accessories", price: 420, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=3000&auto=format&fit=crop" },
    { id: 'prod_3', name: "Sneaker Low", category: "Footwear", price: 350, img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop" },
    { id: 'prod_4', name: "Chelsea Boot", category: "Footwear", price: 480, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2912&auto=format&fit=crop" },
    { id: 'prod_5', name: 'The Midnight Caliber', category: 'Watch', price: 12500, img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2794&auto=format&fit=crop' },
    { id: 'prod_6', name: 'Oxford Noir', category: 'Shoes', price: 850, img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=2930&auto=format&fit=crop' },
    { id: 'prod_7', name: 'Cashmere Overcoat', category: 'Apparel', price: 1200, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2960&auto=format&fit=crop' }
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getRelatedProducts(category: string, excludeId: string, limit: number = 3): Product[] {
    return products
        .filter(p => p.category === category && p.id !== excludeId)
        .slice(0, limit);
}
