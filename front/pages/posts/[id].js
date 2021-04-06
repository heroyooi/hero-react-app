import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppLayout, PostDetail } from '@components';
import { SubTitle } from '@styles/common';
import { ContentWrap } from '@styles/layout';
import * as postActions from '@store/modules/post';
import { useRouter } from 'next/router';

const Posts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(postActions.getLoadPost(id));
  }, [id]);

  return (
    <AppLayout>
      <SubTitle size={24}>게시글 - /posts/:id</SubTitle>
      <ContentWrap>{!singlePost ? <>글 읽어오는 중...</> : <PostDetail post={singlePost} />}</ContentWrap>
    </AppLayout>
  );
};

export default Posts;
