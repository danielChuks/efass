import { ReactNode } from 'react';

export default function NotesToPlLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <section>{children}</section>;
}
