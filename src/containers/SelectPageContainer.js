import React, { useState, useEffect, useCallback } from 'react';
import { SelectPage } from 'components';
import * as api from 'lib/api';
import { useDispatch } from 'react-redux';
import { updateTopping } from 'modules/topping';
import { showSnackbar } from 'modules/snackbar';

export default function SelectPageContainer({ history }) {
  // small topping을 리듀서에 넣어놓아야 한다.
  const [smallToppings, setSmallToppings] = useState({
    meat: [], sauce: [], cheese: [], seafood: [], vegetable: [], etc: [],
  }); // small topping
  const [selectedSmallTopping, setSelectedSmallTopping] = useState([]); // 선택된 작은 토핑 raw 리스트
  const [selectedTopping, setSelectedTopping] = useState([]); // 선택된 최종 전송 될 토핑 raw 리스트 (삭제될 수 있음)

  // 디스패치
  const dispatch = useDispatch();
  const UpdateTopping = useCallback((list) => dispatch((updateTopping(list))), [dispatch]);
  const ShowSnackbar = useCallback((list) => dispatch((showSnackbar(list))), [dispatch]);

  // small 토핑 이미지 가져오는 로직
  useEffect(() => {
    api.getPizzaToppings()
      .then((res) => setSmallToppings(res.data));
  }, []);

  // 드래그 성공 후 토핑 값을 가져간다.
  const handleDrag = (val) => {
    // 중복된 값이 있는지 확인하고 데이터 업데이트 합니다.
    const checkDuplication = (!selectedSmallTopping.find((el) => el.name === val.name));
    if (checkDuplication) {
      // 선택된 데이터를 리스트로 정리 [{name: 토핑이름, value: 작은 이미지 url}, ... ]
      setSelectedSmallTopping(selectedSmallTopping.concat({ name: val.name, url: val.image }));
      // 선택된 데이터 large 토핑 이미지 불러오기
      api.getPizzaToppingsImage(val.name)
        .then((res) => {
          // large 토핑 array에 추가
          setSelectedTopping(selectedTopping.concat([res.data.result]));
        });
    } else ShowSnackbar({ content: '같은 토핑을 올려버렸네요! 토핑 두번 추가는 곤란해요!' });
  };

  const handleSubmit = () => {
    if (selectedTopping.length) {
      const submitTopping = [...new Set(selectedTopping.map((val) => val.name))]; // ['베이컨' ...]
      // ! 리듀서로 smallTopping 값을 보내주어야 합니다.
      UpdateTopping(submitTopping); // result 페이지에서 결과 데이터 로드 하기 위해 리듀서로 보내줍니다.
      // 값 넘겨주고 페이지 이동합니다.
      history.push(`/result/${submitTopping.join()}`);
    }
  };

  const handleDelete = (val) => {
    const index = selectedSmallTopping.findIndex((el) => el.name === val.name);
    const SelectedSmallTopping = selectedSmallTopping.slice(0, index).concat(
      selectedSmallTopping.slice(index + 1, selectedSmallTopping.length),
    );
    const SelectedTopping = selectedTopping.slice(0, index).concat(
      selectedTopping.slice(index + 1, selectedTopping.length),
    );
    setSelectedSmallTopping(SelectedSmallTopping);
    setSelectedTopping(SelectedTopping);
  };

  return (
    <>
      <SelectPage
        smallToppings={smallToppings}
        selectedTopping={selectedTopping}
        handleDrag={handleDrag}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        selectedSmallTopping={selectedSmallTopping}
      />
    </>
  );
}
