import React, { useState, useEffect, useCallback } from 'react';
import { MyPage } from 'components';
import * as api from 'lib/api';
import { login } from 'modules/user';

export default function MyPageContainer() {
  const [user, setUser] = useState([]);
  const getToken = localStorage.getItem('userInfo');
  console.log(getToken);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        api.myPageMain(getToken).then((res) => {
          console.log(res);
          setUser(res.data);
        });
      } catch (e) {}
    };
    fetchUser();
  }, []);
  console.log(user);
  return (
    <div>
      <MyPage user={user} />
    </div>
  );
}
