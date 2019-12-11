import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({
  authenticated, ...props
}) {
  const { path, component } = props;
  return (
    authenticated ? (
      <Route path={path} component={component} />)
      : (<Redirect to="/login" />)
  );
}

export default AuthRoute;
