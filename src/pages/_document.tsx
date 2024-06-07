import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon16.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="root-portal"></div>
      </body>
    </Html>
  );
}
