import Head from 'next/head';

interface SEOProps {
  title: string;
}

function SEO({ title }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="예약하고, 탐색하고, 성장하는
멀티 서비스 오피스"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="/chim.jpeg" />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta
        property="og:description"
        content="예약하고, 탐색하고, 성장하는
멀티 서비스 오피스"
      />
      <meta property="og:locale" content="ko_KR" />
    </Head>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default SEO;
