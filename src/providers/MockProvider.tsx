import initMocks from '@/mocks';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enable') {
  initMocks();
}

function MockProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default MockProvider;
