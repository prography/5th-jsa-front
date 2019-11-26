import React, { useState, useEffect, useCallback } from 'react';
import { SelectPage } from 'components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateTopping } from 'modules/topping';

export default function SelectPageContainer({ history }) {
  const [smallToppings, setSmallToppings] = useState({
    meat: [], sauce: [], cheese: [], seafood: [], vegetable: [], etc: [],
  }); // small topping
  const [selected, setSelected] = useState(''); // 지금 당장 선택된 토핑 이름
  const [submitTopping, setSubmitTopping] = useState([]); // 선택된 토핑 raw 리스트

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
        setSubmitTopping(submitTopping.concat([response.data.result]), []);
      }
    };
    fetchToppings(selected);
  }, [selected]);


  // 디스패치
  const dispatch = useDispatch();
  const UpdateTopping = useCallback((list) => dispatch((updateTopping(list))), [dispatch]);

  // 드래그가 시작 되는 토핑 값을 가져간다.
  const handleDrag = (val) => { setSelected(val); };
  const handleSubmit = () => {
    // 데이터 없으면 로직 작동 안합니다.
    if (submitTopping.length) {
      // ['베이컨', '토마토', '치즈'] 형식으로 리듀서에 값을 넘겨준다.
      // ! 변수 이름을 submitTopping으로 하고 이미 선언되어있는 변수명은 selectedTopping으로 바꿉니다.
      const SubmitTopping = [...new Set(submitTopping.map((val) => val.name))];
      UpdateTopping({ submitTopping: SubmitTopping });
      // 값 넘겨주고 페이지 이동합니다.
      history.push('/result');
    }
  };

  return (
    <>
      <SelectPage
        smallToppings={smallToppings}
        submitTopping={submitTopping}
        handleDrag={handleDrag}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
