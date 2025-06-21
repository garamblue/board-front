import React from 'react';
import './style.css';

// component: User layout
export default function User() {

    // rendering the component //
    return (
        <div className='user-container'>
            <div className='user-header'>
                <h2>유저 페이지</h2>
            </div>
            <div className='user-body'>
                <p>유저 정보가 여기에 표시됩니다.</p>
            </div>
        </div>
    )
}