import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const UPDATE = 'feedback/UPDATE';

// 액션생성함수 정의
export const update = createAction(UPDATE);

// 초기값
const initialState = {
  feedback: '',
};

export default handleActions({
  [UPDATE]: (state, action) => ({
    ...state,
    feedback: action.payload.feedback,
  }),
}, initialState);
