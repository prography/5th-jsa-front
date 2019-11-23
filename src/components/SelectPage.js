import React, { useState } from 'react';
import styled from 'styled-components';
import expand from 'img/select/expand.png';
import contract from 'img/select/contract.png';
import dough from 'img/select/dough.png';
import submitbtn from 'img/select/submitbtn.png';
import submitbtnHover from 'img/select/submitbtnHover.png';
import steak from 'img/sample/steak.png';
import toTop from 'img/select/toTop.png';
import toBottom from 'img/select/toBottom.png';
import line from 'img/select/line.png';

const toppingGroup = [
  { title: '소스 (4)' },
  { title: '치즈 (16)' },
  { title: '고기 (11)' },
  { title: '해산물 (5)' },
  { title: '야채 (18)' },
  { title: '기타 (8)' },
];

export default function SelectPage() {
  return (
    <SelectPageStyle className="SelectPage">
      <SelectTopping />
      <div className="large_topping">토핑여기에 드래그앤 드롭하자</div>
      <img src={dough} alt="doughImg" className="img-dough" />
      {/* 제출하기 버튼 */}
      <SubmitBtn />
      {/* 선택된 토핑 리스트 */}
      <SelectedTopping />
      {/* 안내 멘트 */}
      <Snackbar />
    </SelectPageStyle>
  );
}


function SelectTopping() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ zIndex: '10' }}>
      {open && (
        <SelectToppingStyle>
          {toppingGroup.map((val, i) => (
            <div key={i}>
              {/* title : 소스, 치즈, 고기, 해산물, 야채, 기타 등 */}
              <div className="topping-title">
                {val.title}
                <i className="material-icons">arrow_drop_down</i>
              </div>

              {/* 토핑 item */}
              {[...Array(10)].map((idx) => (
                <div className="topping-item" key={idx}>
                  <div className="circle" />
                  <span>매콤한 소스</span>
                </div>
              ))}
            </div>
          ))}
        </SelectToppingStyle>
      )}

      {/* select box를 열고 닫는 버튼 */}
      {/* 버튼을 누르면 자연스럽게 없어지는 애니메이샤ㅕㄴ이 필요해 */}
      {/* 버튼을 클릭하면, class에 새로운 css가 추가되어야 합니ㅏㄷ. */}
      {open ? (
        <SelectToppingCloseBtn open={open} onClick={() => setOpen(false)}>
          <img src={expand} alt="close" />
        </SelectToppingCloseBtn>
      ) : (
        <SelectToppingCloseBtn open={open} onClick={() => setOpen(true)}>
          <img src={contract} alt="open" />
        </SelectToppingCloseBtn>
      )}
    </div>
  );
}


function SubmitBtn() {
  const [submit, setSubmit] = useState(false);
  return (
    <div className="SubmitBtn" onMouseOver={() => setSubmit(true)} onFocus={() => setSubmit(true)} onMouseLeave={() => setSubmit(false)}>
      {/* 이미지 바뀔때 애니메이션 필요함 */}
      {submit && <div className="SubmitBtnText ml-1">피자 굽기!!</div>}
      {submit
        ? <div className="pointer" onClick={() => console.log(2)}><img src={submitbtnHover} alt="submit btn" /></div>
        : <img src={submitbtn} alt="submit btn" />}
    </div>
  );
}

function Snackbar() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // 토핑이 너무 많을때 액션이 갑니다.
  //  1초 뒤에 사라지게 합니다. 나타날때와 사라질때 액션 필요합니다.
  return (
    openSnackbar && (
      <SnackbarStyle onClick={() => setOpenSnackbar(false)}>
        <i className="material-icons">report_problem</i>
        피자가 무거워요!  토핑을 더이상 추가할 수 없습니다!
        <i className="material-icons">report_problem</i>
      </SnackbarStyle>
    )
  );
}

function SelectedTopping() {
  // const [openSnackbar, setOpenSnackbar] = useState(true);
  // 토핑이 너무 많을때 액션이 갑니다.
  //  1초 뒤에 사라지게 합니다. 나타날때와 사라질때 액션 필요합니다.
  return (
    <SelectedToppingStyle>
      {/* 스크롤 업 하거나, 스크롤 다운하는 기능이 필요합니다. */}
      {/* react-scroll 뭐시기 있었던거 같ㅇ느데 */}
      <div className="icon"><img src={toTop} alt="totop" draggable="false" /></div>
      <div className="selected-section">
        {[...Array(10)].map((val, index) => (
          <div className="selected">
            <img src={line} alt="line" className="delete" />
            <img src={steak} alt="test" className="selectedTopping" />
          </div>
        ))}
      </div>
      <div className="icon"><img src={toBottom} alt="toBottom" /></div>
    </SelectedToppingStyle>
  );
}


const SelectPageStyle = styled.div`
  position: relative;
  .large_topping{
    /* 더 높은 해상도에서는 다르게 보이게 해주어야 합니다. */
    position: absolute;
    z-index: 1;
    left: 50px;
    top: 37%;
    width: 55%;
    min-width: 750px;
    height: 48%;
    margin-left: 25%;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.1);
  }
  .img-dough{
    position: absolute;
    left: 0%;
    width: 75%;
    margin-left: 25%;
    min-width: 1042.5px;
    bottom: 0;
    right: 0;
  }
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

const SnackbarStyle = styled.div`
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  background-color: rgba(0,0,0,0.5);
  padding: 12px 35px;
  z-index: 12;
  i{
    vertical-align: bottom;
    margin: 0 10px;
  }
`;

const SelectedToppingStyle = styled.div`
  position: absolute;
  top: 100px;
  right: 23px;
  width: 80px;
  height: 60%;
  border-radius: 100px;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon{
    margin: 10px 0;
    user-select: none;
    &:hover{
      opacity: 0.2;
    }
  }
  .selected-section{
    height: 384px;
    overflow: auto;
    .selected{
      border-radius: 100px;
      background-color: rgba(0,0,0,0.2);
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      margin-left: 9px;
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
        }
      }
    }
  }
`;

const SelectToppingStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 420px;
  height: 100vh;
  overflow: auto;
  background-image: linear-gradient(114deg, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
  color: #fff;
  z-index: 1;
  padding-left: 29px;
  i{
    vertical-align: bottom;
  }
  .topping-title{
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 26px;
    margin-top: 29px;
  }
  .topping-item{
    height: 97px;
    display: inline-block;
    margin-right: 16px;
    .circle{
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 50%;
      width: 60px;
      height: 60px;
    }
    span{
      color: white;
      font-size: 12px;
      margin-top: 4px;
    }
  }
  .closeBtn{
    width: 50px;
    height: 100px;
    background-color: rgba(0,0,0,0.5);
  }
`;

// select section을 닫는 버튼 style
const SelectToppingCloseBtn = styled.div`
  z-index: 10;
  position: absolute;
  width: 40px;
  height: 80px;
  background-color: rgba(0,0,0,0.53);
  top: 50%;
  left: ${(props) => (props.open ? '420px' : '0px')};
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
