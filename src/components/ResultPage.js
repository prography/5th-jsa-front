import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import listBg from 'img/detail/list-bg.png';
import detailBg from 'img/detail/detail-bg.png';
import emptyHeartIcon from 'img/detail/empty-heart-icon.png';
import heartIcon from 'img/detail/heart-icon.png';
import shareIcon from 'img/detail/share-icon.png';
import chatIcon from 'img/detail/chat-icon.png';

import pizzahut from 'img/detail/pizzahut.png';
import avolo from 'img/detail/avolo.png';
import pizzaschool from 'img/detail/pizzaschool.png';
import papajones from 'img/detail/papajones.png';
import domino from 'img/detail/domino.png';
import mrpizza from 'img/detail/mrpizza.png';


// import { ResultsPageDetail, ResultsPageList } from 'components';


export default function ResultPage() {
  return (
    <div className="ResultPage">
      <Link to="selectTopping" className="ResultsPageHeaderStyle">
        <span>.</span>다시 고르러 가기
      </Link>
      <ResultsWrapperStyle>
        <ResultsPageList />
        <ResultsPageDetail />
      </ResultsWrapperStyle>
    </div>
  );
}

function ResultsPageList() {
  return (
    <ResultsPageListStyle>
      <header>
        <div>총 00개</div>
        <div className="sortingWrapper">
          <span>브랜드</span>
          <span>정렬</span>
        </div>
      </header>
      <body>
        {/* 데이터 받아오면 index말고 val.id값으로 바꿔서 경고 없애주자 */}
        {[...Array(10)].map((val, i) => (
          <div className="elementStyle" key={i}>
            {console.log(val)}
            <div className="element">
              <div className="element-img" />
              <div className="element-content">
                <div className="title">
                  <span>No 1. </span>
                  파파존스 존스페이버릿파ㅇㅇ
                </div>
                <div className="explain">
                  <div><span>브랜드</span>파파존스</div>
                  <div><span>칼로리</span>15500kcal</div>
                  <div><span>가격</span>15000원</div>
                </div>
                <div className="iconWrapper">
                  <img src={heartIcon} alt="heart" />
                  <span>312</span>
                  <img src={shareIcon} alt="share" />
                  <span>10</span>
                  <img src={chatIcon} alt="chat" />
                  <span>8</span>
                </div>
              </div>
            </div>
            <img src={listBg} alt="list background" className="listBg" />
          </div>
        ))}
      </body>
    </ResultsPageListStyle>
  );
}

function ResultsPageDetail() {
  return (
    <ResultsPageDetailStyle>
      <div />
      <img src={detailBg} alt="detail background" className="deatilbg" />
    </ResultsPageDetailStyle>
  );
}


const ResultsWrapperStyle = styled.div`
  padding-top: 100px;
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  display: flex;
`;

const ResultsPageListStyle = styled.div`
  margin-right: 30px;
  width: 500px;
  header{
    color: white;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 20px;
    width: 484px;
    .sortingWrapper{
      span{
        cursor: pointer;
        transition: 0.2s;
        &:first-child{
          padding-right: 16px;
          border-right: 1px solid white;
          margin-right: 1rem;
        }
        &:hover{
          color: rgba(255,255,255,0.7);
        }
      }
    }
  }


  body{
    overflow: auto;
    height: calc(100% - 32px);
    .listBg{
      width: 484px;
      box-shadow: 5px 10px 30px 0 rgba(0, 0, 0, 0.3);
      margin-bottom: 16px;
    }
    .elementStyle{
      position: relative;
      color: black;
      .element{
        position: absolute;
        width: 484px;
        height: calc(100% - 20px);
        padding: 16px;
        display: flex;
        &-img{
          width: 180px;
          height: 160px;
          background-color: #f9f9f9;
          flex-shrink: 0;
        }
        &-content{
          margin-left: 18px;
          .title{
            margin-bottom: 20px;
            font-size: 18px;
            width: 235px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span{
              font-size: 10px;
            }
          }
          .explain{
            font-size: 13px;
            margin-bottom: 16px;
            div{
              margin-bottom: 6px;
            }
            span{
              font-weight: bold;
              width: 60px;
              display: inline-block;
            }
          }
          .iconWrapper{
            color: #777;
            font-size: 14px;
            display: flex;
            align-items: center;
            img{
              width: 18px;
              margin-right: 8px;
            }
            span{
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
`;


const ResultsPageDetailStyle = styled.div`
  width: 750px;
  overflow: hidden;
  position: relative;
  .deatilbg{
    width: 100%;
    margin-top: -80px;
    box-shadow: 20px 20px 40px 0 rgba(0, 0, 0, 0.4);
  }
`;
