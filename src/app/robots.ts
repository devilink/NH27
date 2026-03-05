import { MetadataRoute } from 'next';

const DOMAIN = 'https://nh27-outfits.com'; // Change to actual production domain later

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/admin/'],
        },
        sitemap: `${DOMAIN}/sitemap.xml`,
    };
}
