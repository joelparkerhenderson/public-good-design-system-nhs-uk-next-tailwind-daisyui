import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import type { Metadata, Viewport } from 'next';
import '../globals.css';
import StyledComponentsRegistry from '../lib/registry';
import { ThemeProvider } from '@/components/ThemeProvider';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Public Good Design System',
  description: 'A modern, accessible React component library for public good applications',
  keywords: ['design system', 'react', 'typescript', 'accessibility', 'components'],
  authors: [{ name: 'Public Good Contributors' }],
  creator: 'Public Good Team',
  publisher: 'Public Good',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Public Good Design System',
    description: 'A modern, accessible React component library for public good applications',
    type: 'website',
    locale: 'en_US',
    url: 'https://public-good-design-system.vercel.app',
    siteName: 'Public Good Design System',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Public Good Design System',
    description: 'A modern, accessible React component library for public good applications',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#005eb8',
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StyledComponentsRegistry>
            <ThemeProvider>
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <div id="root">
                {children}
              </div>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}