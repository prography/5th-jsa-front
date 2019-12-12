import React, { useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loginSuccess } from 'modules/user';
import { useDispatch } from 'react-redux';

export default function AuthRoute({
  ...props
}) {
  const dispatch = useDispatch();
  const LoginSuccess = useCallback(() => dispatch((loginSuccess())), [dispatch]);
  const { path, component } = props;
  return (
    LoginSuccess ? (
      <Route path={path} component={component} />)
      : (<Redirect to="/login" />)
  );
}
