import React from 'react';
import './style.css';
import bbImage from 'assets/img/bb.jpg';
import defUser from 'assets/img/def-user.png';

import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';

interface Props {
    boardListItem: BoardListItem
}

// component: Board List Item component
export default function BoardItem({ boardListItem }: Props) {
    // properties
    const {boardNumber, title, content, boardTitleImage} = boardListItem;
    const {favoriteCount, commentCount, viewCount} = boardListItem;
    const {writeDatetime, writerNickname, writerProfileImage} = boardListItem;

    // function navigate to board detail page
    //const navigator = useNavigate();

    // event handler: 게시물 아이템 클릭 이벤트 처리
    const onClickHandler = () => {
        //navigator(boardNumber);
    };

    // render: Board List Item component rendering
    return (
        
        <div className='board-list-item' onClick={onClickHandler}>
            <div className='board-list-item-main-box'>
                <div className='board-list-item-top'>
                    <div className='board-list-item-profile-box'>
                        <div className='board-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defUser})` }}>
                        </div>
                    </div>
                    <div className='board-list-item-write-box'>
                        <div className='board-list-item-nickname'>{writerNickname}</div>
                        <div className='board-list-item-write-datetime'>{writeDatetime}</div>
                    </div>
                </div>
                <div className='board-list-item-middle'>
                    <div className='board-list-item-title'>{title}</div>
                    <div className='board-list-item-content'>{content}</div>
                </div>
                <div className='board-list-item-bottom'>
                    <div className='board-list-item-counts'>{`조회수 ${viewCount} | 댓글 ${commentCount} | 좋아요 ${favoriteCount}`}</div>
                </div>
            </div>
            {
                // boardTitleImage !== null && (
                    <div className='board-list-item-image-box'>
                        <div className='board-list-item-image' style={{ backgroundImage: `url(${boardTitleImage ? boardTitleImage : bbImage})` }}></div>
                    </div>
                // )
            }

        </div>
    )
}