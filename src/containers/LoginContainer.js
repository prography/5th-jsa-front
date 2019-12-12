import React from 'react';

import KakaoLogin from 'react-kakao-login';


export default function LoginContainer() {
  function onSuccess(result) {
    console.log(result);
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
