import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Card } from '@styles/common';
import * as postActions from '@store/modules/post';

const PostCard = ({ posts }) => {
  const dispatch = useDispatch();
  const onDelete = useCallback(
    (id) => () => {
      dispatch(postActions.deletePost(id));
    },
    [],
  );
  return (
    <Card>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>
                <span className="title">{post.title}</span>
                <span className="desc">{post.desc}</span>
              </a>
            </Link>
            <button>수정</button>
            <button onClick={onDelete(post.id)}>삭제</button>
          </li>
        );
      })}
    </Card>
  );
};

export default PostCard;
