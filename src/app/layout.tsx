import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coinscrap | Andoni',
  description: 'Prueba técnica de Andoni Arrillaga para Coinscrap.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  );
}
