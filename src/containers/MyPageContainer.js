import React, { useState, useEffect, useCallback } from 'react';
import { MyPage } from 'components';
import * as api from 'lib/api';
import { updateInitial, update } from 'modules/topping';
import { useDispatch } from 'react-redux';

export default function MyPageContainer(history) {
  const [user, setUser] = useState([]);
  const [recentTopping, setRecentTopping] = useState([]);
  const [likePizza, setLikePizza] = useState([]);

  const getToken = localStorage.getItem('userInfo');
  console.log(getToken);

  const dispatch = useDispatch();
  const UpdateInitial = useCallback(list => dispatch(updateInitial(list)), [
    dispatch,
  ]);
  const Update = useCallback(list => dispatch(update(list)), [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        api.myPageMain(getToken).then(res => {
          console.log(res);
          setUser(res.data);
        });
      } catch (e) {}
    };
    fetchUser();
  }, []);
  console.log(user.recent);

  const recentToppings = async val => {
    api.myPageMain(val).then(res => {
      const data = res.data.recent;
      if (data) setRecentTopping(recentTopping.concat([data]));
    });
  };
  recentToppings();

  const likePizzas = async val => {
    api.myPageMain(val).then(res => {
      const data = res.data.likes;
      if (data) setLikePizza(recentTopping.concat([data]));
    });
  };
  likePizzas();

  const handleSubmit = () => {
    if (recentTopping.length) {
      const submitTopping = [...new Set(recentTopping.map(val => val.name))];
      console.log(submitTopping);

      const postToppingResult = async () => {
        try {
          api.postPizzaRecommendation(submitTopping.join()).then(res => {
            const data = res.data.pizzas;
            Update({ result: data });
            UpdateInitial({ initialResult: data });
          });
        } catch (e) {}
      };

      postToppingResult();

      history.push('/result');
    }
  };
  return (
    <div>
      <MyPage
        user={user}
        recentTopping={recentTopping}
        likePizza={likePizza}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
