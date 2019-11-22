import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import expand from 'img/select/expand.png';
import contract from 'img/select/contract.png';
import expanddown from 'img/select/expanddown.png';
import expandup from 'img/select/expandup.png';
import large_steak from 'img/sample/large_steak.png';

import axios from 'axios';

export default function SelectPageToppingList({ toppingType, j }) {
  // api 연동

  const [smallToppings, setSmallToppings] = useState({ toppings: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        setError(null);
        setSmallToppings({ toppings: [] });
        setLoading(true);
        const response = await axios.get(
          'http://13.209.50.101:3000/pizzas/toppings',
        );
        setSmallToppings(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchToppings();
  }, []);

  const mappingSmallToppings = Object.values(smallToppings);

  // 토핑 리스트 열고닫기
  const [visible, setVisible] = useState(false);

  return (
    <SelectTopping
      visible={visible}
      onClick={() => {
        setVisible(!visible);
      }}
    >
      {toppingType}
      {visible ? (
        <>
          <img src={expandup} className="expandUpDown"></img>
          <div className="topping-small-list">
            {mappingSmallToppings[j].map(topping => (
              <div key={topping._id} className="topping-small">
                <img
                  src={topping.image}
                  draggable
                  className={topping.name}
                ></img>
                <div className="topping-small-name">{topping.name}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <img src={expanddown} className="expandUpDown"></img>
        </>
      )}
    </SelectTopping>
  );
}

const SelectTopping = styled.div`
  cursor: pointer;
  width: 360px;
  margin-left: 16px;
  margin-top: 29px;
  .expandUpDown {
    width: 5%;
    height: 5%;
    margin-left: 5px;
    z-index: 1;
    display: inline;
  }

  .large_steak {
    width: 75%;
    height: 58%;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -3000;
  }
  .topping-small-list {
    z-index: 1;
    margin-top: 22px;
  }
  .topping-small {
    flex-direction: column;
    display: inline-flex;
    flex-wrap: wrap;
    width: 60px;
    margin: 0;
    text-align: center;
    align-content: center;
    margin-right: 8px;
    margin-bottom: 29px;
  }
  .topping-small img {
    cursor: move;
    width: 45px;
    height: 45px;
    border: 0.3px solid black;
    padding: 4.5px;
    border-radius: 50%;
    margin-bottom: 3px;
  }
  .topping-small-name {
    font-size: 10px;
    color: #fff;
    justify-content: center;
  }
`;
