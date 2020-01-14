import React, { useState } from 'react';
import styled from 'styled-components';
import pizza from 'img/loading/pizza.png';
import emptyHeartIcon from 'img/detail/empty-heart-icon.png';
import heartIcon from 'img/detail/heart-icon.png';
import recent from 'img/mypage/recent.png';
import go from 'img/mypage/go.png';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default function MyPage({ user, val }) {
  const [favorite, setFavorite] = useState(true);

  return (
    <MyPageStyle>
      <div className="mypage">
        <div className="mypage-user">
          <div className="user-img">
            {/* {user.map((val, i) => (
              <img src={val.profileImage} alt="profileImage" key={i} />
            ))} */}
          </div>
          <div className="user-name">username님</div>
        </div>
        <div className="mypage-wrapper">
          <div className="mypage-title">
            <div className="title-background"></div>
            <Link to="MyPage">
              <div className="title">MY PAGE</div>
            </Link>
          </div>
          <div className="mypage-content">
            <div className="mypage-like">
              <img src={heartIcon} className="heart"></img>
              <div className="like-title">좋아한 피자</div>
              <div className="like-content">
                {[...Array(4)].map((val, index) => (
                  <div className="like-content-1" key={index}>
                    <div
                      onClick={() => {
                        // handleFavorite(favorite, '피자아이디');
                        setFavorite(!favorite);
                      }}
                    >
                      {favorite ? (
                        <img
                          src={emptyHeartIcon}
                          alt="hearticon"
                          className="emptyHeart"
                        />
                      ) : (
                        <img
                          src={heartIcon}
                          alt="hearticon"
                          className="emptyHeart"
                        />
                      )}
                    </div>
                    {/* <img src={emptyHeartIcon} className="emptyHeart"></img> */}
                    <div className="like-content-wrapper">
                      <div className="like-brand">도미노피자</div>
                      <div className="like-pizza">피자이름은아홉글자</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="like-footer">
                <Link to="/result">> 자세히</Link>
              </div>
            </div>
            <div className="mypage-recent">
              <img src={recent} className="recent"></img>
              <div className="recent-title">최근 고른 토핑</div>
              <div className="recent-content">
                {[...Array(4)].map((val, index) => (
                  <Link to="MyPageResult">
                    <div className="recent-content-1" key={index}>
                      <div className="recent-toppings">
                        {[...Array(1)].map((val, index) => (
                          <div className="recent-topping" key={index}>
                            <img src={heartIcon}></img>
                            <span className="topping-hover">스테이크치즈</span>
                          </div>
                        ))}
                      </div>
                      <img src={go} className="go"></img>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* background pizzas*/}
      <div className="pizzas">
        <img src={pizza} className="pizza1"></img>
        <img src={pizza} className="pizza2"></img>
        <img src={pizza} className="pizza3"></img>
        <img src={pizza} className="pizza4"></img>
        <img src={pizza} className="pizza5"></img>
      </div>
    </MyPageStyle>
  );
}

const MyPageStyle = styled.div`
  background-color: #ededed;
  justify-content: center;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .mypage-user {
    color: black;
    display: flex;
    align-items: center;
    align-content: center;
    position: relative;
    top: 22px;
    left: 30px;
    justify-content: left;
  }
  .user-img {
    width: 49px;
    height: 49px;
    border: 1px solid #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-name {
    margin-left: 5px;
    font-weight: 600;
  }
  .pizzas {
    display: flex;
    width: 100%;
    position: fixed;
    min-width: 1805px;
    height: auto;
    left: -13%;
    top: 80%;
  }
  .pizza1,
  .pizza2,
  .pizza3,
  .pizza4,
  .pizza5 {
    width: 400px;
  }
  .mypage {
    width: 100%;
    justify-content: center;
  }
  .mypage-wrapper {
    display: flex;
    width: 100%;
    height: 500px;
    justify-content: center;
    top: 8%;
    position: relative;
  }
  .mypage-title {
    font-weight: 700;
    font-size: 54px;
    text-align: center;
    position: absolute;
  }
  .mypage-title a {
    position: relative;
    bottom: 60px;
    height: 80px;
  }
  .title {
    z-index: 2;
    color: #cc1b28;

    position: relative;
  }
  .title-background {
    width: 245px;
    height: 35px;
    background-color: rgba(255, 201, 13, 0.45);
    z-index: 0;
    border-radius: 15%;
    position: relative;
    top: 10px;
  }
  .mypage-content {
    display: flex;
    top: 17%;
    position: absolute;
    justify-content: space-between;
    width: 700px;
  }
  .mypage-like {
    // flex-wrap: wrap;
    text-align: center;
  }
  .mypage-recent {
    // margin-left: 100px;
    flex-wrap: wrap;
    text-align: center;
  }
  .like-title,
  .recent-title {
    font-size: 20px;
    font-weight: 600;
    bottom: 7px;
    position: relative;
  }
  .recent,
  .heart,
  .emptyHeart {
    width: 33px;
    height: 30px;
  }
  .like-content,
  .recent-content {
    width: 285px;
    height: 260px;
    overflow: auto;
  }
  .like-content {
    text-align: right;
    color: #fff;
  }
  .mypage-like a {
    color: black;
    text-align: right;
    &:hover {
      font-weight: 700;
    }
  }
  .like-content-1,
  .recent-content-1 {
    background-color: rgba(0, 0, 0, 0.2);
    width: 270px;
    height: 70px;
    margin-top: 10px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    align-content: center;
    overflow: auto;
  }
  .like-content-1 {
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .recent-content-1 {
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .emptyHeart {
    margin-left: 10px;
  }
  .like-content-wrapper {
    text-align: left;

    margin-left: 10px;
  }
  .like-brand {
    font-size: 16px;

    color: #fff;
    opacity: 0.8;
  }
  .like-pizza {
    font-size: 20px;
    font-weight: 600;
  }
  .like-footer {
    text-align: right;
    position: relative;
    top: 3px;
  }
  a {
    text-decoration: none;
  }

  .go {
    text-align: right;
    position: relative;
    right: 10px;
  }
  .recent-toppings {
    width: 250px;
    display: flex;

    overflow: auto;
    flex-direction: row;
    ::-webkit-scrollbar {
      width: 0px; /* 세로축 스크롤바 길이 */
      height: 0px; /* 가로축 스크롤바 길이 */
    }
  }
  .recent-topping {
    width: 49px;
    height: 49px;
    border-radius: 50%;
    justify-content: center;
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    background-color: #ededed;
    align-items: center;
    .topping-hover {
      display: none;
    }
    &:hover {
      background-color: #b93030;

      img {
        display: none;
      }
      .topping-hover {
        display: block;
        font-size: 13px;
        color: white;
      }
    }
  }
  .recent-topping img {
    width: 35px;
    height: 35px;
  }
  span {
    width: 70px;
    font-size: 14px;
    color: #fff;
    opacity: 0.8;
  }
  .recent-content-1 a {
    text-align: right;
  }
`;
