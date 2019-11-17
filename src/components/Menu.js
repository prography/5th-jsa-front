import React from 'react';
import styled from 'styled-components';

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

export default function Menu({
  children, type, openFilter, openSorting, closeFilter, closeSorting,
}) {
  return (
    <MenuStyle type={type}>
      {children}
      {{
        filter: openFilter && (
        <div className={`wrapper ${type}`}>
          {logo.map((val, i) => (
            <div onClick={() => console.log(val.name)} className="imgWrapper" key={i}>
              <img src={val.value} alt={val.name} />
            </div>
          ))}
          {/* <MenuBack onClick={closeFilter} /> */}
        </div>
        ),
        sorting: openSorting && (
        <div className={`wrapper ${type}`}>
          <div>높은칼로리순</div>
          <div>낮은칼로리순</div>
          <div>높은가격순</div>
          <div>낮은가격순</div>
          <div>좋아요순</div>
          <div>댓글수순</div>
          {/* <MenuBack onClick={closeSorting} /> */}
        </div>
        ),
      }[type]}
    </MenuStyle>
  );
}

const MenuStyle = styled.div`
  display: inline-block;
  position: relative;
  z-index: 11;
  user-select: none;
  .wrapper{
    position: absolute;
    top: 20px;
    right: 0;
    margin-top: 10px;
    background-color: white;
    box-shadow: 10px 20px 30px 0 rgba(0,0,0,0.2);
    color: red;
    &.filter{
      display: flex;
      padding: 13px 32px;
      border-radius: 100px 0 100px 100px;
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
    &.sorting{
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
