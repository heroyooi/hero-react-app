import React from 'react';
import Link from 'next/link';

import { GnbWrap } from './styles';

const Gnb = () => {
  return (
    <GnbWrap>
      <li>
        <Link href="/about">
          <a>회사소개</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>
            코딩맵 <span>&amp; 컴포넌트</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/posts">
          <a>POSTS</a>
        </Link>
      </li>
    </GnbWrap>
  );
};

export default Gnb;
