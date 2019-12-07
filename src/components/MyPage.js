import React from 'react';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <MyPageStyle>아직 구현안됐다, 마이페이지</MyPageStyle>
  );
}

const MyPageStyle = styled.div`
  background-color: #333;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 50px;
  font-weight: 100;
`;
