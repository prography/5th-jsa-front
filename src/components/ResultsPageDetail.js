import React from 'react';
import styled from 'styled-components';

// import detailBg from 'img/detail/detail-bg.png';
import detailBg from 'img/detail/detail-bg-el.png';
import emptyHeartIcon from 'img/detail/empty-heart-icon.png';
import heartIcon from 'img/detail/heart-icon.png';
import shareIcon from 'img/detail/share-icon.png';
import chatIcon from 'img/detail/chat-icon.png';

export default function ResultsPageDetail() {
  return (
    <DetailBackgroundStyle className="scale-up">
      <div className="layout">
        <DetailContentStyle>
          <div className="detail-header">
            <div className="realImage" />
            <div className="explain">
              <div className="typo-b3">존스페이버릿</div>
              <div className="iconWrapper">
                <div onClick={() => console.log(2)} className="icon flex">
                  <img src={emptyHeartIcon} alt="hearticon" />
                </div>
                <span>312</span>
                <div onClick={() => console.log(2)} className="icon flex">
                  <img src={shareIcon} alt="shareIcon" />
                </div>
                <span>312</span>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>브랜드</td>
                    {/* 브랜드 누르면 이동 시키나요? */}
                    <td>파파존스</td>
                  </tr>
                  <tr>
                    <td>칼로리</td>
                    <td>13,000kcal</td>
                  </tr>
                  <tr>
                    <td>가격</td>
                    <td>15,000원</td>
                  </tr>
                  <tr>
                    <td>세부토핑</td>
                    <td>어떤 세부 토핑들이 있겟지? 자세한건 잘 모루겟다 허허</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="typo-s1">
            피자 설명입니다. 이 피자는 어떠하구 어떤 특징을 가지구 있고 블라블라 등등등으 피자 설명입니다.
            이 피자는 어떠하구 어 떤 특징을 가지구 있고 블라블라 등등등으
          </div>
          <div className="detail-chip">
            <div className="chip">#조금매워</div>
            <div className="chip">#토핑많음</div>
            <div className="chip">#달콤</div>
          </div>
          <div className="detail-chat">
            <div className="chat-header">
              <div className="flex"><img src={chatIcon} alt="chaticon" width="24px" /></div>
              <span className="typo-s1">312</span>
            </div>
            {/* 댓글 작성하는 곳 */}
            <div className="chat-input">
              <div className="chat-input-wrapper">
                <input placeholder=" 댓글을 달아주세요" type="text" onChange={() => console.log(2)} />
              </div>
              <button type="button">작성하기</button>
            </div>
            {/* 댓글 리스트 */}
            <div className="chat-list">
              {[...Array(3)].map((val, index) => (
                <div className="comment">
                  <div className="comment-thumbnail" />
                  <div>
                    <div className="comment-id">
                      <span className="bold typo-s1">도디의 아이디</span>
                      <span className="typo-s2">2019년 11월11일</span>
                    </div>
                    <div className="comment-text">
                      이거 나만아는 피자 하고시펏는데 ㅠㅜㅠㅜㅠㅜ<br />
                      이거 나만아는 피자 하고시펏는데 ㅠㅜㅠㅜㅠㅜ<br />
                      이거 나만아는 피자 하고시펏는데 ㅠㅜㅠㅜㅠㅜ<br />
                      이거 나만아는 피자 하고시펏는데 ㅠㅜㅠㅜㅠㅜ<br />
                      이거 나만아는 피자 하고시펏는데 ㅠㅜㅠㅜㅠㅜ<br />
                      이거 나만아는 피자 하고시펏는데 ㅠㅜㅠㅜㅠㅜ<br />
                      이거 나만아는 피자 하고시펏는데 ㅠㅜㅠㅜㅠㅜ<br />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DetailContentStyle>
        <div className="bg" />
        <img src={detailBg} alt="list background" className="listBg" />
      </div>
    </DetailBackgroundStyle>
  );
}

const DetailContentStyle = styled.div`
  position: absolute;
  z-index: 1;
  padding: 30px;
  height: 100%;
  overflow: auto;
  .detail-header{
    display: flex;
    margin-bottom: 24px;
    .realImage{
      width: 400px;
      height: 300px;
      background-color: white;
      flex-shrink: 0;
    }
    .explain{
      margin-left: 24px;
      .iconWrapper{
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 13px 0 8px 0;
        img{
          width: 22px;
          margin-right: 10px;
        }
        span{
          margin-right: 10px;
        }
      }
      table{
        font-size: 14px;
        td{
          margin-top: 5px;
          &:first-child{
            font-weight: bold;
            width: 80px;
            display: block;
          }
        }
      }
    }
  }
  /* chip 스타일 */
  .detail-chip{
    margin: 24px 0;
    .chip{
      border: 1px solid #E03535;
      border-radius: 100px;
      display: inline-block;
      padding: 2px 20px;
      margin-right: 10px;
    }
  }
  /* 댓글 스타일 */
  .detail-chat{
    .chat-header{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span{
        margin-left: 8px;
      }

    }
    /* 댓글 작성 */
    .chat-input{
      .chat-input-wrapper{
        height: 42px;
        width: calc(100% - 108px);
        background-color: white;
        display: inline-flex;
        border-radius: 4px;
      }
      input{
        font-size: 14px;
        border: none;
        margin-left: 10px;
        width: 100%;
      }
      button{
        width: 100px;
        background-color: #E03535;
        color: white;
        font-weight: bold;
        height: 42px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        margin-left: 5px;
      }

    }
    /* 댓글 리스트 */
    .chat-list{
      margin-top: 32px;
      .comment{
        margin-bottom: 24px;
        display: flex;
        &-thumbnail{
          width: 60px;
          height: 60px;
          border-radius: 100px;
          background-color: white;
          margin-right: 16px;
        }
        &-id{
          .typo-s2{
            color: #adadad;
            margin-left: 10px;
          }
        }
        &-text{
          margin-top: 8px;
          font-size: 14px;
        }
      }
    }
  }
`;

const DetailBackgroundStyle = styled.div`
  .layout{
    box-shadow: 10px 20px 40px 0 rgba(0,0,0,0.4);
    position: relative;
    width: 750px;
    height: calc(100% - 40px);
    max-height: 768px;
    border-radius: 0 0 150px;
  }
  .listBg{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 155px;
  }
  .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    border-radius: 0 0 150px;
    box-shadow: 10px 20px 40px 0 rgba(0,0,0,0.4);
  }
`;
