import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import SmartDonationPopup from '@/components/ui/SmartDonationPopup';
import StickyDonateButton from '@/components/ui/StickyDonateButton';
import QuickDonationModal from '@/components/donation/QuickDonationModal';
import { getSettings, getPopupSettings } from '@/lib/data';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vnvidhyapeeth.ac.in'),
  title: 'VN Vidhyapeeth | Educational & Social Welfare Organization',
  description: 'VN Vidhyapeeth is a registered educational and social welfare trust dedicated to education for everyone, food support, child welfare, and community development.',
  keywords: [
    'VN Vidhyapeeth',
    'Educational NGO India',
    'Social Welfare Trust',
    'Education for Every Child',
    'Food Distribution Drives',
    'Free Stationery for Children',
    'Child Welfare & Development',
    'Donate for Education',
    'Volunteer With Us'
  ],
  authors: [{ name: 'VN Vidhyapeeth' }],
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp'
  },
  openGraph: {
    title: 'VN Vidhyapeeth - Education for Everyone, Employment for All',
    description: 'Working towards a better society through education, food support, child welfare and community development.',
    url: 'https://vnvidhyapeeth.ac.in',
    siteName: 'VN Vidhyapeeth',
    images: [
      {
        url: '/images/ngo/hero-children-study.jpg',
        width: 1200,
        height: 630,
        alt: 'VN Vidhyapeeth Social Welfare and Education'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings;
  let popupSettings;
  try {
    settings = getSettings();
  } catch {
    settings = undefined;
  }

  try {
    popupSettings = getPopupSettings();
  } catch {
    popupSettings = undefined;
  }

  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <link rel="icon" href="/images/logo.webp" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-white pb-14 lg:pb-0">
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />

        {/* Persistent Floating / Sticky Donate Button (Desktop right edge & Mobile bottom bar) */}
        <StickyDonateButton />

        {/* Global Floating WhatsApp Contact (Positioned safely above bottom donate bar on mobile) */}
        <FloatingWhatsApp
          phoneNumber={settings?.whatsapp_number || settings?.phone1}
          defaultMessage={settings?.whatsapp_message}
        />

        {/* Smart Timed & Recurring Donation Popup */}
        <SmartDonationPopup initialSettings={popupSettings} />

        {/* One-Page Universal Quick Donation Modal */}
        <QuickDonationModal bankSettings={settings} />
      </body>
    </html>
  );
}
