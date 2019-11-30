import React, { useState, useEffect, useCallback } from 'react';
import { SelectPage, Loading } from 'components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateInitial, update } from 'modules/topping';

export default function SelectPageContainer({ history }) {
  const [smallToppings, setSmallToppings] = useState({
    meat: [], sauce: [], cheese: [], seafood: [], vegetable: [], etc: [],
  }); // small topping
  const [selected, setSelected] = useState(''); // 지금 당장 선택된 토핑 이름
  const [selectedTopping, setSelectedTopping] = useState([]); // 선택된 토핑 raw 리스트
  const [loading, setLoading] = useState(false); // 선택된 토핑

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
        setSelectedTopping(selectedTopping.concat([response.data.result]));
      }
    };
    fetchToppings(selected);
  }, [selected]);


  // 디스패치
  const dispatch = useDispatch();
  const UpdateInitial = useCallback((list) => dispatch((updateInitial(list))), [dispatch]);
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);

  // 드래그가 시작 되는 토핑 값을 가져간다.
  const handleDrag = (val) => { setSelected(val); };
  const handleSubmit = () => {
    // 데이터 없으면 로직 작동 안합니다. 데이터 없으면, snackbar로 액션을 주어야 합니다.
    if (selectedTopping.length) {
      setLoading(true); // 로딩 뷰 시작
      const submitTopping = [...new Set(selectedTopping.map((val) => val.name))];

      // 결과 데이터까지 다 뽑고 보낸다.
      const postToppingResult = async () => {
        try {
          const response = await axios.post(
            'http://13.209.50.101:3000/pizzas/recomandations', {
              items: submitTopping.join(),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            },
          );
          Update({ result: response.data.pizzas });
          UpdateInitial({ initialResult: response.data.pizzas });
        } catch (e) {}
      };
      postToppingResult();

      // 값 넘겨주고 페이지 이동합니다.
      setTimeout(() => {
        history.push('/result');
      }, 1000);
    }
  };

  return (
    <>
      <SelectPage
        smallToppings={smallToppings}
        selectedTopping={selectedTopping}
        handleDrag={handleDrag}
        handleSubmit={handleSubmit}
      />
      {loading && <Loading />}
    </>
  );
}
