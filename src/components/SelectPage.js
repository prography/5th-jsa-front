import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import bg from "img/select/bg.png";
// 손 애니메이션 추가할 예정
export default function SelectPage() {
  const [visible, setVisible] = useState(false);
  return (
    <SelectStyle>
      <img src={bg} className="bg" alt="bg" />
      <div className="goToOven">
        <Link to="result">🍕피자 굽기▶</Link>
      </div>
    </SelectStyle>
  );
}
const SelectStyle = styled.div`
  .bg {
    position: absolute;
    background-size: cover;
    width: 100%;
    height: 100vh;
    z-index: -5000;
  }

  .goToOven {
    background-color: rgba(150, 150, 150, 0.2);
    display: flex-inline;
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 170px;
    height: 51px;
    text-align: center;
    border-radius: 30px;
    padding: 0;
  }
  .goToOven a {
    align-content: center;
    font-size: 20px;
    text-decoration: none;
    color: #fff;
    position: relative;
    top: 12px;
  }
`;
