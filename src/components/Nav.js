import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Nav({ isLogin }) {
  const [open, setOpen] = useState(true);
  console.log(isLogin);
  return (
    <NavStyle open={open}>
      {/* styled-component로 props 값을 전달하려면 이렇게 넣어줘야해! styled-component에서 open 값을 못 읽구 있길래 추가해쏘 */}
      <div className="NavButton" onClick={() => setOpen(!open)} open={open}>
        {!open
          ? <i className="material-icons">menu</i>
          : <i className="material-icons">close</i>}
      </div>
      <div className="NavMenu">
        {open && (
          <div className="menus scale-up-hor-right">
            <Link to="/">홈</Link>
            <Link to="MyPage">{isLogin}</Link>
            <Link to="EventPage">이벤트</Link>
            <Link to="AboutUs">팀원소개</Link>
            <Link to="feedback">피드백</Link>
          </div>
        )}
      </div>
    </NavStyle>
  );
}

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
    .menus a {
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
