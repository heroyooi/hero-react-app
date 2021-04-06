import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppLayout } from 'components';
import { SubTitle } from 'styles/common';
import * as postActions from 'store/modules/post';
import wrapper from 'store/configureStore';
import axios from 'axios';

const PostsSSR = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);

  const onMore = useCallback(() => {
    dispatch(
      postActions.getLoadPosts({
        _limit: limit + 10,
      }),
    ).then(() => {
      setLimit((prev) => prev + 10);
    });
  }, [limit]);

  return (
    <AppLayout>
      <SubTitle size={24}>Promise 테스트 - POSTS</SubTitle>
      <ul>
        {mainPosts?.map((post, index) => {
          return (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.author}</p>
            </li>
          );
        })}
      </ul>
      <button onClick={onMore}>더보기</button>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는 경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(
    postActions.getLoadPosts({
      _limit: 10,
    }),
  );
});

export default PostsSSR;
