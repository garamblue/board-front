import React from 'react';
import './style.css';
import defUser from 'assets/img/def-user.png';
import bb from 'assets/img/bb.jpg';
import { BoardListItem } from 'types/interface';

interface Props {
    top3ListItem: BoardListItem
}

export default function Top3Item({ top3ListItem }: Props) {
    // properties
    const {boardNumber, title, content, boardTitleImage} = top3ListItem;
    const {favoriteCount, commentCount, viewCount} = top3ListItem;
    const {writeDatetime, writerNickname, writerProfileImage} = top3ListItem;
    
    // event handler: 게시물 아이템 클릭 이벤트 처리
    const onClickHandler = () => {
        //navigator(boardNumber);
    };
    return (
        <div className='top-3-list-item' style={{ backgroundImage: `url(${boardTitleImage ? boardTitleImage : bb})` }} onClick={onClickHandler}>
            <div className='top-3-list-item-main-box'>
                <div className='top-3-list-item-top'>
                    <div className='top-3-list-item-profile-box'>
                        <div className='top-3-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defUser})` }}></div>
                    </div>
                    <div className='top-3-list-item-write-box'>
                        <div className='top-3-list-item-nickname'>{writerNickname}</div>
                        <div className='top-3-list-item-write-date'>{'2022. 05. 12.'}</div>
                    </div>
                </div>
                <div className='top-3-list-item-middle'>
                    <div className='top-3-list-item-title'>{'안녕하세요 오늘 점심은 아내가 만든 순두부찌개를 먹었습니다.'}</div>
                    <div className='top-3-list-item-content'>{'우리 모두 나누어 먹었는데 너무 맛있어서 기절초풍할 정도였습니다.'}</div>
                </div>
                <div className='top-3-list-item-bottom'>
                    <div className='top-3-list-item-counts'>
                        {`댓글 0  | 좋아요 0 | 조회수 0`}
                    </div>

                </div>
            </div>
        </div>
    )
}

