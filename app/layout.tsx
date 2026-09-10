import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.luluwakeyf.com'),
  alternates: { canonical: '/' },
  title: 'Luluwa Keyf | Yalova',
  description: 'Luluwa Keyf — denize karşı iyi yemek, güzel sohbet ve her zaman keyif.',
  icons: { icon: '/logo.svg' },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
