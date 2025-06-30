import { SignInRequestDto, SignUpRequestDto } from './request/auth'
import { SignInResponseDto, SignUpResponseDto } from './response/auth'
import { ResponseDto } from './response'
import axios from 'axios';
import GetSignInUserResponseDto from './response/user/getSignInUser.response.dto';

const DOMAIN = 'http://localhost:5000';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const authorization = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } }
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

/**
 * 로그인
 * @param requestBody 
 * @returns 
 */
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then (response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

/**
 * 회원가입
 * @param requestBody
 */
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then (response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

/**
 * get login user's info
 * @param accessToken 
 * @returns 
 */
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then (response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}