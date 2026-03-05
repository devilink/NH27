import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Explore Categories',
    description: 'Browse the NH27 collection by category. From Italian calfskin footwear to precision chronographs.',
};

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
