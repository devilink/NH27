import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop All Pieces',
    description: 'Explore our complete collection of bespoke watches, luxury shoes, and premium accessories. Silence over noise.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
