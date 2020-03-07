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
  return (
    <SelectPageStyle className="SelectPage">
      {/* 작은 토핑 리스트들 */}
      <SelectTopping
        smallToppings={smallToppings}
        setDraggedTopping={setDraggedTopping}
        handleDrag={handleDrag}
        selectedTopping={selectedTopping}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
      />
      {/* 도우와 토핑 */}
      <Dough
        handleReset={handleReset}
        selectedTopping={selectedTopping}
        draggedTopping={draggedTopping}
        handleDrag={handleDrag}
      />
      {/* 제출하기 버튼 */}
      <SubmitBtn handleSubmit={handleSubmit} />
      {/* 토핑리셋하기 버튼 */}
      <ResetSelectedTopping onClick={() => { handleReset(); }}>
        토핑 리셋 🔥
      </ResetSelectedTopping>
    </SelectPageStyle>
  );
}

function SelectTopping({
  smallToppings,
  setDraggedTopping,
  handleDrag,
  selectedTopping,
  handleDelete,
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      {/* select box */}
      <SelectToppingStyle open={open}>
        {toppingGroup.map((val, i) => (
          <SelectToppingMenu
            key={i}
            smallToppings={smallToppings}
            val={val}
            setDraggedTopping={setDraggedTopping}
            handleDrag={handleDrag}
            selectedTopping={selectedTopping}
            handleDelete={handleDelete}
          />
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
            {/* 이거 하려면! 컴포넌트 하나 따로 만들어서 거기서 컨트롤 하는게 나을 듯 */}
            {selectedTopping.findIndex((el) => el.name === topping.name) >= 0 && (
              <SelectedToppingWrapper
                handleDelete={handleDelete}
                topping={topping}
              />
            )}
            <div
              className={`circle ${topping.name}`}
              draggable
              onClick={() => handleDrag(topping)}
              onDragStart={() => setDraggedTopping(topping)}
            >
              <img src={topping.image} alt="topping" />
            </div>
            <span>{topping.name}</span>
          </div>
        ))}
    </>
  );
}

function SelectedToppingWrapper({ handleDelete, topping }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="topping-Wrapper"
      onClick={() => handleDelete(topping)}
      onMouseOver={() => setIsHover(true)}
      onFocus={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onBlur={() => setIsHover(false)}
    >
      {isHover ? '삭제!' : '픽!!'}
    </div>
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
    @media (max-width: 839px) {
      right: 0;
    }
    @media (max-width: 479px) {
      bottom: 30%;
    }
    img {
      user-select: none;
      width: 110px;
      @media (max-width: 839px) {
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
  @media (max-width: 479px) {
    width: 120%;
    margin-right: -20%;
    margin-bottom: 50%;
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
  height: 100vh;
  overflow: auto;
  transition: 0.2s;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 10;
  padding-left: 16px;
  width: 356px;
  @media (max-width: 479px) {
    width: 100%;
    height: 30%;
    bottom: 0;
    top: auto;
    border-radius: 30px 30px 0 0;
  }
  i {
    vertical-align: bottom;
  }
  .topping-title {
    font-size: 0.875rem;
    cursor: pointer;
    margin-bottom: 14px;
    margin-top: 8px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .topping-Wrapper {
    cursor: pointer;
    position: absolute;
    background-color: rgba(206, 61, 61, 0.8);
    border: 3px solid #8a2a2a;
    width: inherit;
    height: 3.125rem;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    transform: rotate(-20deg);
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 1);
  }
  .topping-item {
    height: 6rem;
    width: 3.125rem;
    display: inline-flex;
    flex-direction: column;
    margin-right: 1rem;
    text-align: center;
    @media (max-width: 479px) {
      margin-right: 1.5rem;
    }
    .circle {
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 50%;
      width: 3.125rem;
      height: 3.125rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.1s ease;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      img{
        width: 2.5rem;
      }
    }
    span {
      color: white;
      font-size: 11px;
      margin-top: 0.5rem;
      line-height: 1.1;
      display: block;
      @media (max-width: 479px) {
        font-size: 9.5px;
      }
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
  top: 50px;
  right: 300px;
  font-weight: bold;
  transition: 0.2s;
  width: 10rem;
  height: 10rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.76);
  border: 2px dotted rgba(255,255,255, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 479px) {
    left: 10px;
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
  width: 40px;
  height: 80px;
  left: ${(props) => (props.open ? '356px' : '0px')};
  img {
    width: 8px;
    margin-left: -13px;
  }
  @media (max-width: 479px) {
    display: none;
  }
`;

const ImgStyle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${(props) => props.zindex};
`;
