// router를 세팅하는 곳 입니다.
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Landing, EventList,
} from 'components';
import {
  ResultPageContainer, SelectPageContainer, MyPageContainer,
} from 'containers';


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
