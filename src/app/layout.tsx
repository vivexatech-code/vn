import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import AutoEnquiryPopup from '@/components/ui/AutoEnquiryPopup';
import { getSettings, getPopupSettings } from '@/lib/data';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vnvidhyapeeth.ac.in'),
  title: 'VN Vidhyapeeth | Premier Educational & Skill Development Institution',
  description: 'VN Vidhyapeeth is an educational initiative operated by a registered trust under the Indian Trust Act 1882. Providing ISO 9001:2015 certified paramedical, computer, and vocational training across India.',
  keywords: [
    'VN Vidhyapeeth',
    'Paramedical Courses',
    'DMLT Diploma',
    'DPT Physiotherapy',
    'DOTT Operation Theatre',
    'Computer Diploma ADCA',
    'Vocational Education NGO',
    'Educational Trust India',
    'Ellenabad Sirsa Haryana'
  ],
  authors: [{ name: 'VN Vidhyapeeth' }],
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp'
  },
  openGraph: {
    title: 'VN Vidhyapeeth - Empowering Lives Through Education',
    description: 'Autonomous skill-based paramedical and vocational education under registered trust framework.',
    url: 'https://vnvidhyapeeth.ac.in',
    siteName: 'VN Vidhyapeeth',
    images: [
      {
        url: '/images/newslider1.jpg',
        width: 1200,
        height: 630,
        alt: 'VN Vidhyapeeth Campus and Students'
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
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-white">
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />

        {/* Global Floating WhatsApp Contact */}
        <FloatingWhatsApp
          phoneNumber={settings?.whatsapp_number || settings?.phone1}
          defaultMessage={settings?.whatsapp_message}
        />

        {/* Automatic Admissions Enquiry Popup */}
        <AutoEnquiryPopup settings={popupSettings} />
      </body>
    </html>
  );
}
