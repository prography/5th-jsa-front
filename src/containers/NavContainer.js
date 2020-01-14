import React, { useCallback } from 'react';
import { Nav } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from 'modules/user';
import { withRouter } from 'react-router-dom';
import * as api from 'lib/api';

const NavContainer = ({ history }) => {
  const { isLogin } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Logout = useCallback((() => dispatch((logout()))), [dispatch]);

  function handleLogout() {
    Logout({ isLogin: false });
    localStorage.clear();
    return history.push('/');
  }

  const Login = useCallback((user) => dispatch((login(user))), [dispatch]);

  function onSuccess(result) {
    // 스토어에 저장
    Login({
      isLogin: true,
      userInfo: {
        accessToken: result.response.access_token,
        kakaoId: result.profile.id,
        nickname: result.profile.kakao_account.profile.nickname,
        image: result.profile.kakao_account.profile.profile_image_url,
      },
    });
    api.getKakaoSignin(result.response.access_token)
      .then((res) => localStorage.setItem('userInfo', res.data.token));
  }

  function onFailure() {}

  return (
    <Nav
      isLogin={isLogin}
      handleLogout={handleLogout}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

export default withRouter(NavContainer);
