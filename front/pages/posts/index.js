import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames/bind';
import { AppLayout, PostCard } from '@components';
import { SubTitle, Filter } from '@styles/common';
import { ContentWrap } from '@styles/layout';
import * as postActions from '@store/modules/post';
import PostForm from '../../components/dependency/_post/PostForm';

const Posts = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post, shallowEqual);

  const [order, setOrder] = useState('ASC');

  const onSetOrder = useCallback(
    (type) => () => {
      setOrder(type);
    },
    [],
  );

  useEffect(() => {
    const params = {
      _sort: 'id',
      _order: order,
    };
    dispatch(postActions.getLoadPosts(params));
  }, [order]);

  const descLi = classNames({ on: order === 'DESC' });
  const ascLi = classNames({ on: order === 'ASC' });

  return (
    <AppLayout>
      <SubTitle size={24}>게시글 - /posts</SubTitle>
      <PostForm />
      <ContentWrap>
        <Filter top={-30}>
          <li className={descLi} onClick={onSetOrder('DESC')}>
            내름차순 (DESC)
          </li>
          <li className={ascLi} onClick={onSetOrder('ASC')}>
            오름차순 (ASC)
          </li>
        </Filter>
        {!mainPosts.length === 0 ? <>글 읽어오는 중...</> : <PostCard posts={mainPosts} />}
      </ContentWrap>
    </AppLayout>
  );
};

export default Posts;
