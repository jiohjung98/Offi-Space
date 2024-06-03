import { AuthorizationProvider } from '@/providers/Authentication';
import MockProvider from '@/providers/MockProvider';
import QueryProvider from '@/providers/QueryProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MockProvider>
      <QueryProvider>
        <Script
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}></Script>
        <AuthorizationProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthorizationProvider>
      </QueryProvider>
    </MockProvider>
  );
}
