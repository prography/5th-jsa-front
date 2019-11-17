import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ResultsPageDetail, ResultsPageList } from 'components';

export default function ResultPage() {
  return (
    <div className="ResultPage">
      <Link to="selectTopping" className="ResultsPageHeaderStyle">
        <i className="material-icons">chevron_left</i>
        다시 고르러 가기
      </Link>
      <ResultsWrapperStyle>
        <ResultsPageList />
        <ResultsPageDetail />
      </ResultsWrapperStyle>
    </div>
  );
}

const ResultsWrapperStyle = styled.div`
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  display: flex;
`;
