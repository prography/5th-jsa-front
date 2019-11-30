import React from 'react';
import styled from 'styled-components';

export default function Snackbar({ content }) {
  return (
  // snackbar && (
    <SnackbarStyle>
      <i className="material-icons">report_problem</i>
      {content}
      {/* 피자가 무거워요!  토핑을 더이상 추가할 수 없습니다! */}
      <i className="material-icons">report_problem</i>
    </SnackbarStyle>
  // )
  );
}

const SnackbarStyle = styled.div`
  position: absolute;
  top: 22px;
  /* top: 50%; */
  /* left: 50%; */
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  background-color: rgba(0,0,0,0.8);
  padding: 12px 35px;
  z-index: 12;
  animation: scale-up 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  i{
    vertical-align: bottom;
    margin: 0 10px;
  }
`;
