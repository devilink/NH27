import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    // Validate admin email
    const isAdmin = user?.emailAddresses.some(
        (email) => email.emailAddress === 'princedas000555@gmail.com'
    );

    if (!isAdmin) {
        redirect('/'); // Redirect unauthorized users to home
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                {children}
            </div>
        </div>
    );
}
