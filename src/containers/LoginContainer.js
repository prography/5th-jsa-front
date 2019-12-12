import React, { useCallback } from 'react';
import { login } from 'modules/user';
import { useDispatch } from 'react-redux';
import KakaoLogin from 'react-kakao-login';


export default function LoginContainer() {
  const dispatch = useDispatch();
  const Login = useCallback((user) => dispatch((login(user))), [dispatch]);
  function onSuccess(result) {
    // 스토어에 저장
    console.log(result);
    Login({
      access_token: result.response.access_token,
      kakao_id: result.profile.id,
      nickname: result.profile.kakao_account.profile.nickname,
      image: result.profile.kakao_account.profile.profile_image_url,
    });
  }

  function onFailure(result) {
    alert('로그인 에러');
    console.log(result);
  }
  return (
    <div>
      <KakaoLogin
        jsKey={process.env.REACT_APP_JS_KEY}
        getProfile
        onSuccess={(result) => onSuccess(result)}
        onFailure={(result) => onFailure(result)}
        buttonText="kakao"
      />
    </div>
  );
}
