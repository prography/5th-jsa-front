import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResultPage, Loading } from 'components';
import * as api from 'lib/api';
import { update, updateInitial } from 'modules/topping';
import { openLoginDialog } from 'modules/dialog';

export default function ResultPageContainer({ match }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState();
  const [resultList, setResultList] = useState([]);
  const [result, setResult] = useState(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(false);
  const [comment, setComment] = useState('');

  const { initialResult } = useSelector((state) => (state.topping));
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);
  const UpdateInitial = useCallback((list) => dispatch((updateInitial(list))), [dispatch]);
  const OpenLoginDialog = useCallback((user) => dispatch((openLoginDialog(user))), [dispatch]);
  const { userInfo, isLogin } = useSelector((store) => store.user);

  function loadResult() {
    api.postPizzaRecommendation(match.params.name)
      .then((res) => {
        UpdateInitial(res.data.pizzas);
        setResultList(res.data.pizzas);
        setResult(res.data);
        if (res.data.num > res.data.pizzas.length) setHasMore(true);
      });
  }

  function loadDetail(id) {
    setOpenDetail(true);
    api.getPizzaDetail(id)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      });
  }

  // 몇개가 매칭된 피자 입니다. 리스트랑 디테일에서 둘다 보여주기 (리덕스에서 불러와서 하기)
  useEffect(() => {
    loadResult();
  }, []);

  // 디테일 정보 로드 핸들러
  function getDetail(id) {
    setDetail(); // detail 컴포넌트 리셋후 다시 보여준다.
    loadDetail(id);
  }

  // 필터기능 / sorting 기능
  function handleFilter(value, name) {
    console.log(value, name);
    console.log(initialResult.filter((val) => val.brand === name));

    if (value === 'filter') {
      switch (name) {
        case 'ALL':
          console.log(initialResult);
          setResult(initialResult);
          setResultList(initialResult);
          // Update({ result: initialResult });
          break;
        default:
          console.log(2);
          console.log(initialResult.filter((val) => val.brand === name));
          setResult(initialResult.filter((val) => val.brand === name));
          setResultList(initialResult);
          // Update({ result: initialResult.filter((val) => val.brand === name) });
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
  function handleFavorite(val) {
    if (isLogin) {
      api.getPizzaLike(val)
        .then(() => {
          setHasMore(false);
          setPage(1);
          loadDetail(val);
          loadResult();
        });
    } else OpenLoginDialog();
  }

  // 인피니트 스크롤
  function loadMore() {
    console.log(2);
    // console.log(hasMore);
    // if (!pending && resultList.length) {
    //   setPending(true);
    //   api.postPizzaRecommendation(match.params.name, page + 1)
    //     .then((res) => {
    //       if (res.data.num > (resultList.concat(res.data.pizzas)).length) setHasMore(true);
    //       else setHasMore(false);
    //       setPage(page + 1);
    //       setResultList(resultList.concat(res.data.pizzas));
    //       setPending(false);
    //     });
    // }
  }

  // 여기서 엔터 누르면 바로 제출 되게 해야됩니다.
  function handleUpdate(evt) {
    setComment(evt.target.value);
  }

  function handleSubmit(val) {
    // 댓글 제출 후!!1 데이터가 업데이트 되어야 합니다
    if (isLogin) {
      const data = { pizza: val, comment };
      if (comment !== '') {
        api.postPizzaComments(data)
          .then((res) => {
            setComment('');
          })
          .catch((err) => console.log(err));
      }
    } else OpenLoginDialog();
  }

  function handleKeyPress(e, val) {
    if (e.key === 'Enter') {
      handleSubmit(val);
    }
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
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
        userInfo={userInfo}
        handleKeyPress={handleKeyPress}
        comment={comment}
      />
      {resultList.length === 0 && <Loading />}
    </div>
  );
}
