import { ReactNode } from 'react';

export default function BalanceSheetLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <section>{children}</section>;
}
