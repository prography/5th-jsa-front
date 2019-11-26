import { createAction, handleActions } from 'redux-actions';
// import { Map } from 'immutable';


const resultList = [
  {
    _id: '5dcbf8199d97fa33748dc9ed',
    brand: '도미노피자',
    name: '베스트 콰트로',
    m_price: 29000,
    m_cal: 1,
    image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/domino_bestquattro.jpg',
    __v: 0,
  },
  {
    _id: '5dcbf8cd0ea656262c6be5e4',
    brand: '미스터피자',
    name: '하프앤하프',
    m_price: 27900,
    m_cal: 6,
    image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/mr_half_and_half.jpg',
    __v: 0,
  },
  {
    _id: '5dcbf8199d97fa33748dc9ed',
    brand: '미스터피자',
    name: '베스트 콰트로',
    m_price: 29000,
    m_cal: 5,
    image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/domino_bestquattro.jpg',
    __v: 0,
  },
  {
    _id: '5dcbf8cd0ea656262c6be5e4',
    brand: '피자스쿨',
    name: '하프앤하프',
    m_price: 27900,
    m_cal: 4,
    image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/mr_half_and_half.jpg',
    __v: 0,
  },
  {
    _id: '5dcbf8199d97fa33748dc9ed',
    brand: '알볼로',
    name: '베스트 콰트로',
    m_price: 29000,
    m_cal: 3,
    image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/domino_bestquattro.jpg',
    __v: 0,
  },
  {
    _id: '5dcbf8cd0ea656262c6be5e4',
    brand: '파파존스',
    name: '하프앤하프',
    m_price: 27900,
    m_cal: 2,
    image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/mr_half_and_half.jpg',
    __v: 0,
  },
];

// 액션타입 정의
const UPDATE_TOPPING = 'topping/UPDATE_TOPPING';
const UPDATE = 'topping/UPDATE';


// 액션생성함수 정의
export const updateTopping = createAction(UPDATE_TOPPING);
export const update = createAction(UPDATE);


// 초기값
const initialState = {
  result: resultList,
  submitTopping: ['베이컨', '미트'],
  // submitTopping: [],
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
