import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const LOGIN = 'user/LOGIN';
const LOGIN_SUCCESS = 'user/login_success';

// 액션생성함수 정의
export const login = createAction(LOGIN, (user) => user);
export const loginSuccess = createAction(LOGIN_SUCCESS);


// 초기값
const initialState = {
  user: {},
};

export default handleActions({
  [LOGIN]: (state, action) => ({
    ...state,
    user: action.payload,
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload,
  }),
}, initialState);
