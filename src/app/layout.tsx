
import '../styles/global.css';

interface AppLayout {
  children: React.ReactNode;
}

const RootLayout = ({ children }: AppLayout) => (
  <html lang='ko' className='bg-lightGray'>
    <body className='container mx-auto box-border max-w-3xl'>{children}</body>
  </html>
);

export default RootLayout;
