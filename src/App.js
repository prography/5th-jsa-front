// main을 데려고오고 네브바 등 fixed 되어있는걸 가져옵니다
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Footer, Nav, Snackbar } from 'components';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector } from 'react-redux';
import Main from './containers/Main';

function App() {
  const { showSnackbar, content } = useSelector((state) => (state.snackbar));
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Main />
        <Nav />
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
