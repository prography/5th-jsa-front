import React from 'react';
import { Nav } from 'components';
import { useSelector } from 'react-redux';


export default function NavContainer() {
  const { user } = useSelector((store) => store.user);
  const isLogin = user.access_token !== undefined ? '마이페이지' : '로그인';
  return (
    <Nav
      isLogin={isLogin}
    />
  );
}
