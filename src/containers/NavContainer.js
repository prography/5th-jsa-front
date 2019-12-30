import React, { useCallback } from 'react';
import { Nav } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from 'modules/user';
import { withRouter } from 'react-router-dom';

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

    localStorage.setItem('userInfo',
      JSON.stringify({
        accessToken: result.response.access_token,
      }));

    return (
      history.push('/'));
  }

  function onFailure() {
    console.log('로그인 에러');
  }

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
