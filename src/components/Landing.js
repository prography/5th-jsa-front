import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import button from 'img/landing/button.png';
import buttonPush from 'img/landing/buttonPush.png';
import sauce from 'img/landing/sauce.png';

export default function Landing() {
  const [hover, setHover] = useState(false);
  return (
    <LandingStyle>
      <div className="content">
        <img src={sauce} alt="sauce" className="sauce" />
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="main">
            토핑만
            <br />
            고르세요
          </div>
          <div className="sub">
            좋아하는 토핑을 도우에 올리고 화덕에 굽기만 하세요.
            <br />
            🍕해당 토핑이 들어간 피자 리스트를 보여드립니다.🍕
          </div>
          <Link to="/selectTopping">
            <div
              className="btnWrapper"
              onMouseOver={() => setHover(true)}
              onFocus={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {hover ? (
                <img src={buttonPush} alt="start button" />
              ) : (
                <img src={button} alt="start button" />
              )}
            </div>
          </Link>
        </div>
      </div>
    </LandingStyle>
  );
}

const LandingStyle = styled.div`
  background-color: #be3827;
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .sauce {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content {
    text-align: center;
    .main {
      font-size: 4.3rem;
      line-height: 1.2;
      margin-top: 3rem;
      font-weight: 100;
    }
    .sub {
      font-weight: 300;
      line-height: 1.5;
      margin-bottom: 5rem;
      margin-top: 1rem;
    }
    .btnWrapper {
      width: 9.375rem;
      height: auto;
      display: inline-block;
      img {
        width: 9.375rem;
        height: 9.375rem;
      }
    }
  }
`;
