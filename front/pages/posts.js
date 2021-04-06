import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppLayout } from 'components';
import { SubTitle, Filter } from 'styles/common';
import { ContentWrap } from 'styles/layout';
import * as postActions from 'store/modules/post';
import classNames from 'classnames/bind';

const Posts = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);

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
      <SubTitle size={24}>Promise 테스트 - POSTS</SubTitle>
      <ContentWrap>
        <Filter>
          <li className={descLi} onClick={onSetOrder('DESC')}>
            내름차순 (DESC)
          </li>
          <li className={ascLi} onClick={onSetOrder('ASC')}>
            오름차순 (ASC)
          </li>
        </Filter>
        {!mainPosts.length === 0 ? (
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
      </ContentWrap>
    </AppLayout>
  );
};

export default Posts;
