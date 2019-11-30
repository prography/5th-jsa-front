import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResultPage } from 'components';
import axios from 'axios';
import { update } from 'modules/topping';

export default function ResultPageContainer({ history }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState();
  const { initialResult, result } = useSelector((state) => (state.topping));
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);

  useEffect(() => {
    // 결과값이 없으면 선택하는 페이지로 강제 이동
    // if (!result.length) { history.push('/selectTopping'); }
  }, []);


  // 디테일 정보 로드 핸들러
  function getDetail(id) {
    setOpenDetail(true);
    const loadDetail = async (val) => {
      try {
        const response = await axios.get(`http://13.209.50.101:3000/pizzas/details/${val}`);
        setDetail(response.data);
      } catch (e) {}
    };
    loadDetail(id);
  }

  // 필터기능 / sorting 기능
  function handleFilter(value, name) {
    if (value === 'filter') {
      switch (name) {
        case 'ALL':
          Update({ result: initialResult });
          break;
        default:
          Update({ result: initialResult.filter((val) => val.brand === name) });
          break;
      }
    } else {
      // sorting 기능
      switch (name) {
        case 'highKcal': Update({ result: initialResult.sort((a, b) => b.m_cal - a.m_cal) });
          break;
        case 'lowKcal': Update({ result: initialResult.sort((a, b) => a.m_cal - b.m_cal) });
          break;
        case 'highPrice': Update({ result: initialResult.sort((a, b) => b.m_price - a.m_price) });
          break;
        case 'lowPrice': Update({ result: initialResult.sort((a, b) => a.m_price - b.m_price) });
          break;
        case 'highInterest': console.log('아직 구현안됐다');
          break;
        case 'highComment': console.log('조금만 기다려 기능구현해서 빨리 배포할게');
          break;
        default: break;
      }
    }
  }

  // 좋아요기능
  function handleFavorite(name) {
    console.log(`좋아요 기능 아직 안나와쏘 ${name}`);
  }

  return (
    <ResultPage
      handleFilter={handleFilter}
      handleFavorite={handleFavorite}
      resultList={result}
      openDetail={openDetail}
      getDetail={getDetail}
      detail={detail}
    />
  );
}
