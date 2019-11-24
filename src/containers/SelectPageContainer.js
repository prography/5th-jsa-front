import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SelectPage } from 'components';

export default function SelectPageContainer() {
  // 여기서 데이터를 전부 불러옵ㄴ디다.
  const [smallToppings, setSmallToppings] = useState(
    {
      meat: [], sauce: [], cheese: [], seafood: [], vegetable: [], etc: [],
    },
  );

  // 지금 당장 선택된 토핑 이름
  const [selected, setSelected] = useState('');
  // 선택 후 새로 불러온 토핑 배열 ([{name: 이름, resultImage: url} ])
  const [submitTopping, setSubmitTopping] = useState([]);

  // 드래그가 시작 되는 값을 가져간다.
  // ! 드랍되는 시점에 값 보내느걸로 바꾸기
  const handleDrag = (val) => {
    setSelected(val);
    console.log(val);
  };

  // small topping load 합니다,
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await axios.get(
          'http://13.209.50.101:3000/pizzas/toppings',
        );
        setSmallToppings(response.data);
      } catch (e) {}
    };
    fetchToppings();
  }, []);

  // 선택한 토핑의 large image 불러오는 로직
  useEffect(() => {
    const fetchToppings = async (val) => {
      const response = await axios.get(
        'http://13.209.50.101:3000/pizzas/toppings/image',
        { params: { topping: val } },
      );
      if (response.data.result) {
        setSubmitTopping(submitTopping.concat([response.data.result]));
      }
    };
    fetchToppings(selected);
  }, [selected]);

  return (
    <SelectPage
      smallToppings={smallToppings}
      submitTopping={submitTopping}
      handleDrag={handleDrag}
    />
  );
}
