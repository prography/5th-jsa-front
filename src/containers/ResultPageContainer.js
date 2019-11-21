import React, { useEffect, useState } from 'react';
import { ResultPage } from 'components';
import axios from 'axios';

const resultList = {
  num: 2,
  pizzas: [
    {
      _id: '5dcbf8199d97fa33748dc9ed',
      brand: '도미노피자',
      name: '베스트 콰트로',
      m_price: 29000,
      m_cal: 1548,
      image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/domino_bestquattro.jpg',
      __v: 0,
    },
    {
      _id: '5dcbf8cd0ea656262c6be5e4',
      brand: '미스터피자',
      name: '하프앤하프',
      m_price: 27900,
      m_cal: 1684,
      image: 'https://jsa-img.s3.ap-northeast-2.amazonaws.com/pizza/mr_half_and_half.jpg',
      __v: 0,
    },
  ],
};

export default function ResultPageContainer() {
  const [ResultList, setResultList] = useState([]);
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const data = ['베이컨'];
        const response = await axios.post(
          'http://13.209.50.101:3000/pizzas/recomandations', { items: data },
        );
        console.log(response.data);
        setResultList(response.data);
      } catch (e) {}
    };
    fetchToppings();
  }, []);

  // 필터기능
  function handleFilter(value, name) {
    // 테스트하기
    // console.log(value);
    // console.log(name);
  }

  // 좋아요기능
  function handleFavorite(name) {
    // console.log(name);
  }

  return (
    <>
      <ResultPage
        handleFilter={handleFilter}
        handleFavorite={handleFavorite}
        resultList={resultList}
      />
      {console.log(resultList)}
    </>
  );
}
