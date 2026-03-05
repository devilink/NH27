import { getProductById, getRelatedProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductClientSide from './ProductClientSide';

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
