import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';

// component: layouts
export default function Header() {

    // state: 로그인 유저 상태
    const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

    // state: path 상태 //
    const { pathname } = useLocation();

    // state: cookie 상태 //
    const [cookies, setCookie] = useCookies();

    // state: 로그인 상태 //
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // state: Auth 페이지 상태
    const [isAuthPage, setAuthPage] = useState<boolean>(false);
    // state: Main 페이지 상태
    const [isMainPage, setMainPage] = useState<boolean>(false);
    // state: Search 페이지 상태
    const [isSearchPage, setSearchPage] = useState<boolean>(false);
    // state: Board Detail 페이지 상태
    const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
    // state: Board Write 페이지 상태
    const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
    // state: Board Update 페이지 상태
    const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
    // state: User 페이지 상태
    const [isUserPage, setUserPage] = useState<boolean>(false);

    // function: Navigation handler //
    const navigate = useNavigate();

    // event handler: 로고 클릭이벤트 처리
    const logoClickHandler = () => {
        navigate(MAIN_PATH());
    };

    // component: 검색버튼
    const SearchButton = () => {
        // state: 검색버튼 요소 참조상태
        const searchButtonRef = useRef<HTMLDivElement | null>(null);

        // state: 검색버튼 상태 //
        const [status, setStatus] = useState<boolean>(false);

        // state: 검색어 상태 //
        const [searchWord, setSearchWord] = useState<string>('');

        // state: 검색어 path variable //
        const { srchWrd } = useParams();

        // event handler: 검색아이콘 클릭 이벤트 처리
        const searchIconOnClickHandler = () => {
            // 클릭 상태 변경
            if(!status) {
                setStatus(!status);
                return;
            }
            navigate(SEARCH_PATH(searchWord));
        };

        // event handler: 검색어 변경 이벤트 처리
        const searchWordOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            // 검색어 상태 변경
            const value = e.target.value;
            setSearchWord(value);
        };

        // event handler: 검색어 키 이벤트 처리 함수
        const searchWordOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== 'Enter') {
                return;
            }
            if (!searchButtonRef.current) {
                return;
            }
            searchButtonRef.current.click();
        };

        //effect: path variable가 변경될때 마다 실행
        useEffect(() => {
            if(srchWrd) {
                //navigate(MAIN_PATH());
                setSearchWord(srchWrd);
                setStatus(true);
            }
        }, [srchWrd]);

        if (!status)
            // rendering the search button component 클릭 false//
            return <div className='icon-button' onClick={searchIconOnClickHandler}>
                <div className='icon search-light-icon'></div>
            </div>;

        // rendering the search button component 클릭 true//
        return (
            <div className='header-search-input-box'>
                <input className='header-search-input' type='text' 
                  placeholder='검색어 입력' value={searchWord}
                  onChange={searchWordOnChangeHandler} onKeyDown={searchWordOnKeyDownHandler}/>
                <div ref={searchButtonRef} className='icon-button' onClick={searchIconOnClickHandler}>
                    <div className='icon search-light-icon'></div>
                </div>
            </div>
        );
    };

    // component: 로그인 또는 마이페이지 버튼
    const LoginMyPageButton = () => {

        // event handler: 로그인 또는 마이페이지 클릭 이벤트 처리
        const loginMyPageOnClickHandler = () => {
            if (isLoggedIn) {
                // 마이페이지로 이동
                if (!loginUser) return;
                const { email } = loginUser;
                navigate(USER_PATH(email));
            } else {
                // 로그인 페이지로 이동
                navigate(AUTH_PATH());
            }
        };

        // event handler: 로그아웃 버튼 클릭 이벤트 처리 함수
        const signOutButtonOnClickHandler = () => {
            resetLoginUser();
            setCookie('accessToken', '', {path: MAIN_PATH(), expires: new Date() });
            navigate(MAIN_PATH());
        };

        // rendering the component //
        if (isLoggedIn)
            return (
                <>
                    <div className='white-button' onClick={loginMyPageOnClickHandler}>{'마이페이지'}</div>
                    <div className='white-button' onClick={signOutButtonOnClickHandler}>{'로그아웃'}</div>
                </>
            );
        // 로그인 상태가 아닐 경우 로그인 버튼 렌더링
        return <div className='black-button' onClick={loginMyPageOnClickHandler}>{'로그인'}</div>;

    };

    // component: 업로드 버튼 컴포넌트
    const UploadButton = () => {
        // state: 게시물 상태
        const { title, content, boardImageFileList, resetBoard } = useBoardStore();

        // event handler: 업로드 버튼 클릭 이벤트 처리
        const uploadButtonOnClickHandler = () => {
            const accessToken = cookies.accessToken;
            
            // 게시물 업로드 처리
            if (!title || !content || boardImageFileList.length === 0) {
                alert('제목, 내용, 이미지 파일을 모두 입력해주세요.');
                return;
            }
            // 게시물 업로드 로직 추가 필요
            resetBoard();
            navigate(MAIN_PATH());
        };

        // rendering the upload button component
        // render: 업로드 버튼 컴포넌트 렌더링
        if (title && content)
        return <div className='black-button' onClick={uploadButtonOnClickHandler}>{'업로드'}</div>;
        // render: 업로드 불가 버튼 컴포넌트 렌더링
        return <div className='disable-button'>{'업로드 불가'}</div>;
    };

    // effect: path 상태 변경 시 마다 실행될 함수 //
    useEffect(() => {
        const isAuthPage = pathname.startsWith(AUTH_PATH());
        const isMainPage = pathname === MAIN_PATH();
        const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
        const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
        const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
        const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
        const isUserPage = pathname.startsWith(USER_PATH(''));

        setAuthPage(isAuthPage);
        setMainPage(isMainPage);
        setSearchPage(isSearchPage);
        setBoardDetailPage(isBoardDetailPage);
        setBoardWritePage(isBoardWritePage);
        setBoardUpdatePage(isBoardUpdatePage);
        setUserPage(isUserPage);
    }, [pathname]);

    // effect: login user 가 변경 시 마다 실행될 함수 //
    useEffect(() => {
        setIsLoggedIn(loginUser !== null);
    }, [loginUser])

    // rendering the component //
    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-left-box' onClick={logoClickHandler}>
                    <div className='icon-box'>
                        <div className='icon logo-dark-icon'></div>
                    </div>
                    <div className='header-logo'>{'Jays Web-Book'}</div>
                </div>
                <div className='header-right-box'>
                    {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
                    {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <LoginMyPageButton />}
                    {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
                </div>
            </div>
        </div>
    );
}