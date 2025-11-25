
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Layout } from '../components/Layout';

// Mimicking Next.js AppProps interface for type safety
interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
