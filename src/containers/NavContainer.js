import React, { useCallback } from 'react';
import { Nav } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from 'modules/user';
import { showSnackbar } from 'modules/snackbar';
import { withRouter } from 'react-router-dom';
import * as api from 'lib/api';

const NavContainer = ({ history }) => {
  const { isLogin } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Logout = useCallback((() => dispatch((logout()))), [dispatch]);
  const ShowSnackbar = useCallback((list) => dispatch((showSnackbar(list))), [dispatch]);

  function handleLogout() {
    Logout({ isLogin: false });
    localStorage.clear();
    return history.push('/');
  }

  const Login = useCallback((user) => dispatch((login(user))), [dispatch]);

  function onSuccess(result) {
    // 스토어에 저장
    console.log(result);
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
      .then((res) => {
        // 카카오 로그인하고, 토큰을 받는데 DB에 아이디 값이 없을 경우 저장 후 토큰 전달, 있으면 토큰 전달
        // 그러면 로컬스토리지에는 이 response의 토큰 값이 들어가게 되는게 맞나요?
        localStorage.setItem('userInfo',
          JSON.stringify({
            accessToken: res.data.token,
          }));
      });
    ShowSnackbar({ content: '로그인 성공!' });
  }

  function onFailure(result) {
    console.log(result);
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
