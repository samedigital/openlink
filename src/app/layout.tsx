import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Playfair_Display, Roboto_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' });

export const metadata: Metadata = {
  title: 'OpenLink - The Free Alternative',
  description: '100% Free, Open Source alternative to Linktree.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} ${playfair.variable} ${robotoMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
