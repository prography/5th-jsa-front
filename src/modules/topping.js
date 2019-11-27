import { createAction, handleActions } from 'redux-actions';
// import { Map } from 'immutable';

// 액션타입 정의
const UPDATE_TOPPING = 'topping/UPDATE_TOPPING';
const UPDATE = 'topping/UPDATE';


// 액션생성함수 정의
export const updateTopping = createAction(UPDATE_TOPPING);
export const update = createAction(UPDATE);


// 초기값
const initialState = {
  initialResult: [], // immer 추가하기
  result: [],
  submitTopping: undefined,
};

export default handleActions({
  [UPDATE_TOPPING]: (state, action) => {
    const { submitTopping } = action.payload;
    return {
      ...state,
      submitTopping,
    };
  },
  [UPDATE]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
}, initialState);
