import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const UPDATE_TOKEN = 'user/UPDATE_TOKEN';

// 액션생성함수 정의
export const login = createAction(LOGIN, (userInfo) => userInfo);
export const logout = createAction(LOGOUT);
export const updateToken = createAction(UPDATE_TOKEN);


// 초기값
const initialState = {
  isLogin: false,
  userInfo: {
    kakaoId: undefined,
    accessToken: undefined,
    nickname: undefined,
    image: undefined,
  },
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
  [UPDATE_TOKEN]: (state, action) => ({
    ...state,
    userInfo: {
      ...state.userInfo,
      accessToken: action.payload,
    },
  }),
}, initialState);
