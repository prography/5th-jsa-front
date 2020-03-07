import React from 'react';
import styled from 'styled-components';
import pizza from 'img/loading/pizza.png';

import l from 'img/loading/l.png';
import o from 'img/loading/o.png';
import a from 'img/loading/a.png';
import d from 'img/loading/d.png';
import i from 'img/loading/i.png';
import n from 'img/loading/n.png';
import g from 'img/loading/g.png';
import comma from 'img/loading/comma.png';

const loadingImg = [l, o, a, d, i, n, g, comma, comma, comma];

export default function Loading() {
  return (
    <LoadingStyle>
      <img src={pizza} alt="pizza" className="pizza" />
      <div className="mt-2">
        {loadingImg.map((val, index) => (
          <IMG src={val} alt="loading" key={index} className={val === comma ? 'comma' : 'loading'} index={index} />
        ))}
      </div>
    </LoadingStyle>
  );
}

const LoadingStyle = styled.div`
  position: absolute;
  background-image: linear-gradient(114deg, rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .pizza{
    box-shadow: 10px 20px 40px 0 rgba(0,0,0,0.2);
    border-radius: 91px;
    width: 11.25rem;
  }
  .loading{
    width: 1.875rem;
  }
  .comma{
    width: 0.75rem;
  }
`;

const IMG = styled.img`
  /* animation: ${(props) => props.index && `bounce-top 0.07s ${props.index / 8}s both`}; */
`;
