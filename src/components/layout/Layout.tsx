import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import deleteFirstWord from '@/utils/deleteFirtstWord';
import ReservationHeader from './header/ReservationHeader';
import Header from './header/Header';
import Footer from './footer/Footer';

interface LayoutProps {
  title?: string;
  children?: ReactNode;
  isFullWidth?: boolean;
}

const Layout = ({ children, title, isFullWidth = false }: LayoutProps) => {
  const pathName = usePathname();
  const filteredPathName = deleteFirstWord(pathName);
  console.log(filteredPathName);
  console.log(title);

  return (
    <>
      {/* <Head>
        <title>{title ? `${title} | Effispace` : 'Effispace'}</title>
      </Head> */}
      {filteredPathName.includes('reservation') ? <ReservationHeader /> : <Header />}
      <section style={{ width: isFullWidth ? '100%' : undefined }}>{children}</section>
      <Footer />
    </>
  );
};

export default Layout;
