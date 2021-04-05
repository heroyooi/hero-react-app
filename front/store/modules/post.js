import { createAction, handleActions } from 'redux-actions';
import createPromiseThunk from 'store/createPromiseThunk';
import produce from 'immer';

import * as api from 'store/api/post';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

const initialState = {
  mainPosts: [],
  loadPostsLoading: false, // 글 불러오기 시도중
  loadPostsDone: false,
  loadPostsError: null,
};

export const getLoadPost = createPromiseThunk(LOAD_POSTS, api.loadPost);

export default handleActions(
  {
    [LOAD_POSTS_REQUEST]: (state, action) => {
      return produce(state, (draft) => {
        draft.loadPostsLoading = true;
        draft.loadPostsError = null;
        draft.loadPostsDone = false;
      });
    },
    [LOAD_POSTS_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        if (action.payload.length) {
          draft.mainPosts = action.payload;
        } else {
          draft.mainPosts.push(action.payload);
        }
      });
    },
    [LOAD_POSTS_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.payload;
      });
    },
  },
  initialState,
);
