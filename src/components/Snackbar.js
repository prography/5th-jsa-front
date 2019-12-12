import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { hide } from 'modules/snackbar';

export default function Snackbar({ content, showSnackbar }) {
  const dispatch = useDispatch();
  const Hide = useCallback((list) => dispatch((hide(list))), [dispatch]);
  useEffect(() => {
    if (showSnackbar) setTimeout(() => { Hide(); }, 2000);
  }, [showSnackbar]);

  return (
    showSnackbar && (
      <SnackbarStyle>
        <div className="snackbarWrapper">
          <i className="material-icons">report_problem</i>
          {content}
          <i className="material-icons">report_problem</i>
        </div>
      </SnackbarStyle>
    )
  );
}

const SnackbarStyle = styled.div`
  position: absolute;
  width: 98%;
  top: 30px;
  animation: scale-up 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  display: flex;
  justify-content: center;
  z-index: 12;
  .snackbarWrapper{
    color: white;
    display: flex;
    align-items: center;
    font-size: 14px;
    background-color: rgba(0,0,0,0.8);
    padding: 12px 35px;
    i{
      vertical-align: bottom;
      margin: 0 10px;
    }
  }
`;
