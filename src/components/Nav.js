import React from 'react';
import styled from 'styled-components';

export default function Nav() {
  return (
    <NavStyle>
      여기가 네브바를 컨트롤 해야하는 부분이야
    </NavStyle>
  );
}

const NavStyle = styled.div`
  position: fixed;
`;
