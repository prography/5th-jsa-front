import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';

import kakao from 'img/nav/kakao.png';
import l from 'img/loading/l.png';
import o from 'img/loading/o.png';
import g from 'img/loading/g.png';
import i from 'img/loading/i.png';
import n from 'img/loading/n.png';

export default function Nav({
  isLogin, handleLogout, onSuccess, onFailure,
}) {
  const [open, setOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  function submitLogin(res) {
    setDialogOpen(false);
    onSuccess(res);
  }

  return (
    <div>
      {dialogOpen
        && (
        <LoginDialogStyle>
          <div className="blackbg" onClick={() => setDialogOpen(!dialogOpen)} />
          <div className="loginWrapper scale-in-center">
            <div className="loginImg">
              <img src={l} alt="l" width="30" />
              <img src={o} alt="o" width="30" />
              <img src={g} alt="g" width="30" />
              <img src={i} alt="i" width="30" />
              <img src={n} alt="n" width="30" />
            </div>
            <div className="typo-s1 mb-1 center">로그인해서 댓글, 좋아요, 마이페이지 기능을<br />사용해보세요!</div>
            <KakaoLogin
              jsKey={process.env.REACT_APP_JS_KEY}
              getProfile
              onSuccess={(res) => submitLogin(res)}
              onFailure={(res) => onFailure(res)}
              throughTalk
            >
              <div className="kakaoWrapper">
                <img src={kakao} alt="kakaologo" width="30" />
                <div className="typo-s1 ml-1">카카오톡 계정으로 로그인</div>
              </div>
            </KakaoLogin>
          </div>
        </LoginDialogStyle>
        )}
      <NavStyle open={open}>
        <div className="NavButton" onClick={() => setOpen(!open)} open={open}>
          {!open
            ? <i className="material-icons">menu</i>
            : <i className="material-icons">close</i>}
        </div>
        <div className="NavMenu">
          {open && (
            <div className="menus scale-up-hor-right">
              <Link to="/">홈</Link>
              {isLogin
                ? <Link to="MyPage">마이페이지</Link>
                : <button type="button" onClick={() => setDialogOpen(!dialogOpen)}>로그인</button>}
              <Link to="EventPage">이벤트</Link>
              <Link to="AboutUs">팀원소개</Link>
              <Link to="feedback">피드백</Link>
              {isLogin && <span onClick={handleLogout}>로그아웃</span> }
            </div>
          )}
        </div>
      </NavStyle>
    </div>
  );
}

const LoginDialogStyle = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginWrapper{
    width: 300px;
    height: auto;
    background-color: white;
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 10px 20px 30px 0 rgba(0,0,0,0.3);
  }
  .blackbg{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
  }
  .kakaoWrapper{
    width: 268px;
    background-color: #f3e027;
    box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.1);
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginImg{
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    img{
      margin-right: 5px;
    }
  }
`;

const NavStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  right: 30px;
  top: 22px;
  align-content: center;
  align-items: center;
  border-radius: 23px 23px;
  z-index: 3;
  .NavButton {
    width: 41px;
    height: 41px;
    user-select: none;
    background-color: ${(props) => (props.open ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)')};
    border-radius: 50%;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      color: white;
    }
    &:hover {
      background-color: ${(props) => (props.open ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)')}
    }
  }
  .NavMenu {
    .menus{
      margin: 0 10px 0 34px;
      display: flex;
    }
    .menus a, span, button {
      text-decoration: none;
      color: #fff;
      margin-right: 13px;
      font-size: 12px;
      transition: 0.2s;
      &:hover {
        font-weight: bold;
      }
    }
  }
`;
