import axios from 'axios';

const apiServer = 'http://13.209.50.101:3000';


// 피드백
const postFeedback = (content) => (
  axios.post(`${apiServer}/users/feedback`, {
    content,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
);

// 토핑 리스트 조회 (small 토핑이미지 get)
// 토핑 리스트를 서버에 요청하면 토핑 데이터를 JSON형식으로 반환합니다.
const getPizzaToppings = () => (
  axios.get(`${apiServer}/pizzas/toppings`)
);

// 토핑 선택시 결과 이미지 조회 (large 토핑이미지 get)
// 사용자가 drag and drop 등으로 토핑을 선택하면 피자 판 위에 올릴 토핑 이미지 값을 반환해줍니다.
const getPizzaToppingsImage = (topping) => (
  axios.get(`${apiServer}/pizzas/toppings/image`, {
    params: {
      topping,
    },
  })
);

// 토핑 선택 후 피자 매칭
// 사용자가 토핑을 선택한 이후 맞는 피자 찾기 버튼을 누르면 결과값을 반환해준다.
const postPizzaRecommendation = (items) => (
  axios.post(`${apiServer}/pizzas/recomandations`, {
    items,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
);

// 결과 페이지에서 피자 데이터 post
const postPizzaDetail = (pk) => (
  axios.post(`${apiServer}/pizzas/details/${pk}`)
);

export {
  postFeedback,
  postPizzaDetail,
  getPizzaToppings,
  postPizzaRecommendation,
  getPizzaToppingsImage,
};
