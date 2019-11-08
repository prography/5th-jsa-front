import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import h from 'img/nav/h.png';
import x from 'img/nav/x.png';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);
  return (
    <NavStyle>
      <NavButton onClick={onToggle} open={open}> 
        {!open ? <img src={h} alt="menu button" className="h"></img> : <img src={x} alt="menu button" className="x"></img>}
      </NavButton>
      <NavMenu>
          {open && (
              <div className="menus">
                <ul>
                  <li><Link to="LogIn">로그인</Link></li>&nbsp;&nbsp;
                  <li><Link to="EventList">이벤트페이지</Link></li>
                </ul>
              </div>    
            )}
        </NavMenu>
    </NavStyle>

  );
}
const NavStyle = styled.div`
    background: #9F6B36;
    opacity: 0.8;
    display: flex;
    flex-direction: row-reverse;
    position: absolute;
    right: 30px;
    top: 20px;
    align-content: center;
    align-items: center;
    border-radius: 20px 20px;
    
`;
const NavButton = styled.div`
    width: 40px;
    height: 40px;
    background: #714317;
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    .h, .x{
      margin-top: 27%;
    }
    &: hover{
      box-shadow: 0 80px 0 0 rgba(0,0,0,0.25) inset;
    }
    transition: 0.125s all ease-in;
`;
const NavMenu = styled.div`
  .menus ul{
      list-style: none;
      margin: 0 10px 0 15px;
      padding: 0;
    }
    .menus li{
      margin:0;
      display: inline;
    }
    .menus a{
      text-decoration: none;
      color: #EDE6D1;
      &: hover{
        text-decoration: underline;
      }
      transition: 0.125s all ease-in;
    }
`;