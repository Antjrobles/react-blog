import { useEffect, useState } from 'react';

import '../styles/globals.scss';
import { Layout, Header } from '../components';








function MyApp({ Component, pageProps }) {
  return (
    <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>

  );
}

export default MyApp;