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
  const [comment, setComment] = useState('');
  const [selectedTopping, setSelectedTopping] = useState([]);
  const [smallToppings, setSmallToppings] = useState([]); // small topping

  const [pending, setPending] = useState(true); // pending
  // const [smallToppings, setSmallToppings] = useState({
  //   meat: [], sauce: [], cheese: [], seafood: [], vegetable: [], etc: [],
  // }); // small topping

  const { initialResult } = useSelector((state) => (state.topping));
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);
  const UpdateInitial = useCallback((list) => dispatch((updateInitial(list))), [dispatch]);
  const OpenLoginDialog = useCallback((user) => dispatch((openLoginDialog(user))), [dispatch]);
  const { userInfo, isLogin } = useSelector((store) => store.user);

  const token = localStorage.getItem('userInfo');

  function loadResult() {
    const data = { items: match.params.name };
    api.postPizzaRecommendation(data, token)
      .then((res) => {
        setPending(false);
        //  ! 데이터가 없으면 없다고 뜨게?
        UpdateInitial(res.data.pizzas);
        setResultList(res.data.pizzas);
      });
  }

  function loadDetail(id) {
    setOpenDetail(true);
    api.getPizzaDetail(id)
      .then((res) => setDetail(res.data));
  }

  // 몇개가 매칭된 피자 입니다. 리스트랑 디테일에서 둘다 보여주기 (리덕스에서 불러와서 하기)
  useEffect(() => {
    loadResult();
    // smallTopping 가져오는 로직! (리듀서로 공유하기 서로)
    api.getPizzaToppings()
      .then((res) => {
        setSmallToppings(Object.values(res.data).flat());
      });
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
        openDetail={openDetail}
        getDetail={getDetail}
        detail={detail}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
        userInfo={userInfo}
        handleKeyPress={handleKeyPress}
        comment={comment}
        smallToppings={smallToppings}
        selectedTopping={selectedTopping}
      />
      {pending && <Loading />}
    </div>
  );
}
