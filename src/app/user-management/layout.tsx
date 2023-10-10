import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
