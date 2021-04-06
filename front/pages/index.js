import React from 'react';
import { AppLayout, CodingMap, ComponentMap } from 'components';
import { SubTitle } from 'styles/common';

const Index = () => {
  const listData = [
    { name: '회사소개', href: '/about' },
    { name: '프로필', href: '/profile' },
    { name: '회원가입', href: '/signup' },
    { name: '테스트/유틸', href: '/test/utils' },
    { name: 'GET POSTS', href: '/posts' },
    { name: 'GET POSTS - SSR', href: '/postsSSR' },
  ];

  return (
    <AppLayout>
      <SubTitle size={24}>코딩맵 &amp; 컴포넌트</SubTitle>
      <CodingMap list={listData} />
      <ComponentMap />
    </AppLayout>
  );
};

export default Index;
