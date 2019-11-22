import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterStyle>
      <footer>
        Copyright (c) Prography Prography 5기 jsa 팀 도디 승아 동원 용민
      </footer>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  position: relative;
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 12px;
    color: #ffffff66;
    margin: 0 0 10px 10px;
  }
`;
