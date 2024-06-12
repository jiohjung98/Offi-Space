/* eslint-disable react/jsx-pascal-case */
import Head from 'next/head';
import SEO from './SEO';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SEO title="Offispace | 거점 공유 오피스" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  );
}

export default Layout;
