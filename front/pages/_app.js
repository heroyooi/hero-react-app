import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { enableES5, setAutoFreeze } from 'immer';
import wrapper from '@store/configureStore';

enableES5();
setAutoFreeze(process.env.NODE_ENV !== 'production');

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>HERO REACT APP</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
