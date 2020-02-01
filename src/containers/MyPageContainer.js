import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MyPage } from 'components';
import * as api from 'lib/api';
import { update, updateInitial } from 'modules/topping';

export default function MyPageContainer({ match }) {
  const [user, setUser] = useState([]);
  const [recentTopping, setRecentTopping] = useState([]);
  const [likePizza, setLikePizza] = useState([]);
  const [userId, setUserId] = useState('');
  const [detail, setDetail] = useState();
  const [resultList, setResultList] = useState([]);
  const [result, setResult] = useState(undefined);
  const getToken = localStorage.getItem('userInfo');
  const { initialResult } = useSelector(state => state.topping);
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback(list => dispatch(update(list)), [dispatch]);
  const UpdateInitial = useCallback(list => dispatch(updateInitial(list)), [
    dispatch,
  ]);

  const { userInfo, isLogin } = useSelector(store => store.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        api.myPageMain(getToken).then((res) => {
          console.log(res);
          setUser(res.data);
          setLikePizza(res.data.likes);
          setRecentTopping(res.data.recent);
        });
      } catch (e) {}
    };
    fetchUser();
  }, []);

  console.log(recentTopping);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        api.getSigninCheck(getToken).then(res => {
          console.log(res);
          setUserId(res.data.user.kakao);
        });
      } catch (e) {}
    };
    fetchUserId();
  }, []);

  function loadResult() {
    api.postPizzaRecommendation(match.params.name).then(res => {
      UpdateInitial(res.data.pizzas);
      setResultList(res.data.pizzas);
      setResult(res.data);
      // if (res.data.num > res.data.pizzas.length) setHasMore(true);
    });
  }

  function loadDetail(id) {
    // setOpenDetail(true);
    api.getPizzaDetail(id).then(res => {
      console.log(res.data);
      setDetail(res.data);
    });
  }
  function getDetail(id) {
    setDetail(); // detail 컴포넌트 리셋후 다시 보여준다.
    loadDetail(id);
  }
  const handleFavorite = _id => {
    setLikePizza(likePizza.filter(like => like._id !== _id));
    if (isLogin) {
      api.getPizzaLike(_id).then(() => {
        loadDetail(_id);
        loadResult();
      });
    }
  };

  // const handleSubmit = () => {
  //   if (recentTopping.length) {
  //     const submitTopping = [...new Set(recentTopping.map(val => val.name))];
  //     console.log(submitTopping);

  //     const postToppingResult = async () => {
  //       try {
  //         api.postPizzaRecommendation(submitTopping.join()).then(res => {
  //           const data = res.data.pizzas;
  //           Update({ result: data });
  //           UpdateInitial({ initialResult: data });
  //         });
  //       } catch (e) {}
  //     };

  //     postToppingResult();

  //     history.push('/result');
  //   }
  // };
  return (
    <div>
      <MyPage
        user={user}
        recentTopping={recentTopping}
        likePizza={likePizza}
        handleFavorite={handleFavorite}
        detail={detail}
        getDetail={getDetail}
        userInfo={userInfo}
        // handleSubmit={handleSubmit}
      />
    </div>
  );
}
