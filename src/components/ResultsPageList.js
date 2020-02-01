import React, { useState } from 'react';
import styled from 'styled-components';

import listBg from 'img/detail/list-bg.png';
import heartIcon from 'img/detail/heart-icon.png';
import chatIcon from 'img/detail/chat-icon.png';

import pizzahut from 'img/detail/pizzahut.png';
import avolo from 'img/detail/avolo.png';
import pizzaschool from 'img/detail/pizzaschool.png';
import papajones from 'img/detail/papajones.png';
import domino from 'img/detail/domino.png';
import mrpizza from 'img/detail/mrpizza.png';

const logo = [
  { name: 'ALL', value: null },
  { name: '피자헛', value: pizzahut },
  { name: '피자알볼로', value: avolo },
  { name: '피자스쿨', value: pizzaschool },
  { name: '파파존스', value: papajones },
  { name: '도미노피자', value: domino },
  { name: '미스터피자', value: mrpizza },
];
const sorting = [
  { name: 'highKcal', value: '높은칼로리순' },
  { name: 'lowKcal', value: '낮은칼로리순' },
  { name: 'highPrice', value: '높은가격순' },
  { name: 'lowPrice', value: '낮은가격순' },
  { name: 'highInterest', value: '좋아요순' },
  { name: 'highComment', value: '댓글수순' },
];

export default function ResultsPageList({
  handleFilter, getDetail, resultList, smallToppings, selectedTopping,
}) {
  const comma = (val) => String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <ResultsPageListStyle>
      <SelectedToppingList smallToppings={smallToppings} selectedTopping={selectedTopping} />
      <header>
        <div>총 {resultList.length}개</div>
        <div className="sortingWrapper">
          <Menu handleFilter={handleFilter} />
        </div>
      </header>
      <div style={{ height: 'calc(100% - 114px)', overflow: 'auto' }}>
        {resultList.length === 0
          ? <div className="emptyResultList">결과가 없습니다</div>
          : resultList.map((val, i) => (
            <div className="elementStyle" key={i} onClick={() => getDetail(val._id)}>
              <div className="element">
                <div className="element-img-wrapper">
                  <img src={logo.find((el) => el.name === val.brand).value} alt="brand logo" className="element-brand-img" />
                  <img src={val.image} alt="pizza" className="element-img" />
                </div>

                <div className="element-content">
                  <div className="title">
                    <span>No {i + 1}. </span>
                    {val.name}
                  </div>
                  <div className="explain">
                    <div className="mr-1"><span>칼로리</span>{comma(val.m_cal)} kcal</div>
                    <div><span>가격</span>{comma(val.m_price)} 원</div>
                  </div>
                  <div>
                    {val.matchItem.map((value, idx) => (
                      <SelectedToppingImgStyle key={idx} w={30}>
                        <img
                          src={smallToppings.find((el) => el.name === value).image}
                          alt="topping"
                        />
                      </SelectedToppingImgStyle>
                    ))}
                  </div>
                  <div className="iconWrapper">
                    <img src={heartIcon} alt="heart" />
                    <span className="typo-s2">{val.likeNum}</span>
                    <img src={chatIcon} alt="chat" />
                    <span className="typo-s2">{val.comments}</span>
                  </div>
                </div>
              </div>
              <img src={listBg} alt="list background" className="listBg" />
            </div>
          ))}
      </div>
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
                {val.value ? <img src={val.value} alt={val.name} /> : <div>all</div>}
              </div>
            ))}
          </div>
        )}
        {openSorting && (
          <div className="wrapper wrapper-sorting scale-up-tr pointer">
            {sorting.map((val, i) => (
              <div onClick={() => { handleFilter('sorting', val.name); setOpenSorting(false); }} key={i}>{val.value}</div>
            ))}
          </div>
        )}
      </MenuStyle>
    </>
  );
}

function SelectedToppingList({ smallToppings, selectedTopping }) {
  return (
    <SelectedToppingListStyle>
      {/* tooltip으로 이름을 알려줄 수 있어 */}
      {/* <span className="typo-s1">내가 선택한 토핑</span> */}
      <div style={{ marginTop: '0.5rem' }}>
        {smallToppings.length && selectedTopping.map((val, idx) => (
          <SelectedToppingImgStyle key={idx} w={40}>
            <img
              src={smallToppings.find((el) => el.name === val).image}
              alt="topping"
            />
          </SelectedToppingImgStyle>
        ))}
      </div>
    </SelectedToppingListStyle>
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
      &-img-wrapper{
        position: relative;
        width: 180px;
        height: 160px;
        background-color: #f9f9f9;
        flex-shrink: 0;
        .element-img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #f9f9f9;
          flex-shrink: 0;
        }
        .element-brand-img{
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: auto;
          z-index: 10;
          background-color: rgba(255,255,255,0.9);
          padding: 4px;
          border-radius: 100px;
          margin: 4px;
          box-shadow: 0 2px 6px 2px rgba(0,0,0,0.1);
        }
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
          display: flex;
          div{
            margin-bottom: 16px;
          }
          span{
            font-weight: bold;
            margin-right: 5px;
            display: inline-block;
          }
        }
        .iconWrapper{
          color: #777;
          font-size: 14px;
          display: flex;
          align-items: center;
          margin-top: 6px;
          img{
            width: 18px;
            margin-right: 8px;
          }
          span{
            margin-right: 12px;
          }
        }
      }
    }
  }
  .elementStyle-empty{
    color: white;
    font-weight: 100;
    font-size: 40px;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px dotted white;
    text-align: center;
  }
  .emptyResultList{
    border: 1px solid rgba(255,255,255,0.5);
    height: 95%;
    color: white;
    font-size: 40px;
    font-weight: 100;
    display: flex;
    justify-content: center;
    align-items: center;
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
    box-shadow: 10px 20px 30px 0 rgba(0,0,0,0.1);
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
        color: #555;
        font-weight: bold;
        font-size: 15px;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
`;

const SelectedToppingListStyle = styled.div`
  color: white;
  margin-bottom: 10px;
  overflow: auto;
`;

const SelectedToppingImgStyle = styled.div`
  /* border: 1px solid rgba(255,255,255,0.2); */
  background-color: rgba(0,0,0,0.2);
  display: inline-flex;
  border-radius: 100px;
  width: ${(props) => `${props.w}px`};
  height: ${(props) => `${props.w}px`};
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  img{
    width: 80%;
  }
`;
