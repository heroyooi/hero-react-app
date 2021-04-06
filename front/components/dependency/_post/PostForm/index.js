import { useCallback } from 'react';
import { PostFormWrapper } from './styles';
import { useDispatch } from 'react-redux';
import shortId from 'shortid';
import useInput from '@hooks/useInput';
import * as postActions from '@store/modules/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const [title, onChangeTitle] = useInput('');
  const [desc, onChangeDesc] = useInput('');

  const onCreatePost = useCallback(() => {
    console.log({ title, desc });
    dispatch(postActions.createPost({ title, desc, id: Date.now() }));
  }, [title, desc]);

  return (
    <PostFormWrapper>
      <div className="inner">
        <h3>게시글 작성</h3>
        <input type="text" placeholder="제목" value={title} onChange={onChangeTitle} />
        <textarea placeholder="내용" value={desc} onChange={onChangeDesc} />
        <button onClick={onCreatePost}>입력</button>
      </div>
    </PostFormWrapper>
  );
};

export default PostForm;
