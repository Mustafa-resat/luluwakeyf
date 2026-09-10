import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://www.luluwakeyf.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: {
    default: "Luluwa Keyf | Yalova'da Denize Karşı Cafe & Restaurant",
    template: '%s | Luluwa Keyf Yalova',
  },
  description: "Luluwa Keyf, Yalova Rüstem Paşa'da denize karşı kahvaltı, yemek, pizza, burger, makarna, kahve ve kokteyl seçenekleri sunan cafe & restaurant. Her gün 08:00–01:00.",
  keywords: [
    'Luluwa Keyf',
    'Luluwa Keyf Yalova',
    'Yalova cafe',
    'Yalova restoran',
    'Yalova kahvaltı',
    'denize karşı cafe Yalova',
    'denize karşı restoran Yalova',
    'Yalova yemek',
    'Yalova pizza',
    'Yalova burger',
    'Yalova kahve',
    'Rüstem Paşa cafe',
  ],
  applicationName: 'Luluwa Keyf',
  category: 'restaurant',
  creator: 'Luluwa Keyf',
  publisher: 'Luluwa Keyf',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'Luluwa Keyf',
    title: "Luluwa Keyf | Yalova'da Denize Karşı Cafe & Restaurant",
    description: "Yalova Rüstem Paşa'da denize karşı kahvaltı, yemek, kahve ve kokteyl keyfi. Luluwa Keyf.",
    images: [
      { url: '/images/hero-exterior.png', width: 941, height: 1672, alt: 'Luluwa Keyf Yalova dış cephe ve deniz manzarası' },
      { url: '/images/facade.png', width: 941, height: 1671, alt: 'Luluwa Keyf Yalova restoran' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luluwa Keyf | Yalova Cafe & Restaurant',
    description: 'Denize karşı kahvaltı, yemek, kahve ve kokteyl keyfi — Yalova.',
    images: ['/images/hero-exterior.png'],
  },
  icons: { icon: '/logo.svg' },
  formatDetection: { telephone: true, address: true, email: false },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: 'Luluwa Keyf',
  url: SITE_URL,
  telephone: '+90-226-813-08-77',
  image: [
    `${SITE_URL}/images/hero-exterior.png`,
    `${SITE_URL}/images/facade.png`,
  ],
  description: "Yalova Rüstem Paşa'da denize karşı kahvaltı, yemek, pizza, burger, makarna, kahve ve kokteyl seçenekleri sunan cafe & restaurant.",
  servesCuisine: ['Türk mutfağı', 'Cafe', 'Kahvaltı'],
  priceRange: '₺₺',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rüstem Paşa Mah. Mihenk Sk. No:21/1',
    addressLocality: 'Yalova',
    addressRegion: 'Yalova',
    addressCountry: 'TR',
  },
  acceptsReservations: true,
  menu: `${SITE_URL}/#menu`,
  sameAs: [
    'https://www.instagram.com/luluwakeyfyalova/',
    'https://www.facebook.com/luluwakeyfyalova',
  ],
  hasMap: 'https://www.google.com/maps/search/?api=1&query=Luluwa%20Keyf%20R%C3%BCstem%20Pa%C5%9Fa%20Mihenk%20Sk%20No%3A21%2F1%20Yalova',
  areaServed: { '@type': 'City', name: 'Yalova' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
