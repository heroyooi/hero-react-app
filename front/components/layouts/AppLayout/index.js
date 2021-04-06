import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '@components';
import styles from '@styles';

const AppLayout = ({ children }) => {
  const { Global, Container } = styles;
  return (
    <>
      <Global />
      <div id="wrapper">
        <Header />
        <Container>{children}</Container>
        <Footer />
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(AppLayout);
