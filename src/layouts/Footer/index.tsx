import React from 'react';
import './style.css';

// component: Footer layout
export default function index() {
    // event handler: 인스타 아이콘 버튼 클릭 이벤트 처리
    const instaClickHandler = () => {
        window.open('https://www.instagram.com/', '_blank');
    };

    // event handler: 네이버 블로그 아이콘 버튼 클릭 이벤트 처리
    const naverClickHandler = () => {
        window.open('https://blog.naver.com/', '_blank');
    };

    // properties: Footer layout properties
    const footerEmail = 'hemiblues@gmail.com';

    // render: Footer layout rendering
    return (
        <div id='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon logo-light-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{'Jays Web-Book'}</div>
                    </div>
                    <div className='footer-link-box'>
                        <div className='footer-email-link'>{`hemiblues@gmail.com`}
                        </div>
                        <div className='icon-button' onClick={instaClickHandler}>
                            <div className='icon insta-icon'></div>
                        </div>
                        <div className='icon-button' onClick={naverClickHandler}>
                            <div className='icon naver-blog-icon'></div>
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-copyright'>© 2025 Board. All rights reserved.</div>
                </div>
            </div>
        </div>
    );
}
