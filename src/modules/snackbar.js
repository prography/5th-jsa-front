import { createAction, handleActions } from 'redux-actions';
// import { Map } from 'immutable';

// 액션타입 정의
const SHOW_SNACKBAR = 'snackbar/SHOW_SNACKBAR';
const HIDE_SNACKBAR = 'snackbar/HIDE_SNACKBAR';

// 액션생성함수 정의
export const showSnackbar = createAction(SHOW_SNACKBAR);
export const hideSnackbar = createAction(HIDE_SNACKBAR);

// 초기값
const initialState = {
  snackbarShow: false,
  content: '',
};

export default handleActions({
  [SHOW_SNACKBAR]: (state, action) => ({
    ...state,
    content: action.payload.content,
    snackbarShow: true,
  }),
  [HIDE_SNACKBAR]: (state) => ({
    ...state,
    snackbarShow: false,
  }),
}, initialState);
