import { createAction, handleActions } from 'redux-actions';

// 액션타입 정의
const UPDATE_TOPPING = 'topping/UPDATE_TOPPING';
const UPDATE = 'topping/UPDATE';
const UPDATE_INITIAL = 'topping/UPDATE_INITIAL';
const UPDATE_SMALL_TOPPING = 'topping/UPDATE_SMALL_TOPPING';


// 액션생성함수 정의
export const updateTopping = createAction(UPDATE_TOPPING);
export const update = createAction(UPDATE);
export const updateInitial = createAction(UPDATE_INITIAL);
export const updateSmallTopping = createAction(UPDATE_SMALL_TOPPING);


// 초기값
const initialState = {
  smallToppings: {
    meat: [],
    sauce: [],
    cheese: [],
    seafood: [],
    vegetable: [],
    etc: [],
  },
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
    initialResult: action.payload,
  }),
}, initialState);
