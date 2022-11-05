import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer autoClose={5000} closeOnClick />
      <Component {...pageProps} />;
    </>
  );
}
