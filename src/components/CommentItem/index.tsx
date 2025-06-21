import './style.css';
import React from 'react';
import { CommentListItem } from 'types/interface';
import defUser from 'assets/img/def-user.png';

interface Props {
    commentListItem: CommentListItem;
}

// component
export default function CommentItem({ commentListItem }: Props) {
    // properties
    const { nickname, profileImage, writeDatetime, content } = commentListItem;

    // rendering
    return (
        <div className='comment-list-item'>
            <div className='comment-list-item-top'>
                <div className='comment-list-item-profile-box'>
                    <div className='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defUser})` }}></div>
                </div>
                <div className='comment-list-item-nickname'>{nickname}</div>
                <div className='comment-list-item-divider'>{`\|`}</div>
                <div className='comment-list-item-time'>{writeDatetime}</div>
            </div>
            <div className='comment-list-item-main'>
                <div className='comment-list-item-content'>{content}</div>
            </div>
        </div>
    );
}