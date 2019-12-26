import React, { useCallback } from 'react';
import { login } from 'modules/user';
import { useDispatch } from 'react-redux';
import KakaoLogin from 'react-kakao-login';
// higher order component
import { withRouter } from 'react-router-dom';


const LoginContainer = ({ history }) => {
  // history : 브라우저 api ( 새로고침 안함 )
  const dispatch = useDispatch();
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

    localStorage.setItem('userInfo',
      JSON.stringify({
        accessToken: result.response.access_token,
      }));

    return history.push('/');
  }

  function onFailure(result) {
    alert('로그인 에러');
  }
  return (
    <KakaoLogin
      jsKey={process.env.REACT_APP_JS_KEY}
      getProfile
      onSuccess={(result) => onSuccess(result)}
      onFailure={(result) => onFailure(result)}
      throughTalk
      render={(props) => (<a href="#" onClick={props.onClick}>로그인</a>)}
    />
  );
};

export default withRouter(LoginContainer);
