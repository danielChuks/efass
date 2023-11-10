import { ReactNode } from 'react';

export default function CustomDataLayout({ children }: { children: ReactNode }) {
    return <section>{children}</section>;
}
