// router를 세팅하는 곳 입니다.
// lazy는 처음에 랜딩 되는 페이지만 import 해서 보여준다. 그 페이지 들어가기 전까지 로드 안해줘
// Suspense 처음 로딩될때 로딩되는 페이지를 추가해준다.
// import React, { lazy, Suspense } from 'react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Landing, EventList } from 'components';
import {
  ResultPageContainer, SelectPageContainer, MyPageContainer,
} from 'containers';

// const Result = lazy(() => import('container/ResultPageContainer'));


const Main = () => (
  <>
    <Route exact path="/" component={Landing} />
    <Route path="/selectTopping" component={SelectPageContainer} />
    <Switch>
      {/* <Route path="/result/:pizzaname" component={ResultPageContainer} /> */}
      <Route path="/result" component={ResultPageContainer} />
    </Switch>
    <Route path="/mypage" component={MyPageContainer} />
    <Route path="/EventPage" component={EventList} />
  </>
);


export default Main;
