import React, { useState, KeyboardEvent, useRef, ChangeEvent } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { signInRequest } from 'apis';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

// component: Auth layout
export default function Auth() {
    // function: navigator
    const navigator = useNavigate();

    // state: 화면상태
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

    // state: cookie 상태
    const [cookies, setCookie] = useCookies();

    // component: sign in card
    const SignInCard = () => {
        //state email 요소 참조 상태
        const emailRef = useRef<HTMLInputElement | null>(null);

        //state password 요소 참조 상태
        const passwordRef = useRef<HTMLInputElement | null>(null);

        //state email 상태
        const [email, setEmail] = useState<string>('');

        //state password 상태
        const [password, setPassword] = useState<string>('');

        //state password type 상태
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

        //state password button icon 상태
        const [passwordBtnIcon, setPasswordBtnIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

        //state error 상태
        const [error, setError] = useState<boolean>(false)

        // function : sign in response
        const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
            if (!responseBody) {
                alert('네트워크 이상입니다.');
                return;
            }
            const { code } = responseBody;
            if (code === 'DBE') alert('데이더베이스 오류입니다.');
            if (code === 'SF' || code === 'VF') setError(true);
            if (code !== 'SU') return;

            const { token, expirationTime } = responseBody as SignInResponseDto;
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);

            setCookie('accessToken', token, { expires, path: MAIN_PATH() });
            navigator(MAIN_PATH());
        }

        //event handler: 이메일 변경 이벤트처리
        const emailOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setEmail(value);
        }
        //event handler: 비밀번호 변경 이벤트처리
        const pwdOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPassword(value);
        }


        //event handler: 로그인 버튼 클릭 이벤트
        const signInBtnOnClickHandler = () => {
            const requestBody: SignInRequestDto = { email, password };
            signInRequest(requestBody).then(signInResponse);
        }

        //event handler: 회원가입 링크 클릭 이벤트
        const signUpBtnOnClickHandler = () => {
            setView('sign-up');
        }

        //event handler: password button click event
        const passwordButtonOnClickHandler = () => {
            if(passwordType === 'text') {
                setPasswordType('password');
                setPasswordBtnIcon('eye-light-off-icon');
            } else {
                setPasswordType('text');
                setPasswordBtnIcon('eye-light-on-icon');
            }
        }

        //event handler: e-mail KeyDown event
        const emailOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            if(!passwordRef.current) return;
            passwordRef.current.focus();
        }

        //event handler: password KeyDown event
        const pwdOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key !== 'Enter') return;
            signInBtnOnClickHandler();
        }

        // render: sign in card 컴포넌트
        return (
            <div className='auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>{'Sign In'}</div>
                        </div>
                        <InputBox ref={emailRef} label='E-mail' type='text' placeholder='이메일주소를 입력하세요' 
                            error={error} value={email} onChange={emailOnChangeHandler} 
                            onKeyDown={emailOnKeyDownHandler} />
                        <InputBox ref={passwordRef} label='Password' type={passwordType} placeholder='비밀번호를 입력하세요' 
                            error={error} value={password} onChange={pwdOnChangeHandler} icon={passwordBtnIcon} 
                            onKeyDown={pwdOnKeyDownHandler}  onButtonClick={passwordButtonOnClickHandler} />
                    </div>
                    <div className='auth-card-bottom'>
                        {error &&
                        <div className='auth-sign-in-error-box'>
                            <div className='auth-sign-in-error-message'>
                                {`이메일 주소 또는 비밀번호를 잘못입력하였습니다.\n내용을 다시 확인해 주세요.`}
                            </div>
                        </div>
                        }
                        <div className='black-large-button' onClick={signInBtnOnClickHandler}>{' 로그인'}</div>
                        <div className='auth-description-box'>
                            <div className='auth-description'>{'신규사용자인가요? '}
                                <span className='auth-description-link' onClick={signUpBtnOnClickHandler}>{' 회원가입'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // component: sign up card
    const SignUpCard = () => {
        /**
         * state: 요소 참조
         * email, password, passwordchk
         * nickname, telNumber, address, addressDetail
         */
        const emailRef = useRef<HTMLInputElement | null>(null);
        const pwdRef = useRef<HTMLInputElement | null>(null);
        const pwdChkRef = useRef<HTMLInputElement | null>(null);
        const nicknameRef = useRef<HTMLInputElement | null>(null);
        const telNumberRef = useRef<HTMLInputElement | null>(null);
        const addressRef = useRef<HTMLInputElement | null>(null);
        const addressDetailRef = useRef<HTMLInputElement | null>(null);

        // state: page number 
        const [page, setPage] = useState<1|2>(2);
        // state: email 상태
        const [email, setEmail] = useState<string>('');
        // state: password 상태
        const [pwd, setPwd] = useState<string>('');
        // state: password 확인상태
        const [pwdchk, setPwdchk] = useState<string>('');
        // state: 닉네임 상태
        const [nickname, setNickname] = useState<string>('');
        // state: 핸드폰 번호 상태
        const [telNumber, setTelNumber] = useState<string>('');
        // state: 주소 상태
        const [address, setAddress] = useState<string>('');
        // state: 상세 주소 상태
        const [addressDetail, setAddressDetail] = useState<string>('');
        // state: 개인정보 동의 상태
        const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);

        // state password type 상태
        const [pwdType, setPwdType] = useState<'text' | 'password'>('password');
        // state password type 상태
        const [pwdChkType, setPwdChkType] = useState<'text' | 'password'>('password');
        
        // state email error 상태
        const [emailError, setEmailError] = useState<boolean>(false);
        // state password error 상태
        const [pwdError, setPwdError] = useState<boolean>(false);
        // state password check error 상태
        const [pwdChkError, setPwdChkError] = useState<boolean>(false);
        // state nickname error 상태
        const [nicknameError, setNicknameError] = useState<boolean>(false);
        // state telNumber error 상태
        const [telNumberError, setTelNumberError] = useState<boolean>(false);
        // state address error 상태
        const [addressError, setAddressError] = useState<boolean>(false);
        // state personal info agreed error 상태
        const [agreedPerError, setAgreedPerError] = useState<boolean>(false);
        

        // state: 이메일 에러 메세지 상태
        const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
        // state: 패스워드 에러 메세지 상태
        const [pwdErrorMsg, setPwdErrorMsg] = useState<string>('');
        // state: 패스워드 확인 에러 메세지 상태
        const [pwdCheckErrorMsg, setPwdCheckErrorMsg] = useState<string>('');
        // state: 닉네임 에러 메세지 상태
        const [nicknameErrorMsg, setNicknameErrorMsg] = useState<string>('');
        // state: 헨드폰 번호 에러 메세지 상태
        const [telNumberErrorMsg, setTelNumberErrorMsg] = useState<string>('');
        // state: 주소 에러 메세지 상태
        const [addressErrorMsg, setAddressErrorMsg] = useState<string>('');



        //state password button icon 상태
        const [pwdBtnIcon, setPwdBtnIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

        //state password check button icon 상태
        const [pwdChkBtnIcon, setPwdChkBtnIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

        // function: 다음주소검색 popUp
        const openPopUp = useDaumPostcodePopup();

        // event handler: email 변경 이벤트
        const emailOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setEmail(value);
            setEmailError(false);
            setEmailErrorMsg('');
        }
        // event handler: password 변경 이벤트
        const pwdOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setPwd(value);
            setPwdError(false);
            setPwdErrorMsg('');
        }
        // event handler: password check 변경 이벤트
        const pwdChkOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setPwdchk(value);
            setPwdChkError(false);
            setPwdCheckErrorMsg('');
        }
        // event handler: nicknameOnchangeHandler
        const nicknameOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setNickname(value);
            setNicknameError(false);
            setNicknameErrorMsg('');
        }
        // event handler: input text onchangeHandler
        const telNumberOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setTelNumber(value);
            setTelNumberError(false);
            setTelNumberErrorMsg('');
        }
        // event handler: input text onchangeHandler
        const addressOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setAddress(value);
            setAddressError(false);
            setAddressErrorMsg('');
        }
        // event handler: input text onchangeHandler
        const addressDtlOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setAddressDetail(value);
        }
        // event handler: agreed Personal info Click event
        const agreedPersonalOnClickHandler = () => {
            setAgreedPersonal(!agreedPersonal);
            setAgreedPerError(false);
        }

        // event handler: password button click event
        const pwdButtonOnClickHandler = (type: string) => {
            if(type === 'pwd') {
                if(pwdBtnIcon === 'eye-light-off-icon') {
                    setPwdType('text');
                    setPwdBtnIcon('eye-light-on-icon');
                } else {
                    setPwdType('password');
                    setPwdBtnIcon('eye-light-off-icon');
                }
            } else {
                if(pwdChkBtnIcon === 'eye-light-off-icon') {
                    setPwdChkType('text');
                    setPwdChkBtnIcon('eye-light-on-icon');
                } else {
                    setPwdChkType('password');
                    setPwdChkBtnIcon('eye-light-off-icon');
                }
            }
        }

        // event handler: 로그인 링크 클릭 이벤트
        const signInLinkOnClickHandler = () => {
            setView('sign-in');
        }

        // event handler: email key down event
        const emailOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!pwdRef.current) return;
            pwdRef.current.focus();
        }

        // event handler: password key down event
        const pwdOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!pwdChkRef.current) return;
            pwdChkRef.current.focus();
        }

        // event handler: password check key down event
        const pwdChkOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!nicknameRef.current) return;
            nicknameRef.current.focus();
            nextButtonOnClickHandler();
        }

        // event handler: nickname key down event
        const nicknameOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!telNumberRef.current) return;
            telNumberRef.current.focus();
        }
        // event handler: telNumber key down event
        const telNumberOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            //if (!addressRef.current) return;
            //addressRef.current.focus();
            addressOnButtonClickHandler();
        }
        // event handler: address key down event
        const addressOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!addressDetailRef.current) return;
            addressDetailRef.current.focus();
        }
        // event handler: address detail key down event
        const addressDetailOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            signUpButtonOnClickHandler();
        }

        // event handler: daum 주소 찾기 버튼 event
        const addressOnButtonClickHandler = () => {
            openPopUp({ onComplete });
        }

        // event handler: 다음단계 클릭 이벤트 처리
        const nextButtonOnClickHandler = () => {
            const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const isEmailPattern = emailPattern.test(email);
            if (!isEmailPattern) {
                setEmailError(true);
                setEmailErrorMsg('email form is not matched.');
            }
            const isCheckedPassword = pwd.trim().length >= 8;
            if (!isCheckedPassword) {
                setPwdError(true);
                setPwdErrorMsg('비밀번호는 8자 이상 입력하세요.');
            }
            const isEqualPassword = pwd === pwdchk;
            if (!isEqualPassword) {
                setPwdChkError(true);
                setPwdCheckErrorMsg('비밀번호가 일치하지않습니다.');
            }
            if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;

            setPage(2);
        }

        // event handler: 회원가입버튼 이벤트 처리
        const signUpButtonOnClickHandler = () => {

        }

        // event handler: daum 주소 검색 완료
        const onComplete = (data: Address) => {
            const { address } = data;
            setAddress(address);
            if (!addressDetailRef.current) return;
            addressDetailRef.current.focus();
        }

        // render: sign up card 컴포넌트
        return (
            <div className='auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>{`회원가입`}</div>
                            <div className='auth-card-page'>{`${page}/2`}</div>
                        </div>
                        {page === 1 && (
                        <>
                        <InputBox ref={emailRef} label='E-mail *' type='text' 
                            placeholder='email 주소를 입력하세요' value={email} error={emailError}
                            onChange={emailOnchangeHandler} message={emailErrorMsg} 
                            onKeyDown={emailOnKeyDownHandler} />
                        <InputBox ref={pwdRef} label='Password *' type={pwdType} 
                            placeholder='비밀번호를 입력하세요' value={pwd} error={pwdError}
                            onChange={pwdOnchangeHandler} message={pwdErrorMsg} icon={pwdBtnIcon} 
                            onButtonClick={() => pwdButtonOnClickHandler('pwd')}
                            onKeyDown={pwdOnKeyDownHandler} />
                        <InputBox ref={pwdChkRef} label='Confirm Password *' type={pwdChkType}
                            placeholder='비밀번호를 한번 더 입력하세요' value={pwdchk} error={pwdChkError}
                            onChange={pwdChkOnchangeHandler} message={pwdCheckErrorMsg} icon={pwdChkBtnIcon} 
                            onButtonClick={() => pwdButtonOnClickHandler('chk')}
                            onKeyDown={pwdChkOnKeyDownHandler} />
                        </>
                        )}
                        {page === 2 && (
                        <>
                        <InputBox ref={nicknameRef} label='Nickname *' type='text'
                            placeholder='Nickname 을 입력하세요' value={nickname} error={nicknameError}
                            onChange={nicknameOnchangeHandler} message={nicknameErrorMsg}
                            onKeyDown={nicknameOnKeyDownHandler}
                        />
                        <InputBox ref={telNumberRef} label='핸드폰 번호 *' type='text'
                            placeholder='휴대폰번호를 입력하세요' value={telNumber} error={telNumberError}
                            onChange={telNumberOnchangeHandler} message={telNumberErrorMsg}
                            onKeyDown={telNumberOnKeyDownHandler}
                        />
                        <InputBox ref={addressRef} label='주소 *' type='text'
                            placeholder='우편번호 찾기' value={address} error={addressError}
                            onChange={addressOnchangeHandler} message={addressErrorMsg} icon='expand-right-light-icon'
                            onButtonClick={addressOnButtonClickHandler}
                            onKeyDown={addressOnKeyDownHandler}
                        />
                        <InputBox ref={addressDetailRef} label='상세주소' type='text'
                            placeholder='상세주소를 입력하세요' value={addressDetail} error={false}
                            onChange={addressDtlOnchangeHandler}
                            onKeyDown={addressDetailOnKeyDownHandler}
                        />
                        </>
                        )}
                    </div>
                    <div className='auth-card-bottom'>
                        {page === 1 && (
                            <div className='black-large-button' onClick={nextButtonOnClickHandler}>{`Next Step`}</div>
                        )}
                        {page === 2 && (
                            <>
                            <div className='auth-agree-box'>
                                <div className='auth-check-box' onClick={agreedPersonalOnClickHandler}>
                                    <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>
                                </div>
                                <div className={agreedPerError ? 'auth-agree-title-error' : 'auth-agree-title'}>{`개인정보동의`}</div>
                                <div className='auth-agree-link'>{`더보기 >`}</div>
                            </div>
                            <div className='black-large-button' onClick={signUpButtonOnClickHandler}>{`회원가입`}</div>
                            </>
                        )}
                        <div className='auth-description-box'>
                            <div className='auth-description'>{'Do you have an account already? '}
                                <span className='auth-description-link' onClick={signInLinkOnClickHandler}>{' 로그인'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // rendering the component //
    return (
        <div id='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth-jumbotron-box'>
                    <div className='auth-jumbotron-contents'>
                        <div className='auth-logo-icon'></div>
                        <div className='auth-jumbotron-text-box' >
                            <div className='auth-jumbotron-text'>{'Welcome to the website!'}</div>
                            <div className='auth-jumbotron-text'>{'Jays Image-Web-Book'}</div>
                        </div>
                    </div>
                </div>
                {view === 'sign-in' && <SignInCard />}
                {view === 'sign-up' && <SignUpCard />}
            </div>
        </div>
    );
}
