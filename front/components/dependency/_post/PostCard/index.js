import React from 'react';
import Link from 'next/link';
import { Card } from '@styles/common';

const PostCard = ({ posts }) => {
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
          </li>
        );
      })}
    </Card>
  );
};

export default PostCard;
