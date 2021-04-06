import React from 'react';
import Link from 'next/link';
import { PostDetailWrapper } from './styles';

const PostDetail = ({ post }) => {
  return (
    <>
      <PostDetailWrapper>
        <p className="title">{post.title}</p>
        <p className="desc">{post.desc}</p>
      </PostDetailWrapper>
      <button>
        <Link href="/posts">목록</Link>
      </button>
    </>
  );
};

export default PostDetail;
