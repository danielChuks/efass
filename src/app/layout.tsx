import type { Metadata } from 'next';
import { Registry } from '../registry';

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
        <body>{children}</body>
      </html>
    </Registry>
  );
}
