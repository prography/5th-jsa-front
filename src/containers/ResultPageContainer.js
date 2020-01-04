import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResultPage } from 'components';
import * as api from 'lib/api';
import { update } from 'modules/topping';
// import { updateInitial, update } from 'modules/topping';

export default function ResultPageContainer({ match }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState();
  const [resultList, setResultList] = useState([]);
  const [result, setResult] = useState(undefined);
  const [hasMore, setHasMore] = useState(false);
  // const [pendingLoadMore, setPendingLoadMore] = useState(false);
  // const [page, setPage] = useState(1);
  const { initialResult } = useSelector((state) => (state.topping));
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);
  // const UpdateInitial = useCallback((list) => dispatch((updateInitial(list))), [dispatch]);

  useEffect(() => {
    api.postPizzaRecommendation(match.params.name)
      .then((res) => {
        if (res.data.num > res.data.pizzas.length) setHasMore(true);
        setResultList(res.data.pizzas);
        setResult(res.data);
      });
  }, []);

  // 디테일 정보 로드 핸들러
  function getDetail(id) {
    setOpenDetail(true);
    api.getPizzaDetail(id)
      .then((res) => setDetail(res.data));
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

  // 인피니트 스크롤
  function loadMore() {
    // console.log(200);
    // if (resultList.length && !pendingLoadMore) {
    //   setPendingLoadMore(true);
    //   api.postPizzaRecommendation(match.params.name, page + 1)
    //     .then((res) => {
    //       if (res.data.num > (resultList.concat(res.data.pizzas)).length) setHasMore(true);
    //       else setHasMore(false);
    //       setPage(page + 1);
    //       setResultList(resultList.concat(res.data.pizzas));
    //       setPendingLoadMore(false);
    //     });
    // }
  }

  return (
    <div>
      <ResultPage
        handleFilter={handleFilter}
        handleFavorite={handleFavorite}
        resultList={resultList}
        result={result}
        openDetail={openDetail}
        getDetail={getDetail}
        detail={detail}
        loadMore={loadMore}
        hasMore={hasMore}
      />
    </div>
  );
}
