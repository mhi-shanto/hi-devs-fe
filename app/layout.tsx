import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Devs',
  description:
    'hi-devs connects developers, learners, and recruiters in one platform. Users can post coding problems and receive solutions, write and discover tech blogs, and apply for job listings from top recruiters. A space for learning, collaboration, and career growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="bg-background text-foreground min-h-screen antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
