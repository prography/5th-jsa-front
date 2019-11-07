// main을 데려고오고 네브바 등 fixed 되어있는걸 가져옵니다
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './containers/Main';


function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
