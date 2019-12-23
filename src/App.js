// main을 데려고오고 네브바 등 fixed 되어있는걸 가져옵니다
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'modules/user';
import { BrowserRouter } from 'react-router-dom';
import { Footer, Nav, Snackbar } from 'components';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector } from 'react-redux';
import Main from './containers/Main';
import { NavContainer } from './containers';

function App() {
  const dispatch = useDispatch();
  const Login = useCallback((user) => dispatch((login(user))), [dispatch]);

  const userInfo = localStorage.getItem('userInfo');
  const user = userInfo !== null ? JSON.parse(userInfo) : ({});
  // console.log('user', user);
  // userInfo를 localStorage에서 검사하고 없으면 store에도 없으므로, localStore에서 받아온 값을 store에 추가
  if (Object.entries(user).length !== 0) {
    Login({
      isLogin: true,
      userInfo: {
        accessToken: user.accessToken,
      },
    });
  }
  const { showSnackbar, content } = useSelector((state) => (state.snackbar));
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Main />
        <NavContainer />
        <Footer />
        <Snackbar
          showSnackbar={showSnackbar}
          content={content}
        />
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
