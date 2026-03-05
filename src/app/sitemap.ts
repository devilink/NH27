import { MetadataRoute } from 'next';
import { products } from '@/lib/data';

const DOMAIN = 'https://nh27-outfits.com'; // Change to actual production domain later

export default function sitemap(): MetadataRoute.Sitemap {

    // Static routes
    const staticRoutes = [
        {
            url: `${DOMAIN}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${DOMAIN}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${DOMAIN}/category`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${DOMAIN}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ];

    // Dynamic Product routes
    const productRoutes = products.map((product) => ({
        url: `${DOMAIN}/product/${product.id}`,
        lastModified: new Date(), // Realistically this would come from the database 'updatedAt'
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic Category routes
    const uniqueCategories = Array.from(new Set(products.map(p => p.category.toLowerCase())));
    const categoryRoutes = uniqueCategories.map((catSlug) => ({
        url: `${DOMAIN}/category/${catSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
