import produce from 'immer';

export const initialState = {
  me: null,
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'LOG_IN':
        draft.me = { nickname: action.data };
        break;
      case 'LOG_OUT':
        draft.me = null;
        break;
      default:
        break;
    }
  });
};

export default reducer;
