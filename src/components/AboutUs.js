import React, { useState } from 'react';
import styled from 'styled-components';
import dd from 'img/aboutus/dd.png';
import dw from 'img/aboutus/dw.png';
import jq from 'img/aboutus/jq.png';
import sa from 'img/aboutus/sa.png';
import sm from 'img/aboutus/sm.png';
import kj from 'img/aboutus/kj.png';
import ym from 'img/aboutus/ym.png';
import TEAM from 'img/aboutus/TEAM.png';
import github from 'img/aboutus/github.png';

const dataset = [
  {
    img: dw, name: '동원', position: 'backend', say: '집에 가고싶어요', github: 'lemontech119',
  },
  {
    img: dd, name: '도디', position: 'frontend', say: 'I ️️❤️ react', github: 'dodody',
  },
  {
    img: sa, name: '승아', position: 'teamjang', say: 'Te gusta pizza? A mi, es mi favorito.', github: 'hackertaco',
  },
  {
    img: ym, name: '용민', position: 'backend', say: '집에 가고싶어요', github: 'lemontech119',
  },
  {
    img: dw, name: '동원', position: 'backend', say: '집에 가고싶어요', github: 'lemontech119',
  },
  {
    img: dw, name: '동원', position: 'backend', say: '집에 가고싶어요', github: 'lemontech119',
  },
];

export default function AboutUs() {
  const [open, setOpen] = useState(true);

  return (
    <AboutUsStyle className="AboutUs">
      {window.innerWidth < 840
        ? <NotiStyle>헤헤<br />팀원소개는<br />웹에서<br />확인하세요</NotiStyle>
        : (
          <>
            <div onClick={() => setOpen(true)}>
              <img
                src={TEAM}
                alt="team"
                className="team swing-in-top-fwd"
              />
            </div>
            <div className="item-dw member">
              <div onClick={() => setOpen(!open)} className="p-img-wrapper">
                <img src={dw} alt="dw" className="dw p-img" />
              </div>
              <div className="name">동원</div>
              <TeamMember
                open={open}
                position="backend"
                say="집에 가고싶어요"
                githubID="lemontech119"
              />
            </div>
            <div className="item-dd member">
              <div onClick={() => setOpen(!open)} className="p-img-wrapper">
                <img src={dd} className="dd p-img" alt="dd" />
              </div>
              <div className="name">도디</div>
              <TeamMember
                open={open}
                position="frontend"
                say="I ️️❤️ react"
                githubID="dodody"
              />
            </div>
            <div className="item-sa member">
              <div onClick={() => setOpen(!open)} className="p-img-wrapper">
                <img src={sa} className="sa p-img" alt="sa" />
              </div>
              <div className="name">승아</div>
              <TeamMember
                open={open}
                position="teamjang"
                say="Te gusta pizza? A mi, es mi favorito."
                githubID="hackertaco"
              />
            </div>
            <div className="item-ym member">
              <div onClick={() => setOpen(!open)} className="p-img-wrapper">
                <img src={ym} className="ym p-img" alt="ym" />
              </div>
              <div className="name">용민</div>
              <TeamMember
                open={open}
                position="backend"
                say="이거 만들고 요즘 피자를 잘 안 먹어요.."
                githubID="ymink716"
              />
            </div>
            <div className="item-kj member">
              <div onClick={() => setOpen(!open)} className="p-img-wrapper">
                <img src={kj} className="kj p-img" alt="kj" />
              </div>
              <div className="name">경준</div>
              <TeamMember
                open={open}
                position="피자 한입컷 장인"
                say="치킨 좋아함"
                githubID="paikend"
              />
            </div>
            <div className="item-jq member">
              <div onClick={() => setOpen(!open)} className="p-img-wrapper">
                <img src={jq} className="jq p-img" alt="jq" />
              </div>
              <div className="name">재규</div>
              <TeamMember
                open={open}
                position="supporter"
                say="우리팀 텐션최고"
                githubID="q00"
              />
            </div>
            <div className="item-sm member">
              <div onClick={() => setOpen(!open)} className="p-img-wrapper">
                <img src={sm} className="sm p-img" alt="sm" />
              </div>
              <div className="name">승민</div>
              <TeamMember
                open={open}
                position="designer"
                say="pizza is life"
                githubID=""
              />
            </div>
          </>
        )}
    </AboutUsStyle>
  );
}

function TeamMember({
  open, position, say, githubID,
}) {
  return (
    <TeamMemberBlock className="swing-in-top-fwd" open={open}>
      <div className="Item">
        <div className="position">{position}</div>
        <div className="say">{say}</div>
        <div className="github">
          <a href={`https://github.com/${githubID}`} target="_blank" rel="noopener noreferrer">
            <img src={github} alt="github" />
          </a>
        </div>
      </div>
    </TeamMemberBlock>
  );
}

const AboutUsStyle = styled.div`
  display: flex;
  color: black;
  font-weight: 100;
  .member {
    position: relative;
    width: 339px;
    height: 510px;
    justify-content: center;
    display: flex;
    @media(max-width: 1440px){
      width: 250px;
    }
  }
  .team {
    position: absolute;
    cursor: pointer;
    top: 80px;
    right: 350px;
    
    @media(max-width: 1440px){
      right: 300px;
      width: 350px;
    }
  }
  .p-img-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    display: contents;
  }
  .p-img {
    position: absolute;
    width: 300px;
    cursor: pointer;
    border-radius: 50%;
    transition: 0.1s;
    &:hover {
      opacity: 50%;
    }
    @media(max-width: 1440px){
      width: 250px;
    }
  }
  .name {
    display: flex;
    color: #fff;
    font-size: 20px;
    position: relative;
    left: 5px;
    font-weight: bold;
    height: 30px;
    margin-top: 7px;
  }
  .item-sm {
    top: 80px;
    right: 80px;
  }
  .item-jq {
    top: 190px;
    right: 70px;
  }
  .item-kj {
    top: 270px;
    right: 40px;
  }
  .item-ym {
    top: 260px;
  }
  .item-sa {
    top: 130px;
    left: 30px;
  }
  .item-dd {
    top: 0;
    left: 60px;
  }
  .item-dw {
    top: 100px;
    left: 100px;
  }
`;

const TeamMemberBlock = styled.div`
  display: ${(props) => (props.open ? 'none' : 'flex')};
  box-shadow: 10px 20px 40px 0 rgba(0, 0, 0, 0.4);
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 250px;
  width: 200px;
  height: auto;
  padding: 10px 0;
  border-radius: 10px;
  justify-content: center;
  @media (max-width: 1440px) {
    top: 200px;
    width: 170px;
  }
  .Item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 180px;
    align-items: center;
    text-align: center;
  }
  .position {
    /* box-shadow: 10px 20px 40px 0 rgba(0, 0, 0, 0.4); */
    justify-content: center;
    font-size: 36px;
    /* font-weight: bold; */
    color: #333;
    border-radius: 28px;
    /* background-color: rgba(25, 25, 25, 0.7); */
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 3px 10px;
    /* @media (max-width: 1440px) {
      font-size: 13px;
    } */
  }
  .say {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
    width: 160px;
    @media (max-width: 1440px) {
      font-size: 13px;
      width: 130px;
    }
  }
  .github {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
    font-weight: 300;
    transition: 0.2s;
    img {
      width: 30px;
      height: 30px;
      border-radius: 100px;
      transition: 0.2s;
      &:hover{
        box-shadow: 0px 2px 10px 0 rgba(49, 49, 49, 0.65);
      }
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
`;

const NotiStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.7);
  color: white;
  font-size: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 10px;
  padding-bottom: 10px;
  text-align: right;
`;
