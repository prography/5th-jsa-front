import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const OPEN_LOGIN_DIALOG = 'dialog/OPEN_LOGIN_DIALOG';
const CLOSE_LOGIN_DIALOG = 'dialog/CLOSE_LOGIN_DIALOG';

// 액션생성함수 정의
export const openLoginDialog = createAction(OPEN_LOGIN_DIALOG);
export const closeLoginDialog = createAction(CLOSE_LOGIN_DIALOG);

// 초기값
const initialState = {
  loginDialogOpen: false,
};

export default handleActions({
  [OPEN_LOGIN_DIALOG]: () => ({ loginDialogOpen: true }),
  [CLOSE_LOGIN_DIALOG]: () => ({ loginDialogOpen: false }),
}, initialState);
