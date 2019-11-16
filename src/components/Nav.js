import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import h from 'img/nav/h.png';
import x from 'img/nav/x.png';

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <NavStyle>
      <div className="NavButton" onClick={() => setOpen(!open)} open={open}>
        {!open ? (
          <img src={h} alt="menu button" className="h" />
        ) : (
          <img src={x} alt="menu button" className="x" />
        )}
      </div>
      <div className="NavMenu">
        {open && (
          <div className="menus">
            <ul>
              <li>
                <Link to="MyPage">마이페이지</Link>
              </li>
              &nbsp;
              <li>
                <Link to="EventList">이벤트페이지</Link>
              </li>
              &nbsp;
              <li>
                <Link to="EventList">팀원소개</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </NavStyle>
  );
}
const NavStyle = styled.div`
  background-color: rgba(183, 183, 183, 0.2);
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  right: 30px;
  top: 22px;
  align-content: center;
  align-items: center;
  border-radius: 23px 23px;
  .NavButton {
    width: 46px;
    height: 46px;
    background-color: ${(props) =>
    (props.open ? "rgba(150,150,150, 0.2)" : "rgba(183,183,183, 0.2)")};
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    .h,
    .x {
      margin-top: 30%;
    }
    &: hover {
      box-shadow: 0 80px 0 0 rgba(0, 0, 0, 0.25) inset;
    }
  }
  .NavMenu {
    .menus ul {
      list-style: none;
      margin: 0 10px 0 30px;
      padding: 0;
    }
    .menus li {
      margin: 0;
      display: inline;
    }
    .menus a {
      text-decoration: none;
      color: #fff;
      &: hover {
        font-weight: bold;
      }

      font-size: 15px;
    }
  }
`;
