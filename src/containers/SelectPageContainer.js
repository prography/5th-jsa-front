import React, { useState, useEffect, useCallback } from 'react';
import { SelectPage, Loading } from 'components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateInitial, update } from 'modules/topping';
import { show } from 'modules/snackbar';

export default function SelectPageContainer({ history }) {
  const [smallToppings, setSmallToppings] = useState({
    meat: [], sauce: [], cheese: [], seafood: [], vegetable: [], etc: [],
  }); // small topping
  const [selectedSmallTopping, setSelectedSmallTopping] = useState([]); // 선택된 작은 토핑 raw 리스트
  // const [selectedLargeTopping, setselectedLargeTopping] = useState([]); // 선택된 큰 토핑 list
  const [selectedTopping, setSelectedTopping] = useState([]); // 선택된 최종 전송 될 토핑 raw 리스트 (삭제될 수 있음)
  const [loading, setLoading] = useState(false);

  // 디스패치
  const dispatch = useDispatch();
  const UpdateInitial = useCallback((list) => dispatch((updateInitial(list))), [dispatch]);
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);
  const Show = useCallback((list) => dispatch((show(list))), [dispatch]);

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

  // large 토핑 이미지 가져오는 로직
  const fetchToppings = async (val) => {
    const response = await axios.get(
      'http://13.209.50.101:3000/pizzas/toppings/image',
      { params: { topping: val } },
    );
    if (response.data.result) {
      setSelectedTopping(selectedTopping.concat([response.data.result]));
    }
  };

  // 드래그가 시작 되는 토핑 값을 가져간다.
  const handleDrag = (val) => {
    // 중복된 값이 있는지 확인하고 데이터 업데이트 합니다.
    if (!selectedSmallTopping.find((el) => el.name === val.name)) {
      // 선택된 데이터를 리스트로 정리 [{name: 토핑이름, value: 작은 이미지 url}, ... ]
      setSelectedSmallTopping(selectedSmallTopping.concat({ name: val.name, url: val.image }));
      // 선택된 데이터 large 토핑 이미지 불러오기
      fetchToppings(val.name);
    } else {
      Show({ content: '같은 토핑을 올려버렸네요! 토핑 두번 추가는 곤란해요!' });
    }
  };


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

  const handleDelete = (val) => {
    console.log(val);
    const index = selectedSmallTopping.findIndex((el) => el.name === val.name);

    const SelectedSmallTopping = selectedSmallTopping.slice(0, index).concat(selectedSmallTopping.slice(index + 1, selectedSmallTopping.length));
    const SelectedTopping = selectedTopping.slice(0, index).concat(selectedTopping.slice(index + 1, selectedTopping.length));

    setSelectedSmallTopping(SelectedSmallTopping);
    setSelectedTopping(SelectedTopping);
  };

  return (
    <>
      {/* {console.log(selected)} */}
      <SelectPage
        smallToppings={smallToppings}
        selectedTopping={selectedTopping}
        handleDrag={handleDrag}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        selectedSmallTopping={selectedSmallTopping}
      />
      {loading && <Loading />}
    </>
  );
}
