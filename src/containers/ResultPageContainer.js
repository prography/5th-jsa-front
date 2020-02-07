import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResultPage, Loading } from 'components';
import * as api from 'lib/api';
import {
  update, updateInitial, updateSmallTopping, updateTopping,
} from 'modules/topping';
import { openLoginDialog } from 'modules/dialog';

export default function ResultPageContainer({ match }) {
  const [resultList, setResultList] = useState([]); // 왼쪽 리스트
  const [openDetail, setOpenDetail] = useState(false); // 디테일 페이지 열기
  const [detail, setDetail] = useState();
  const [comment, setComment] = useState('');
  const [selectedTopping, setSelectedTopping] = useState([]);
  const [pending, setPending] = useState(true); // pending


  const { initialResult, smallToppings, submitTopping } = useSelector((state) => (state.topping));
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);
  const UpdateTopping = useCallback((list) => dispatch((updateTopping(list))), [dispatch]);
  const UpdateInitial = useCallback((list) => dispatch((updateInitial(list))), [dispatch]);
  const UpdateSmallTopping = useCallback((list) => dispatch((updateSmallTopping(list))), [dispatch]);
  const OpenLoginDialog = useCallback((user) => dispatch((openLoginDialog(user))), [dispatch]);
  const { userInfo, isLogin } = useSelector((store) => store.user);

  const token = localStorage.getItem('userInfo');

  function loadResult() {
    const data = { items: match.params.name };
    const Token = !submitTopping.length ? undefined : token;
    api.postPizzaRecommendation(data, Token)
      .then((res) => {
        setPending(false);
        UpdateInitial(res.data.pizzas);
        setResultList(res.data.pizzas);
        UpdateTopping([]);
      });
  }

  function loadDetail(id) {
    setOpenDetail(true);
    api.getPizzaDetail(id)
      .then((res) => setDetail(res.data));
  }

  useEffect(() => {
    // 결과 데이터를 불러옵니다!
    loadResult();
    // smallTopping 데이터 없을 경우 가져오는 로직!
    if (!smallToppings.meat.length) {
      api.getPizzaToppings()
        .then((res) => {
          UpdateSmallTopping(res.data);
        });
    }
    setSelectedTopping(match.params.name.split(','));
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
          setResultList(initialResult);
          // Update({ result: initialResult });s
          break;
        default:
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
    console.log(val);
    if (isLogin) {
      api.getPizzaLike(val, token)
        .then(() => {
          loadDetail(val);
          loadResult();
        });
    } else OpenLoginDialog();
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
        api.postPizzaComments(data, token)
        // 데이터 성공적으로 보내면, 데이터 리셋 해야된다.
          .then(() => {
            loadDetail(val);
            loadResult();
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
        openDetail={openDetail}
        getDetail={getDetail}
        detail={detail}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
        userInfo={userInfo}
        handleKeyPress={handleKeyPress}
        comment={comment}
        smallToppings={Object.values(smallToppings).flat()}
        selectedTopping={selectedTopping}
      />
      {pending && <Loading />}
    </div>
  );
}
