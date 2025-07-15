import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import { commentListMock } from 'mocks';
import favoriteListMock from 'mocks/favorite-list.mock';
import React, { useEffect, useState } from 'react';
import { CommentListItem, FavoriteListItem } from 'types/interface';

// component: 게시물 상세보기
export default function BoardDetail() {

    // component: 게시물 상세 상단
    const BoardDetailTop = () => {

        // rendering Top component //
        return (
            <div id='board-detail-top'>
                <div className='board-detail-top-header'>
                    <div className='board-detail-title'>{`sddflkjksdflksjdflkskjdflkksjdflkjsdfdf`}</div>
                    <div className='board-detail-top-sub-box'>
                        <div className='board-detail-write-info-box'>
                            <div className='board-detail-writer-profile-image'></div>
                            <div className='board-detail-write-nickname'>{`sddflkjksfdf`}</div>
                            <div className='board-detail-info-divider'></div>
                            <div className='board-detail-write-date'>{`2025.10.25`}</div>
                        </div>
                        <div className='icon-button'>
                            <div className='icon more-icon'></div>
                        </div>
                        <div className='board-detail-more-box'>
                            <div className='board-detail-update-button'></div>
                            <div className='divider'></div>
                            <div className='board-detail-delete-button'></div>
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='board-detail-top-main'>
                    <div className='board-detail-text'></div>
                    <div className='board-detail-image'></div>
                </div>
            </div>
        )
    }

    // component: 게시물 상세 하단
    const BoardDetailBottom = () => {

        const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
        const [commentList, setCommentList] = useState<CommentListItem[]>([]);

        useEffect(() => {
            setFavoriteList(favoriteListMock);
            setCommentList(commentListMock);
        }, []);

        // rendering Bottom component //
        return (
            <div id='board-detail-bottom'>
                <div className='board-detail-bottom-button-box'>
                    <div className='board-detail-bottom-button-group'>
                        <div className='icon-button'>
                            <div className='icon favorite-fill-icon'></div>
                        </div>
                        <div className='board-detail-bottom-button-text'>{`Like ${12}`}</div>
                        <div className='icon-button'>
                            <div className='icon up-light-icon'></div>
                        </div>
                    </div>

                    <div className='board-detail-bottom-button-group'>
                        <div className='icon-button'>
                            <div className='icon comment-icon'></div>
                        </div>
                        <div className='board-detail-bottom-button-text'>{`Reply ${12}`}</div>
                        <div className='icon-button'>
                            <div className='icon up-light-icon'></div>
                        </div>
                    </div>
                </div>
                <div className='board-detail-bottom-favorite-box'>
                    <div className='board-detail-bottom-favorite-container'>
                        <div className='board-detail-bottom-favorite-title'>{`Like `}<span className='emphasis'>{12}</span></div>
                        <div className='board-detail-bottom-favorite-contents'>
                            {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
                        </div>
                    </div>
                </div>
                <div className='board-detail-bottom-comment-box'>
                    <div className='board-detail-bottom-comment-container'>
                        <div className='board-detail-bottom-comment-title'>{' '}<span className='emphasis'>{12}</span></div>
                        <div className='board-detail-bottom-comment-list-container'>
                        {commentList.map(item => <CommentItem commentListItem={item} />)}
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='board-detail-bottom-comment-pagination-box'>
                        
                    </div>
                    <div className='board-detail-bottom-comment-input-container'>
                        <div className='board-detail-bottom-comment-input-container'>
                            <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' />
                            <div className='board-detail-bottom-comment-button-box'>
                                <div className='disable-button'>{`Reply`} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    // rendering the component //
    return (
        <div id='board-detail-wrapper'>
            <div className='board-detail-container'>
                <BoardDetailTop />
                <BoardDetailBottom />
            </div>
        </div>
    );
}

