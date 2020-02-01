import React, { useState } from 'react';
import styled from 'styled-components';
import expand from 'img/select/expand.png';
import contract from 'img/select/contract.png';
import dough from 'img/select/dough.png';
import submitbtn from 'img/select/submitbtn.png';
import submitbtnHover from 'img/select/submitbtnHover.png';
import toTop from 'img/select/toTop.png';
import toBottom from 'img/select/toBottom.png';

const toppingGroup = [
  { title: '소스 (4)', name: 'sauce' },
  { title: '고기 (11)', name: 'meat' },
  { title: '해산물 (4)', name: 'seafood' },
  { title: '야채 (12)', name: 'vegetable' },
  { title: '치즈 (7)', name: 'cheese' },
  { title: '기타 (6)', name: 'etc' },
];

export default function SelectPage({
  smallToppings, handleDrag, selectedTopping, handleSubmit, selectedSmallTopping, handleDelete,
}) {
  // handleDrag를 하면 드래그 되고 있는 값을 여기서 저장해 놓다가, 올바른 곳에 drop 하면 그때 전송해야된다 .
  const [draggedTopping, setDraggedTopping] = useState('');
  console.log(selectedTopping);

  return (
    <SelectPageStyle className="SelectPage">
      <SelectTopping
        smallToppings={smallToppings}
        setDraggedTopping={setDraggedTopping}
        handleDrag={handleDrag}
        selectedTopping={selectedTopping}
      />
      {/* 도우와 토핑 */}
      <Dough
        selectedTopping={selectedTopping}
        draggedTopping={draggedTopping}
        handleDrag={handleDrag}
      />
      <SubmitBtn
        handleSubmit={handleSubmit}
      /> {/* 제출하기 버튼 */}
      {/* 선택된 토핑 리스트 */}
      <SelectedTopping
        selectedSmallTopping={selectedSmallTopping}
        handleDelete={handleDelete}
      />
    </SelectPageStyle>
  );
}

function Dough({ selectedTopping, draggedTopping, handleDrag }) {
  function handleDragOver(evt) {
    evt.preventDefault();
  }

  return (
    <DoughStyle className="dodytest">
      <div
        className="large_topping"
        onDrop={() => handleDrag(draggedTopping)}
        onDragOver={handleDragOver}
      >
        {selectedTopping.map((val, i) => (
          <img src={val.resultImage} alt="largeToping" key={i} />
        ))}
      </div>
      <img src={dough} alt="doughImg" className="img-dough" />
    </DoughStyle>
  );
}

function SelectTopping({
  smallToppings, setDraggedTopping, handleDrag, selectedTopping,
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      {/* select box */}
      <SelectToppingStyle open={open}>
        {toppingGroup.map((val, i) => (
          <>
            <SelectToppingMenu
              key={i}
              smallToppings={smallToppings}
              val={val}
              setDraggedTopping={setDraggedTopping}
              handleDrag={handleDrag}
              selectedTopping={selectedTopping}
            />
          </>
        ))}
      </SelectToppingStyle>
      {/* select box를 열고 닫는 버튼 */}
      <SelectToppingCloseBtnStyle open={open} onClick={() => setOpen(!open)}>
        <img src={open ? expand : contract} alt="close" />
      </SelectToppingCloseBtnStyle>
    </>
  );
}

function SelectToppingMenu({
  smallToppings, val, setDraggedTopping, handleDrag, selectedTopping,
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="topping-title" onClick={() => setOpen(!open)}>
        {val.title}
        <i className="material-icons">arrow_drop_down</i>
      </div>
      {open && (smallToppings[val.name]).map((topping, idx) => (
        <div className="topping-item" key={idx}>
          {selectedTopping.findIndex((el) => el.name === topping.name) >= 0
          && <div className="topping-Wrapper">픽!!</div>}
          <div
            className={`circle ${topping.name}`}
            draggable
            onClick={() => handleDrag(topping)}
            onDragStart={() => setDraggedTopping(topping)}
          >
            <img src={topping.image} alt="topping" width="40" />
          </div>
          <span>{topping.name}</span>
        </div>
      ))}
    </>
  );
}

function SubmitBtn({ handleSubmit }) {
  const [submit, setSubmit] = useState(false);
  return (
    <div
      className="SubmitBtn"
      onMouseOver={() => setSubmit(true)}
      onFocus={() => setSubmit(true)}
      onMouseLeave={() => setSubmit(false)}
    >
      {submit && <div className="SubmitBtnText ml-1">피자 굽기!!</div>}
      <div className="pointer" onClick={submitbtn && handleSubmit}>
        <img src={submit ? submitbtnHover : submitbtn} alt="submit btn" />
      </div>
    </div>
  );
}

function SelectedTopping({ selectedSmallTopping, handleDelete }) {
  return (
    <></>
  );
}

const SelectPageStyle = styled.div`
  position: relative;
  .SubmitBtn{
    position: absolute;
    bottom: 20px;
    right: 30px;
    display: flex;
    align-items: flex-end;
    user-select: none;
    img{
      user-select: none;
      width: 110px;
    }
    .SubmitBtnText{
      user-select: none;
      background-color: rgba(0,0,0,0.5);
      border-radius: 100px;
      color: white;
      padding: 5px 24px;
      margin-right: 10px;
    }
  }
`;

const DoughStyle = styled.div`
  position: fixed;
  width: 75%;
  right: 0%;
  bottom: 0;
  @media (max-width: 1100px) {
    width: 90%;
  }
  @media (min-width: 1400px) {
    width: 70%;
  }
  /* 도우 */
  .img-dough{
    width: 100%;
  }
  /* 큰 토핑 style */
  .large_topping{
    position: absolute;
    border-radius: 100%;
    width: 73%;
    height: 69%;
    margin-left: 5%;
    margin-top: 1%;
    img{
      width: 100%;
      position: absolute;
    }
  }
`;

const SelectedToppingStyle = styled.div`
  position: absolute;
  top: 100px;
  right: 23px;
  width: 70px;
  height: 60%;
  border-radius: 100px;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .icon{
    margin: 10px 0;
    user-select: none;
    &:hover{
      opacity: 0.2;
    }
  }
  .selected-section{
    height: calc(100% + 88px);
    overflow: auto;
    ::-webkit-scrollbar {
      width: 0px;  /* 세로축 스크롤바 길이 */
      height: 0px;  /* 가로축 스크롤바 길이 */
    }
    .selected{
      animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
      border-radius: 100px;
      background-color: rgba(0,0,0,0.2);
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
      user-select: none;
      .selectedTopping{
        width: 40px;
      }
      .delete{
        display: none;
      }
      &:hover{
        background-color: #b93030;
        .selectedTopping{
          display: none;
        }
        .delete{
          display: block;
          font-size: 13px;
          color: white;
          font-weight: bold;
        }
      }
    }
  }
`;

const SelectToppingStyle = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.open ? '0px' : '-356px')};
  width: 356px;
  height: 100vh;
  overflow: auto;
  transition: 0.2s;
  background-color: rgba(0,0,0,0.6);
  color: #fff;
  z-index: 10;
  padding-left: 16px;
  i{
    vertical-align: bottom;
  }
  .topping-title{
    /* font-weight: bold; */
    font-size: 0.875rem;
    cursor: pointer;
    margin-bottom: 14px;
    margin-top: 8px;
    position: relative;
  }
  .topping-Wrapper{
    position: absolute;
    /* background-color: rgba(0,0,0,0.8); */
    background-color: rgba(206, 61, 61, 0.8);
    border: 3px solid #8a2a2a;
    width: inherit;
    height: 50px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    transform: rotate( -20deg );
    box-shadow: 4px 4px 0 rgba(0,0,0,1);
  }
  .topping-item{
    height: 97px;
    width: 50px;
    display: inline-flex;
    flex-direction: column;
    margin-right: 16px;
    text-align: center;
    .circle{
      border: 1px solid rgba(255,255,255,0.03);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.1s ease;
      &:hover{
        background-color: rgba(0,0,0,0.1);
      }
    }
    span{
      color: white;
      font-size: 11px;
      margin-top: 6px;
      line-height: 1.1;
      display: block;
    }
  }
  .closeBtn{
    width: 50px;
    height: 100px;
    background-color: rgba(0,0,0,0.5);
  }
`;

const SelectToppingCloseBtnStyle = styled.div`
  z-index: 10;
  position: absolute;
  width: 40px;
  height: 80px;
  background-color: rgba(0,0,0,0.6);
  top: 50%;
  transition: 0.2s;
  left: ${(props) => (props.open ? '356px' : '0px')};
  transform: translateY(-50%);
  border-radius: 0 100px 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  img{
    width: 8px;
    margin-left: -13px;
  }
`;
