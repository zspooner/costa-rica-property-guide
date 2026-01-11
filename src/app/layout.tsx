import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Costa Rica Property Guide | Buy Property in Guanacaste',
  description: 'Thinking about buying property in Costa Rica? Get clear guidance from someone who has lived in Guanacaste for 8+ years and been through the process.',
  keywords: 'Costa Rica real estate, buy property Costa Rica, Guanacaste property, Tamarindo real estate, Costa Rica homes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>{children}</body>
    </html>
  );
}
