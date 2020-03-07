// router를 세팅하는 곳 입니다.
// lazy는 처음에 랜딩 되는 페이지만 import 해서 보여준다. 그 페이지 들어가기 전까지 로드 안해줘
// Suspense 처음 로딩될때 로딩되는 페이지를 추가해준다.
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Landing = lazy(() => import('components/Landing'));
const EventList = lazy(() => import('components/EventList'));
const AboutUs = lazy(() => import('components/AboutUs'));
const AuthRoute = lazy(() => import('containers/AuthRouteContainer'));
const ResultPageContainer = lazy(() => import('containers/ResultPageContainer'));
const SelectPageContainer = lazy(() => import('containers/SelectPageContainer'));
const MyPageContainer = lazy(() => import('containers/MyPageContainer'));
const FeedbackContainer = lazy(() => import('containers/FeedbackContainer'));

const Main = () => (
  <Suspense fallback={<Dody />}>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/selectTopping" component={SelectPageContainer} />
      <Route path="/result/:name" component={ResultPageContainer} />
      <AuthRoute path="/mypage" component={MyPageContainer} />
      <Route path="/EventPage" component={EventList} />
      <Route path="/feedback" component={FeedbackContainer} />
      <Route path="/AboutUs" component={AboutUs} />
    </Switch>
  </Suspense>
);


function Dody() {
  return (
    <div>
      ddd
    </div>
  );
}


export default Main;
