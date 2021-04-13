import { createAction, handleActions } from 'redux-actions';
import createPromiseThunk from '@store/createPromiseThunk';
import produce from 'immer';

import * as api from '@store/api/post';

export const TOTAL_COUNTS = 'TOTAL_COUNTS';
export const TOTAL_COUNTS_REQUEST = 'TOTAL_COUNTS_REQUEST';
export const TOTAL_COUNTS_SUCCESS = 'TOTAL_COUNTS_SUCCESS';
export const TOTAL_COUNTS_FAILURE = 'TOTAL_COUNTS_FAILURE';

export const LOAD_POST = 'LOAD_POST';
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

const initialState = {
  totalCounts: 0,
  totalCountsLoading: false, // 전체글 불러오기 시도중
  totalCountsDone: false,
  totalCountsError: null,

  singlePost: null,
  loadPostLoading: false, // 글 불러오기 시도중
  loadPostDone: false,
  loadPostError: null,

  mainPosts: [],
  loadPostsLoading: false, // 전체글 불러오기 시도중
  loadPostsDone: false,
  loadPostsError: null,

  createPostLoading: false, // 글 작성 시도중
  createPostDone: false,
  createPostError: null,
};

export const getTotalCounts = createPromiseThunk(TOTAL_COUNTS, api.totalCounts);
export const getLoadPost = createPromiseThunk(LOAD_POST, api.loadPost);
export const getLoadPosts = createPromiseThunk(LOAD_POSTS, api.loadPosts);
export const createPost = createPromiseThunk(CREATE_POST, api.addPost);

export const deletePost = (id) => {
  try {
    return createPromiseThunk(DELETE_POST, api.removePost, { id });
  } catch (error) {
    throw error;
  }
};

// export const deletePost = createPromiseThunk(DELETE_POST, api.removePost);

export default handleActions(
  {
    [TOTAL_COUNTS_REQUEST]: (state, action) => {
      return produce(state, (draft) => {
        draft.totalCountsLoading = true;
        draft.totalCountsError = null;
        draft.totalCountsDone = false;
      });
    },
    [TOTAL_COUNTS_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.totalCountsLoading = false;
        draft.totalCountsDone = true;
        draft.totalCounts = action.payload.length;
      });
    },
    [TOTAL_COUNTS_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.totalCountsLoading = false;
        draft.totalCountsError = action.payload;
      });
    },

    [LOAD_POST_REQUEST]: (state, action) => {
      return produce(state, (draft) => {
        draft.loadPostLoading = true;
        draft.loadPostError = null;
        draft.loadPostDone = false;
      });
    },
    [LOAD_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('::: ', action);
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.payload;
      });
    },
    [LOAD_POST_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.loadPostLoading = false;
        draft.loadPostError = action.payload;
      });
    },

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

    [CREATE_POST_REQUEST]: (state, action) => {
      return produce(state, (draft) => {
        draft.createPostLoading = true;
        draft.createPostError = null;
        draft.createPostDone = false;
      });
    },
    [CREATE_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.createPostLoading = false;
        draft.createPostDone = true;
        draft.mainPosts.unshift(action.payload);
      });
    },
    [CREATE_POST_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.createPostLoading = false;
        draft.createPostError = action.payload;
      });
    },

    [DELETE_POST_REQUEST]: (state, action) => {
      return produce(state, (draft) => {
        draft.deletePostLoading = true;
        draft.deletePostError = null;
        draft.deletePostDone = false;
      });
    },
    [DELETE_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.reqInfo.id);
      });
    },
    [DELETE_POST_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.deletePostLoading = false;
        draft.deletePostError = action.payload;
      });
    },
  },
  initialState,
);
