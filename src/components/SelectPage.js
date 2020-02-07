import React, { useState } from 'react';
import styled from 'styled-components';
import expand from 'img/select/expand.png';
import contract from 'img/select/contract.png';
import dough from 'img/select/dough.png';
import submitbtn from 'img/select/submitbtn.png';
import submitbtnHover from 'img/select/submitbtnHover.png';

const toppingGroup = [
  { title: '소스 (4)', name: 'sauce' },
  { title: '고기 (11)', name: 'meat' },
  { title: '해산물 (4)', name: 'seafood' },
  { title: '야채 (12)', name: 'vegetable' },
  { title: '치즈 (7)', name: 'cheese' },
  { title: '기타 (6)', name: 'etc' },
];

export default function SelectPage({
  smallToppings,
  handleDrag,
  selectedTopping,
  handleSubmit,
  handleDelete,
  handleReset,
}) {
  const [draggedTopping, setDraggedTopping] = useState('');
  // const BREAK_POINT_MOBILE = 480;
  // const BREAK_POINT_TABLET = 840;
  // const BREAK_POINT_PC = 1200;
  return (
    <SelectPageStyle className="SelectPage">
      <SelectTopping
        smallToppings={smallToppings}
        setDraggedTopping={setDraggedTopping}
        handleDrag={handleDrag}
        selectedTopping={selectedTopping}
        handleDelete={handleDelete}
        handleReset={handleReset}
      />
      {/* 도우와 토핑 */}
      <Dough
        selectedTopping={selectedTopping}
        draggedTopping={draggedTopping}
        handleDrag={handleDrag}
      />
      <SubmitBtn handleSubmit={handleSubmit} />
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
          <ImgStyle zindex={val.z_index}>
            <img
              src={val.resultImage}
              alt="largeToping"
              key={i}
              className="scale-up"
            />
          </ImgStyle>
        ))}
      </div>
      <img src={dough} alt="doughImg" className="img-dough" />
    </DoughStyle>
  );
}

function SelectTopping({
  smallToppings,
  setDraggedTopping,
  handleDrag,
  selectedTopping,
  handleDelete,
  handleReset,
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
              handleDelete={handleDelete}
            />
          </>
        ))}
      </SelectToppingStyle>
      {/* select box를 열고 닫는 버튼 */}
      <SelectToppingCloseBtnStyle open={open} onClick={() => setOpen(!open)}>
        <img src={open ? expand : contract} alt="close" />
      </SelectToppingCloseBtnStyle>
      <ResetSelectedTopping
        open={open}
        onClick={() => {
          handleReset();
        }}
      >
        토핑 리셋 🔥
      </ResetSelectedTopping>
    </>
  );
}

function SelectToppingMenu({
  smallToppings,
  val,
  setDraggedTopping,
  handleDrag,
  selectedTopping,
  handleDelete,
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="topping-title" onClick={() => setOpen(!open)}>
        {val.title}
        <i className="material-icons">arrow_drop_down</i>
      </div>
      {open
        && smallToppings[val.name].map((topping, idx) => (
          <div className="topping-item" key={idx}>
            {selectedTopping.findIndex((el) => el.name === topping.name) >= 0 && (
              <div
                className="topping-Wrapper"
                onClick={() => handleDelete(topping)}
              >
                픽!!
              </div>
            )}
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
      className="SubmitBtn pointer"
      onMouseOver={() => setSubmit(true)}
      onFocus={() => setSubmit(true)}
      onMouseLeave={() => setSubmit(false)}
      onClick={submitbtn && handleSubmit}
    >
      <div className="SubmitBtnText ml-1">피자 굽기 👉</div>
      <div>
        <img src={submit ? submitbtnHover : submitbtn} alt="submit btn" />
      </div>
    </div>
  );
}

const SelectPageStyle = styled.div`
  position: relative;
  .SubmitBtn {
    position: absolute;
    bottom: 20px;
    right: 30px;
    display: flex;
    align-items: flex-end;
    user-select: none;
    @media (max-width: 840px) {
      right: 0;
    }
    img {
      user-select: none;
      width: 110px;
      @media (max-width: 840px) {
        display: none;
      }
    }
    .SubmitBtnText {
      cursor: pointer;
      user-select: none;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 100px;
      color: white;
      padding: 5px 20px;
      margin-right: 10px;
      margin-bottom: 8px;
      @media (max-width: 840px) {
        right: 0;
        top: 40%;
        left: 60%;
      }
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
  .img-dough {
    width: 100%;
  }
  /* 큰 토핑 style */
  .large_topping {
    position: absolute;
    border-radius: 100%;
    width: 73%;
    height: 69%;
    margin-left: 5%;
    margin-top: 1%;
    img {
      width: 100%;
      position: absolute;
    }
  }
`;

const SelectToppingStyle = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.open ? '0px' : '-356px')};

  @media (max-width: 480px) {
    width: 160px;
  }
  @media (min-width: 481px) {
    width: 260px;
  }
  @media (min-width: 841px) {
    width: 356px;
  }

  height: 100vh;
  overflow: auto;
  transition: 0.2s;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 10;
  padding-left: 16px;
  i {
    vertical-align: bottom;
  }
  .topping-title {
    /* font-weight: bold; */
    font-size: 0.875rem;
    cursor: pointer;
    margin-bottom: 14px;
    margin-top: 8px;
    position: relative;
  }
  .topping-Wrapper {
    cursor: pointer;
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
    transform: rotate(-20deg);
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 1);
  }
  .topping-item {
    height: 97px;
    width: 50px;
    display: inline-flex;
    flex-direction: column;
    margin-right: 16px;
    text-align: center;
    .circle {
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.1s ease;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    span {
      color: white;
      font-size: 11px;
      margin-top: 6px;
      line-height: 1.1;
      display: block;
    }
  }
  .closeBtn {
    width: 50px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ResetSelectedTopping = styled.div`
  cursor: pointer;
  z-index: 10;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.2s;
  padding: 5px 24px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 480px) {
    left: 70%;
    width: 5rem;
    height: 5rem;
    bottom: 60%;
    text-align: center;
  }
  @media (min-width: 481px) {
    bottom: 60%;
    right: 10px;
    width: 132px;
    text-align: center;
  }
  @media (min-width: 841px) {
    left: ${(props) => (props.open ? '372px' : '16px')};
    bottom: 28px;
  }
`;

const SelectToppingCloseBtnStyle = styled.div`
  z-index: 10;
  position: absolute;

  background-color: rgba(0, 0, 0, 0.6);
  top: 50%;
  transition: 0.2s;

  transform: translateY(-50%);
  border-radius: 0 100px 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  img {
    width: 8px;
    margin-left: -13px;
  }
  @media (max-width: 480px) {
    width: 25px;
    height: 50px;
    left: ${(props) => (props.open ? '160px' : '0px')};
  }
  @media (min-width: 481px) {
    left: ${(props) => (props.open ? '260px' : '0px')};
    width: 35px;
    height: 75px;
  }
  @media (min-width: 841px) {
    left: ${(props) => (props.open ? '356px' : '0px')};
    width: 40px;
    height: 80px;
  }
`;

const ImgStyle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${(props) => props.zindex};
`;
