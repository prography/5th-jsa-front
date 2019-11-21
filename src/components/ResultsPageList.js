import React, { useState } from 'react';
import styled from 'styled-components';

import listBg from 'img/detail/list-bg.png';
import heartIcon from 'img/detail/heart-icon.png';
import shareIcon from 'img/detail/share-icon.png';
import chatIcon from 'img/detail/chat-icon.png';
import pizzahut from 'img/detail/pizzahut.png';
import avolo from 'img/detail/avolo.png';
import pizzaschool from 'img/detail/pizzaschool.png';
import papajones from 'img/detail/papajones.png';
import domino from 'img/detail/domino.png';
import mrpizza from 'img/detail/mrpizza.png';

const logo = [
  { name: 'pizzahut', value: pizzahut },
  { name: 'avolo', value: avolo },
  { name: 'pizzaschool', value: pizzaschool },
  { name: 'papajones', value: papajones },
  { name: 'domino', value: domino },
  { name: 'mrpizza', value: mrpizza },
];
const sorting = [
  { name: '높은칼로리순', value: '높은칼로리순' },
  { name: '낮은칼로리순', value: '낮은칼로리순' },
  { name: '높은가격순', value: '높은가격순' },
  { name: '낮은가격순', value: '낮은가격순' },
  { name: '좋아요순', value: '좋아요순' },
  { name: '댓글수순', value: '댓글수순' },
];

export default function ResultsPageList({ handleFilter, OpenDetail, resultList }) {
  return (
    <ResultsPageListStyle>
      <header>
        <div>총 00개</div>
        <div className="sortingWrapper">
          <Menu handleFilter={handleFilter} />
        </div>
      </header>
      <body>
        {/* 데이터 받아오면 index말고 val.id값으로 바꿔서 경고 없애주자 */}
        {resultList.pizzas.map((val, i) => (
          <div className="elementStyle" key={i} onClick={OpenDetail}>
            <div className="element">
              {/* <div className="element-img" /> */}
              <img src={val.image} alt="pizza" className="element-img" />
              <div className="element-content">
                <div className="title">
                  <span>No {i + 1}. </span>
                  {val.name}
                </div>
                <div className="explain">
                  <div><span>브랜드</span>{val.brand}</div>
                  <div><span>칼로리</span>{val.m_cal} kcal</div>
                  <div><span>가격</span>{val.m_price} 원</div>
                </div>
                <div className="iconWrapper">
                  <img src={heartIcon} alt="heart" />
                  <span className="typo-s2">00</span>
                  <img src={shareIcon} alt="share" />
                  <span className="typo-s2">00</span>
                  <img src={chatIcon} alt="chat" />
                  <span className="typo-s2">00</span>
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

function Menu({ handleFilter }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSorting, setOpenSorting] = useState(false);
  return (
    <>
      <span
        onClick={() => { setOpenFilter(true); setOpenSorting(false); }}
        style={{ borderRight: '1px solid white' }}
        className="mr-1 pr-1"
      >브랜드
      </span>
      <span
        onClick={() => { setOpenFilter(false); setOpenSorting(true); }}
      >정렬
      </span>
      {(openSorting || openFilter)
        && <MenuBack onClick={() => { setOpenFilter(false); setOpenSorting(false); }} />}
      <MenuStyle>
        {openFilter && (
          <div className="wrapper wrapper-filter scale-up-tr pointer">
            {logo.map((val, i) => (
              <div onClick={() => { handleFilter('filter', val.name); setOpenFilter(false); }} className="imgWrapper" key={i}>
                <img src={val.value} alt={val.name} />
              </div>
            ))}
          </div>
        )}
        {openSorting && (
          <div className="wrapper wrapper-sorting scale-up-tr pointer">
            {sorting.map((val) => (
              <div onClick={() => { handleFilter('sorting', val.name); setOpenSorting(false); }}>{val.name}</div>
            ))}
          </div>
        )}
      </MenuStyle>
    </>
  );
}

const ResultsPageListStyle = styled.div`
  margin-right: 30px;
  width: 500px;
  height: 100%;
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
    height: calc(100% - 32px);
    overflow: auto;
    .listBg{
      width: 484px;
      margin-bottom: 16px;
    }
    .elementStyle{
      position: relative;
      color: black;
      cursor: pointer;
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


const MenuStyle = styled.div`
  display: inline-block;
  position: relative;
  z-index: 11;
  user-select: none;
  .wrapper{
    position: absolute;
    top: 20px;
    right: 0;
    background-color: white;
    box-shadow: 10px 20px 30px 0 rgba(0,0,0,0.2);
    color: red;
    &.wrapper-filter{
      display: flex;
      padding: 13px 32px;
      border-radius: 100px 0 100px 100px;
      margin-right: 3rem;
      .imgWrapper{
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        border: 1px dashed #efefef;
        margin-right: 5px;
        transition: 0.2s;
        &:last-child{
          margin-right: 0;
        }
        &:hover{
          background-color: #f9f9f9;
        }
        img{
          width: 40px;
          transition: 0.1s ease;
          &:hover{
            width: 48px;
          }
        }
      }
    }
    &.wrapper-sorting{
      padding: 10px 0;
      border-radius: 10px 0 10px 10px;
      width: 150px;
      color: #444;
      div{
        border-top: 1px solid #f2f2f2;
        padding: 8px 0 8px 24px;
        transition: 0.2s;
        &:last-child{
          border-bottom: 1px solid #f2f2f2;
        }
        &:hover{
          background-color: #f2f2f2;
        }
      }
    }
  }
`;

const MenuBack = styled.div`
  position: fixed;
  /* background-color: rgba(0,0,0,0.2); */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
`;
