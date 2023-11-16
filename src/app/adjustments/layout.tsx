import { ReactNode } from 'react';

export default function AdjustmentsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <section>{children}</section>;
}
