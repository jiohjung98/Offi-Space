import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from '@components/footer/Footer';
import Header from '@/components/header/Header';

interface LayoutProps {
  title?: string;
  children?: ReactNode;
  isFullWidth?: boolean;
}

const Layout = ({ children, title, isFullWidth = false }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Effispace` : 'Effispace'}</title>
      </Head>
      <Header />
      <section style={{ width: isFullWidth ? '100%' : undefined }}>{children}</section>
      <Footer />
    </>
  );
};

export default Layout;
