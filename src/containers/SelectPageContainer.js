import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SelectTopping, SelectPage, SelectPageToppingList } from 'components';


export default function SelectPageContainer() {
  // 여기서 데이터를 전부 불러옵ㄴ디다.
  const [smallToppings, setSmallToppings] = useState({ toppings: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        setError(null);
        setSmallToppings({ toppings: [] });
        setLoading(true);
        const response = await axios.get(
          'http://13.209.50.101:3000/pizzas/toppings',
        );
        setSmallToppings(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchToppings();
  }, []);
  const mappingSmallToppings = Object.values(smallToppings);

  return (
    <>
      {/* 제일 왼쪽 선택하는 컴포넌트 */}
      {/* <SelectTopping smallToppings={smallToppings} /> */}
      {/* 아무것도 아님 */}
      {/* <SelectPageToppingList /> */}
      <SelectPage />
      {/* 스낵바 */}
      {/* 추가된 토핑 담긴 리스트 */}
      {/* 제출하기 버튼 */}
    </>
  );
}
