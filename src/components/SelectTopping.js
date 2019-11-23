import React, { useState } from 'react';
import styled from 'styled-components';
import expand from 'img/select/expand.png';
import contract from 'img/select/contract.png';
import dough from 'img/select/dough.png';

const toppingGroup = [
  { title: '소스 (4)' },
  { title: '치즈 (16)' },
  { title: '고기 (11)' },
  { title: '해산물 (5)' },
  { title: '야채 (18)' },
  { title: '기타 (8)' },
];

export default function SelectTopping() {
  const [open, setOpen] = useState(true);
  // const [visible, setVisible] = useState(false);
  return (
    <div style={{ zIndex: '10' }}>
      {/* 이 파일의 이름을 selectPAge로 바꾸고, 요거만 빼서 컴포넌 */}
      {open
        && (
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
      {open
        ? (
          <SelectToppingCloseBtn open={open} onClick={() => setOpen(false)}>
            <img src={expand} alt="close" />
          </SelectToppingCloseBtn>
        )
        : (
          <SelectToppingCloseBtn open={open} onClick={() => setOpen(true)}>
            <img src={contract} alt="open" />
          </SelectToppingCloseBtn>
        )}

      {/* 배경이랑, 도우이미지, 드롭되는 위치 */}
      <SelectPageStyle className="SelectPage">
        <div className="large_topping">토핑여기에 드래그앤 드롭하자</div>
        <img src={dough} alt="doughImg" className="img-dough" />
        <div>피자굽기</div>
        <div>선택된 토핑 리스트</div>
        <div>스낵바</div>
      </SelectPageStyle>
    </div>
  );
}

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
`;
