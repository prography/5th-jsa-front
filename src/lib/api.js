import axios from 'axios';

const apiServer = 'http://13.209.50.101:3000';
// 1. select page api
// 2. result page api
// 3. feedback page api
// 4. signin, signup api

// ------------------------------------------
// 1. select page api
// ------------------------------------------
// small 토핑이미지 get
// 토핑 리스트를 서버에 요청하면 토핑 데이터를 JSON형식으로 반환합니다.
const getPizzaToppings = () => (
  axios.get(`${apiServer}/pizzas/toppings`)
);

// large 토핑이미지 get
// 사용자가 drag and drop 등으로 토핑을 선택하면 피자 판 위에 올릴 토핑 이미지 값을 반환해줍니다.
const getPizzaToppingsImage = (topping) => (
  axios.get(`${apiServer}/pizzas/toppings/image`, {
    params: {
      topping,
    },
  })
);

// ------------------------------------------
// 2. result page api
// ------------------------------------------
// 토핑 선택 후 피자 매칭
// 사용자가 토핑을 선택한 이후 맞는 피자 찾기 버튼을 누르면 결과값을 반환해준다.
const postPizzaRecommendation = (items, page) => (
  axios.post(`${apiServer}/pizzas/recomandations`, {
    items,
    page,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
);

// 결과 페이지에서 디테일 데이터 로드
const getPizzaDetail = (pk) => (
  axios.get(`${apiServer}/pizzas/details/${pk}`)
);

// 랜덤 피자 조회
// 사용자가 랜덤 피자를 요청하면 랜덤으로 피자 데이터를 JSON형식으로 반환합니다.
const getPizzaRandom = () => (
  axios.get(`${apiServer}/pizzas/random`)
);

// 댓글 달기 (pizza: 피자id, comment: 댓글 내용)
const postPizzaComments = (pizza, comment, token) => (
  axios.post(`${apiServer}/pizzas/comments`, {
    pizza,
    comment,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${token}`,
    },
  })
);

// ------------------------------------------
// 3. feedback page api
// ------------------------------------------
const postFeedback = (content) => (
  axios.post(`${apiServer}/users/feedback`, {
    content,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
);

// ------------------------------------------
// 4. signin, signup api
// ------------------------------------------
const postSignup = (email, password, nickname) => (
  axios.post(`${apiServer}/users/register`, {
    email,
    password,
    nickname,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
);

const postSignin = (email, password) => (
  axios.post(`${apiServer}/users/login`, {
    email,
    password,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
);

// 카카오 로그인
// 프론트에서 카카오 로그인 이후에 access_token을 서버에 던져주면 DB에 아이디 값이 없을 경우 저장 후 토큰 전달, 있으면 토큰 전달
const getKakaoSignin = (accessToken) => (
  axios.get(`${apiServer}/users`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      kakao: `${accessToken}`,
    },
  })
);

// 로그인 제대로 되어 있는지 체크
const getSigninCheck = (token) => (
  axios.post(`${apiServer}/users/check`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${token}`,
    },
  })
);

export {
  getPizzaToppings,
  getPizzaToppingsImage,
  postPizzaRecommendation,
  getPizzaDetail,
  getPizzaRandom,
  postPizzaComments,
  postFeedback,
  postSignup,
  postSignin,
  getKakaoSignin,
  getSigninCheck,
};
