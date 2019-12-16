import React, { useCallback } from 'react';
import { Nav } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'modules/user';
import { withRouter } from 'react-router-dom';

const NavContainer = ({ history }) => {
  const { isLogin } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Logout = useCallback((() => dispatch((logout()))), [dispatch]);
  function handleLogout() {
    Logout({ isLogin: false });
    localStorage.clear();
    return history.push('/');
  }
  return (
    <Nav
      isLogin={isLogin}
      handleLogout={handleLogout}
    />
  );
};

export default withRouter(NavContainer);
