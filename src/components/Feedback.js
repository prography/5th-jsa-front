import React from 'react';
import styled from 'styled-components';
import { Snackbar } from 'components';

export default function Feedback({
  handleUpdate, handleSubmit, feedback, snackbar,
}) {
  return (
    <FeedbackStyle className="ResultPage">
      {snackbar && <Snackbar content="제출성공! 피드백 감사합니다!" />}
      <div className="title">서비스 피드백을 주세요</div>
      <div className="sub-title mt-1">
        서비스 이용 시 개선되었으면 하는 사항을 적어주세요. <br />
        여러분의 목소리를 담아 더욱 발전된 서비스를 제공하겠습니다.
      </div>
      <textarea
        rows="10"
        cols="80"
        placeholder="피드백을 자유롭게 작성해주세요"
        className="mt-1"
        onChange={(e) => handleUpdate(e.target.value)}
        value={feedback}
      />
      <div
        className="feedback-button"
        onClick={handleSubmit}
      >
        피드백 제출하기
      </div>
    </FeedbackStyle>
  );
}

const FeedbackStyle = styled.div`
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0;
  .title{
    font-size: 26px;
    text-shadow: 2px 2px 9px rgba(0,0,0,1);
  }
  .sub-title{
    text-shadow: 2px 2px 9px rgba(0,0,0,1);
  }
  textarea{
    padding: 20px;
    border-radius: 4px;
    font-size: 0.875rem;
    box-shadow: 0 3px 6px 4px rgba(0,0,0,0.2);
  }
  .feedback-button{
    width: 300px;
    padding: 10px 30px;
    margin-top: 1rem;
    border-radius: 4px;
    transition: 0.2s;
    background-color: #ffac0d;
    box-shadow: 0 3px 6px 4px rgba(0,0,0,0.2);
    font-weight: bold;
    &:hover{
      background-color: #ff950d;
      box-shadow: 0 3px 6px 10px rgba(0,0,0,0.2);
    }
  }
`;
