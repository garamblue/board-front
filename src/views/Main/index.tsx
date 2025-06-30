import React from 'react';
import './style.css';
import { User } from 'types/interface';

interface MainProps {
    user: User | null;
}

const Main: React.FC<MainProps> = ({ user }) => {
    // rendering main component //
    return (
        <div className='main-wrapper'>
            {user ? <h1>Hello!, {user.nickname} <br/>Web-Book 사이트에 다시 오신 것을 환영해요!~ ^_^</h1> 
                : <h1>Welcome! Image Web-Book Site.<br/>Enjoy your journey toward interesting New World!</h1>}
        </div>
    );
};

export default Main;