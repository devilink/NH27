import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
        title: `${capitalizedSlug} Collection`,
        description: `Explore our exclusive collection of luxury ${capitalizedSlug}. Tailored for the modern gentleman.`,
        openGraph: {
            title: `${capitalizedSlug} Collection | NH27 Outfits`,
            description: `Explore our exclusive collection of luxury ${capitalizedSlug}. Tailored for the modern gentleman.`,
        }
    };
}

export default function CategorySlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
