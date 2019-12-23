import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

// 액션생성함수 정의
export const login = createAction(LOGIN, (userInfo) => userInfo);
export const logout = createAction(LOGOUT);


// 초기값
const initialState = {
  isLogin: false,
  userInfo: {},
};

export default handleActions({
  [LOGIN]: (state, action) => ({
    ...state,
    isLogin: action.payload.isLogin,
    userInfo: action.payload.userInfo,
  }),
  [LOGOUT]: (state, action) => ({
    ...state,
    isLogin: action.payload,
    userInfo: {},
  }),
}, initialState);
