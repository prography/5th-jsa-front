import React, { useState } from 'react';
import styled from 'styled-components';

import { Menu } from 'components';

import listBg from 'img/detail/list-bg.png';
import heartIcon from 'img/detail/heart-icon.png';
import shareIcon from 'img/detail/share-icon.png';
import chatIcon from 'img/detail/chat-icon.png';

export default function ResultsPageList() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSorting, setOpenSorting] = useState(false);
  return (
    <ResultsPageListStyle>
      <header>
        <div>총 00개</div>
        <div className="sortingWrapper">
          {/* 이걸 누르면, 메뉴가 열린다. */}
          <Menu type="filter" openFilter={openFilter} closeFilter={() => setOpenFilter(false)}>
            <span onClick={() => setOpenFilter(true)} className="filter">브랜드</span>
          </Menu>
          {openFilter && <MenuBack onClick={() => setOpenFilter(false)} />}
          <Menu type="sorting" openSorting={openSorting} closeSorting={() => setOpenSorting(false)}>
            <span onClick={() => setOpenSorting(true)}>정렬</span>
          </Menu>
          {openSorting && <MenuBack onClick={() => setOpenSorting(false)} />}

        </div>
      </header>
      <body>
        {/* 데이터 받아오면 index말고 val.id값으로 바꿔서 경고 없애주자 */}
        {[...Array(10)].map((val, i) => (
          <div className="elementStyle" key={i}>
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
        transition: 0.2s;
        cursor: pointer;
        &:hover{
          color: rgba(255,255,255,0.7);
        }
      }
      .filter{
        padding-right: 16px;
        border-right: 1px solid white;
        margin-right: 1rem;
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

const MenuBack = styled.div`
  position: fixed;
  background-color: rgba(0,0,0,0.2);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
`;
