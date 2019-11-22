import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ResultsPageDetail, ResultsPageList } from 'components';
import bgLogo from 'img/detail/bg-logo.png';

export default function ResultPage({ handleFilter, handleFavorite, resultList }) {
  const [openDetail, setOpenDetail] = useState(false);
  return (
    <div className="ResultPage">
      <a href="http://www.prography.org" target="_blank" rel="noopener noreferrer">
        <img src={bgLogo} alt="prography logo" className="prographyLogo" />
      </a>
      <Link to="selectTopping" className="ResultsPageHeaderStyle">
        <i className="material-icons">chevron_left</i>
        다시 고르러 가기
      </Link>
      <ResultsWrapperStyle>
        <ResultsPageList handleFilter={handleFilter} OpenDetail={() => setOpenDetail(true)} resultList={resultList} />
        {/* 리스트에서 하나를 클릭하면 */}
        {openDetail && <ResultsPageDetail handleFavorite={handleFavorite} />}
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
