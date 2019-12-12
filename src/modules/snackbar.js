import { createAction, handleActions } from 'redux-actions';
// import { Map } from 'immutable';

// 액션타입 정의
const SHOW = 'snackbar/SHOW';
const HIDE = 'snackbar/HIDE';

// 액션생성함수 정의
export const show = createAction(SHOW);
export const hide = createAction(HIDE);

// 초기값
const initialState = {
  showSnackbar: false,
  content: '',
};

export default handleActions({
  [SHOW]: (state, action) => ({
    ...state,
    content: action.payload.content,
    showSnackbar: true,
  }),
  [HIDE]: (state) => ({
    ...state,
    showSnackbar: false,
  }),
}, initialState);
