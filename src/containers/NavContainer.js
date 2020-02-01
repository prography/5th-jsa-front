import React, { useCallback, useEffect, useState } from 'react';
import { Nav } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from 'modules/user';
import { showSnackbar } from 'modules/snackbar';
import { openLoginDialog, closeLoginDialog } from 'modules/dialog';
import { withRouter } from 'react-router-dom';
import * as api from 'lib/api';

const NavContainer = ({ history }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLogin } = useSelector((store) => store.user);
  const { loginDialogOpen } = useSelector((store) => store.dialog);
  const dispatch = useDispatch();
  const Logout = useCallback((() => dispatch((logout()))), [dispatch]);
  const Login = useCallback((user) => dispatch((login(user))), [dispatch]);
  const OpenLoginDialog = useCallback((user) => dispatch((openLoginDialog(user))), [dispatch]);
  const CloseLoginDialog = useCallback((user) => dispatch((closeLoginDialog(user))), [dispatch]);
  const ShowSnackbar = useCallback((list) => dispatch((showSnackbar(list))), [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('userInfo');
    if (token) {
      api.getSigninCheck(token)
        .then((res) => {
          if (res.data.login === 'true') {
            Login({
              isLogin: true,
              userInfo: {
                accessToken: res.data.user._id,
                kakaoId: res.data.user.kakao,
                nickname: res.data.user.nickname,
                image: res.data.user.profile_image,
              },
            });
          }
        });
    }
  }, []);

  function handleLogout() {
    Logout({ isLogin: false });
    localStorage.clear();
    return history.push('/');
  }

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
      .then((res) => {
        localStorage.setItem('userInfo', res.data.token);
        ShowSnackbar({ content: '로그인 성공!' });
      });
  }

    localStorage.setItem('userInfo',
      JSON.stringify({
        accessToken: result.response.access_token,
      }));
  }

  function onFailure() {}

  return (
    <Nav
      isLogin={isLogin}
      handleLogout={handleLogout}
      onSuccess={onSuccess}
      onFailure={onFailure}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      OpenLoginDialog={OpenLoginDialog}
      CloseLoginDialog={CloseLoginDialog}
      loginDialogOpen={loginDialogOpen}
    />
  );
};

export default withRouter(NavContainer);
