import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { AppLayout } from 'components';
import { SubTitle, Card } from 'styles/common';
import * as postActions from 'store/modules/post';
import wrapper from 'store/configureStore';
import axios from 'axios';

const PostsSSR = () => {
  const { mainPosts, loadPostsLoading, totalCounts } = useSelector(
    (state) => ({
      mainPosts: state.post.mainPosts,
      loadPostsLoading: state.post.loadPostsLoading,
      totalCounts: state.post.totalCounts,
    }),
    shallowEqual,
  );
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
      <Card>
        {mainPosts?.map((post, index) => {
          return (
            <li key={post.id}>
              <p className="title">{post.title}</p>
              <p className="desc">{post.desc}</p>
            </li>
          );
        })}
      </Card>
      {totalCounts > limit && (
        <button onClick={onMore} disabled={loadPostsLoading}>
          더보기
        </button>
      )}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(
    postActions.getLoadPosts({
      _limit: 10,
    }),
  );
  await context.store.dispatch(postActions.getTotalCounts());
});

export default PostsSSR;
