import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthRoute({
  ...props
}) {
  const { user } = useSelector((store) => store.user);
  const { path, component } = props;
  return (
    user.access_token !== undefined ? (
      <Route path={path} component={component} />)
      : (<Redirect to="/login" />)
  );
}
