import type { Metadata, Viewport } from 'next';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';
import { ThemeProvider } from '@/components/ThemeProvider';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}