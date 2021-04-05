import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppLayout } from 'components';
import { SubTitle } from 'styles/common';
import * as postActions from 'store/modules/post';

const Posts = () => {
  const dispatch = useDispatch();
  const { loadPostsDone, mainPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(postActions.getLoadPost());
  }, []);

  return (
    <AppLayout>
      <SubTitle size={24}>Promise 테스트 - POSTS</SubTitle>
      {!loadPostsDone ? (
        <>글 읽어오는 중...</>
      ) : (
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
      )}
    </AppLayout>
  );
};

export default Posts;
