import type { Metadata } from 'next';
import { Registry } from '../registry';
import './global.scss';
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata: Metadata = {
    title: 'Efass',
    description: 'Efass app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Registry>
            <html lang="en">
                <body className="container" suppressHydrationWarning={true}>{children}</body>
            </html>
        </Registry>
    );
}
