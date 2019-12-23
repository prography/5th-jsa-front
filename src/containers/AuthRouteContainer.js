import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthRoute({ path, component }) {
  const { isLogin } = useSelector((store) => store.user);
  return (
    isLogin ? (
      <Route path={path} component={component} />)
      : (<Redirect to="/login" />)
  );
}
