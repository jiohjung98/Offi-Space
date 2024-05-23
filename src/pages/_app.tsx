import MockProvider from '@/providers/MockProvider';
import QueryProvider from '@/providers/QueryProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MockProvider>
      <QueryProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </QueryProvider>
    </MockProvider>
  );
}
