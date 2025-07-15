import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Auth from 'views/Auth';
import Search from 'views/Search';
import UserP from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { MAIN_PATH, AUTH_PATH, USER_PATH, IBOOK_PATH } from 'constant';
import { SEARCH_PATH, BOARD_PATH, BOARD_DETAIL_PATH  } from 'constant';
import { BOARD_WRITE_PATH, BOARD_UPDATE_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { getSignInUserRequest } from 'apis/requestApi_user';
import { GetSignInUserResponseDto } from 'apis/response/user/exportType';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';
import ImageBookViewer from 'components/ImageBookViewer';
import ImageCard from 'ImageCard';
import imageSrc from './assets/img/modify001.png'; // 경로 주의

// component //
function App() {

  // state: login user static 상태
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

  // state: login user info for props 전달용
  const [user, setUser] = useState<User | null>(null);

  // state: cookie 상태
  const [cookies, setCookie] = useCookies();

  // function get Sign In User Response
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if(!responseBody) return;
    const {code} = responseBody;
    if (code === 'AF' || code === 'NU' || code === 'DBE') {
      resetLoginUser();
      setUser(null);
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto };
    setLoginUser(loginUser);
    setUser(loginUser);
  }

  // effect: accessToken cookie 값이 변경될 때마다 실행
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      setUser(null);
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  

  // rendering the component //
  // description: 메인 화면 : '/' - Main //
  // description: 로그인 + 회원가입 화면 : '/auth' - Auth //
  // description: 검색 화면 : '/search/:srchWrd' - Search //
  // description: 유저 페이지 : '/user/:userEmail' - User //
  // description: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail //
  // description: 게시물 작성하기 : '/board/write' - BoardWrite //
  // description: 게시물 수정하기 : '/board/update/:boardNumber' - BoardUpdate //
  return (
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main user={user} />} />
          <Route path={AUTH_PATH()} element={<Auth />} />
          <Route path={SEARCH_PATH(':srchWrd')} element={<Search />} />
          <Route path={USER_PATH(':userEmail')} element={<UserP />} />
          {<Route path={IBOOK_PATH()} element={<ImageBookViewer />} />}
          <Route path={BOARD_PATH()}>
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
            <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
            <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
  );
}

export default App;