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
  isLogin, handleLogout, onSuccess, onFailure, OpenLoginDialog, CloseLoginDialog, loginDialogOpen,
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      {loginDialogOpen
        && (
        <LoginDialogStyle>
          <div className="blackbg" onClick={CloseLoginDialog} />
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
              onSuccess={(res) => onSuccess(res)}
              onFailure={(res) => onFailure(res)}
              throughTalk
              render={(props) => (
                <div
                  className="kakaoWrapper"
                  onClick={() => { props.onClick(); CloseLoginDialog(); }}
                >
                  <img src={kakao} alt="kakaologo" width="30" />
                  <div className="typo-s1 ml-1">카카오톡 계정으로 로그인</div>
                </div>
              )}
            />
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
                ? <Link to="/MyPage">마이페이지</Link>
                : <button type="button" onClick={OpenLoginDialog}>로그인</button>}
              <Link to="/AboutUs">팀원소개</Link>
              <Link to="/feedback">피드백</Link>
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
  right: 1.875rem;
  top: 1.375rem;
  align-content: center;
  align-items: center;
  border-radius: 23px 23px;
  z-index: 3;
  @media (max-width: 479px) {
    right: 1.375rem;
  }
  .NavButton {
    width: 2.5rem;
    height: 2.5rem;
    user-select: none;
    background-color: ${(props) => (props.open ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)')};
    border-radius: 50%;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 479px) {
      width: 3rem;
      height: 3rem;
    }
    i{
      color: white;
      @media (max-width: 479px) {
        font-size: 20px;
      }
    }
    &:hover {
      background-color: ${(props) => (props.open ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)')}
    }
  }
  .NavMenu {
    .menus{
      margin: 0 0.625rem 0 1.5rem;
      display: flex;
    }
    .menus a, span, button {
      text-decoration: none;
      color: #fff;
      margin-right: 0.625rem;
      font-size: 0.625rem;
      transition: 0.2s;
      &:hover {
        font-weight: bold;
      }
      @media (max-width: 479px) {
        font-size: 11px;
        margin-right: 0.875rem;
      }
    }
  }
`;
