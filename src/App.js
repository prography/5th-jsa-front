// main을 데려고오고 네브바 등 fixed 되어있는걸 가져옵니다
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NavContainer } from "containers";
import { Footer } from "components";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Main from "./containers/Main";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <NavContainer />
        <Main />
        <Footer />
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
