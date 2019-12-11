import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const LOGIN = 'user/LOGIN';


// 액션생성함수 정의
export const login = createAction(LOGIN);


// 초기값
const initialState = {
  email: '',
  nickname: '',
  authenticate: '',
};

export default handleActions({
  [login]: (state, action) => {
    const { isLogin } = action.payload;
    return {
      ...state,
      isLogin,
    };
  },
}, initialState);
