import React from 'react';
import Link from 'next/link';
import { FooterWrap } from './styles';

const Footer = () => {
  return (
    <FooterWrap>
      <h2>
        <Link href="/main">
          <a>HERO REACT APP</a>
        </Link>
      </h2>
      <p>ⓒ 2021 PUBLISHING BY SUNG-YEONWOOK</p>
    </FooterWrap>
  );
};

export default Footer;
