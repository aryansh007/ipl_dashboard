import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });
import Head from 'next/head';

export const metadata: Metadata = {
  title: "Inshorts IPL T20 Dashboard",
  description:
    "Get real-time IPL match information, points table, and full schedule in one place, provided by inshorts.",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html >
  );
}