import type { ReactNode } from 'react';
import { AppToast } from '@/components/common/AppToast';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <AppToast />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
