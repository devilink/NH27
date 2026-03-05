import { getProductById, getRelatedProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductClientSide from './ProductClientSide';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.name,
        description: product.description || `Buy the exclusive ${product.name} from the ${product.category} collection at NH27 Outfits.`,
        openGraph: {
            title: `${product.name} | NH27 Outfits`,
            description: product.description || `Discover the ${product.name} at NH27 Outfits.`,
            images: [
                {
                    url: product.img,
                    width: 800,
                    height: 1000,
                    alt: product.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description || `Discover the ${product.name} at NH27 Outfits.`,
            images: [product.img],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    const relatedProducts = getRelatedProducts(product.category, product.id, 3);

    return (
        <ProductClientSide product={product} relatedProducts={relatedProducts} />
    );
}
