import React from 'react';
import { FavoriteListItem } from 'types/interface';
import defUser from 'assets/img/def-user.png';
import './style.css';

interface Props {
    favoriteListItem: FavoriteListItem;
}

// component
export default function FavoriteItem({ favoriteListItem }: Props) {
    // properties
    const { email, nickname, profileImage } = favoriteListItem;

    // rendering
    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                <div className='favorite-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defUser})` }}></div>
            </div>
            <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
    );
}