import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import expand from 'img/select/expand.png';
import contract from 'img/select/contract.png';
import bg from 'img/select/bg.png';
import dough from 'img/select/dough.png';

import SelectPageToppingList from './SelectPageToppingList';

import axios from 'axios';

// 손 애니메이션 추가할 예정

export default function SelectPage() {
  const [open, setOpen] = useState(true);
  const [toppingName, setToppingName] = useState('');
  const [toppingImages, setToppingImages] = useState([]);
  const dragOver_ = e => {
    e.preventDefault();
    console.log('dragOver');
  };

  useEffect(() => {
    const fetchToppings = async toppingName => {
      const response = await axios.get(
        'http://13.209.50.101:3000/pizzas/toppings/image',
        { params: { topping: toppingName } },
      );
      console.log(response);
      if (response.data.result === null) {
      } else {
        setToppingImages(() => [
          ...toppingImages,
          response.data.result.resultImage,
        ]);
        console.log(toppingImages);
      }
    };
    fetchToppings(toppingName);
  }, [toppingName]);
  //
  const drop_ = e => {
    console.log('drop');
    e.preventDefault();
    const targetClass = e.dataTransfer.getData('targetClass');
    console.log(targetClass);
    // 토핑 이름이 나온다
    console.log(e.target);
    // div 태그가 나온다!!
    setToppingName(targetClass);
  };
  return (
    <SelectStyle>
      <>
        <div className="topping-small-container">
          {open && (
            <div className="topping-box">
              <SelectPageToppingList
                toppingType="맛(4)"
                visible={false}
                j={4}
              />
              <SelectPageToppingList
                toppingType="치즈(16)"
                visible={false}
                j={3}
              />
              <SelectPageToppingList toppingType="고기(11)" visible j={0} />
              <SelectPageToppingList
                toppingType="해산물(5)"
                visible={false}
                j={1}
              />
              <SelectPageToppingList
                toppingType="야채(18)"
                visible={false}
                j={2}
              />
              <SelectPageToppingList
                toppingType="기타(8)"
                visible={false}
                j={5}
              />
            </div>
          )}
          <div
            className="expand-topping"
            onClick={() => setOpen(!open)}
            open={open}
          >
            {!open ? (
              <img src={contract} className="arrow" alt="contract" />
            ) : (
              <img src={expand} className="arrow" alt="expand" />
            )}
          </div>
        </div>
        {/* 배경 */}
        <div
          className="backGround-container"
          droppable="true"
          onDragOver={dragOver_}
          onDrop={drop_}
        >
          <img src={bg} className="bg" alt="bg" />
          <img src={dough} className="dough" />
          {toppingImages.map((images, idx) => (
            <img key={idx} src={images} className="topping" />
          ))}

          <div className="goToOven">
            <Link to="result">피자 굽기▶</Link>
          </div>
        </div>
      </>
    </SelectStyle>
  );
}

const SelectStyle = styled.div`
  width: 100%;
  height: 100vh;
  .topping-small-container {
    display: flex;
    align-items: center;
    justify-contents: center;
    width: 456px;
    height: 100vh;
    z-index: 1;
  }
  .topping-box {
    width: 396px;
    height: 100vh;
    background: rgba(51, 34, 28, 0.9);
    overflow: scroll;
    color: #fff;
    z-index: 1;
  }

  .expand-topping {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    right: 30px;
    position: relative;
    background: rgba(51, 34, 28, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    curser: pointer;
    z-index: 1;
  }
  .arrow {
    width: 20%;
    height: 30%;
    position: relative;
    left: 10px;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    width: 100%;
    height: 100vh;
    z-index: 0;
  }

  .background-container {
    display: block;
    position: absolute;
    z-index: 0;
    width: 75%;
    height: 58%;
  }
  .dough {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 0;
    width: 67%;
    height: 54%;
  }
  .topping {
    position: absolute;
    z-index: 0;
    right: 186px;
    bottom: 75px;
    width: 49%;
    height: 41%;
  }

  .goToOven {
    background: rgba(51, 34, 28, 0.6);
    display: flex-inline;
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 170px;
    height: 51px;
    text-align: center;
    border-radius: 30px;
    padding: 0;
    z-index: 1;
  }
  .goToOven a {
    align-content: center;
    font-size: 20px;
    text-decoration: none;
    color: #fff;
    position: relative;
    top: 14px;
    z-index: 1;
  }
`;
