import { useRouter } from 'next/navigation';
export function UseRouter(Path: string) {
  const router = useRouter();
  return router.push(`/${Path}`);
}
