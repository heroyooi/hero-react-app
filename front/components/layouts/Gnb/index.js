import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { GnbWrap } from './styles';

const Gnb = () => {
  const router = useRouter();
  const getLiClass = useCallback((path) => {
    return router.pathname === `/${path}` ? 'on' : null;
  }, []);

  return (
    <GnbWrap>
      <li className={getLiClass('about')}>
        <Link href="/about">
          <a>회사소개</a>
        </Link>
      </li>
      <li className={getLiClass('')}>
        <Link href="/">
          <a>
            코딩맵 <span>&amp; 컴포넌트</span>
          </a>
        </Link>
      </li>
      <li className={getLiClass('posts')}>
        <Link href="/posts">
          <a>게시글</a>
        </Link>
      </li>
      <li className={getLiClass('postsSSR')}>
        <Link href="/postsSSR">
          <a>게시글 - SSR</a>
        </Link>
      </li>
    </GnbWrap>
  );
};

export default Gnb;
