import React from 'react';
import KakaoLogin from 'react-kakao-login';

export default function Login(props) {
  const { onLoginKakao } = props;
  return (
    <div className="login">
      <KakaoLogin
        jsKey={process.env.REACT_APP_JS_KEY}
        onSuccess={(result) => onLoginKakao(result)}
        onFailure={(result) => console.log(result)}
        render={(_props) => (
          <div onClick={_props.onClick} />
        )}
        getProfile
      />
    </div>
  );
}
