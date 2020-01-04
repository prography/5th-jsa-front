import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// 액션타입 정의
const UPDATE_TOPPING = 'topping/UPDATE_TOPPING';
const UPDATE = 'topping/UPDATE';
const UPDATE_INITIAL = 'topping/UPDATE_INITIAL';


// 액션생성함수 정의
export const updateTopping = createAction(UPDATE_TOPPING);
export const update = createAction(UPDATE);
export const updateInitial = createAction(UPDATE_INITIAL);


// 초기값
const initialState = {
  initialResult: [], // immer 추가하기
  result: [],
  submitTopping: [],
};

export default handleActions({
  [UPDATE_TOPPING]: (state, action) => ({
    ...state,
    submitTopping: action.payload,
  }),
  [UPDATE]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
  [UPDATE_INITIAL]: (state, action) => ({
    ...state,
    initialResult: action.payload.initialResult,
  }),
}, initialState);
