import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="max-width-7xl mx-auto">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
