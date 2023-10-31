import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FILED = 'LOGIN_REQUEST_FILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FILED = 'REGISTER_REQUEST_FILED';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_FILED = 'GET_USER_PROFILE_FILED';
export const POST_USER_PROFILE_UPDATE = 'POST_USER_PROFILE_UPDATE';
export const POST_USER_PROFILE_UPDATE_SUCCESS = 'POST_USER_PROFILE_UPDATE_SUCCESS';
export const POST_USER_PROFILE_UPDATE_FILED = 'POST_USER_PROFILE_UPDATE_FILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FILED = 'LOGOUT_REQUEST_FILED';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const REGISTER_USER_API = BASE_API_URL+'/auth/register';
const MAKE_LOGIN_API = BASE_API_URL+'/auth/login';
const GET_SET_USER_DATA_API = BASE_API_URL+'/auth/user';
const REFRESH_TOKEN_API = BASE_API_URL+'/auth/token';
const LOGOUT_TOKEN_API = BASE_API_URL+'/auth/logout';


export function makeLogout(refreshTokenPostData) {
    return function (dispatch) {
        dispatch({type: LOGOUT_REQUEST});
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(refreshTokenPostData)
        };
         async function logout(){
            try {

                const response = await fetch(LOGOUT_TOKEN_API, requestOptions)
                if (response.ok){
                    const data = await response.json();
                    if (data.success) {
                        dispatch({type: LOGOUT_REQUEST_SUCCESS, payload: data.message})
                        deleteCookie('accessToken')
                        deleteCookie('refreshToken')
                    }else{
                        dispatch({type: LOGOUT_REQUEST_FILED})
                    }
                }
            }
            catch (e) {
                dispatch({type: LOGOUT_REQUEST_FILED})
            }
        }
        logout();

    }

}

export function makeRegisterUser(registerPostData) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer your_access_token'
            },
            body: JSON.stringify(registerPostData)
        };
        fetch(REGISTER_USER_API, requestOptions)
            .then(response => {
                if (response.ok) {
                    //console.log('response', response)
                    return response.json()
                    //console.log('response.ok')

                }
                return Promise.reject(`Ошибка ${response.status}`)
            })
            .then(json => {
                json.success &&
                setCookie('accessToken', json.accessToken, {expires: 60 * 60 * 24})
                setCookie('refreshToken', json.refreshToken, {expires: 60 * 60 * 24})
                dispatch({
                    type: REGISTER_REQUEST_SUCCESS,
                    payload: json.user
                });
                //console.log('json.success', json.order)
            })
            .catch((e) => {
                //console.log('setOrderError', e)
                dispatch({
                    type: REGISTER_REQUEST_FILED
                });
            })
            .finally(() => {

            })
    };
}

export function makeLogin(loginPostData) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer your_access_token'
            },
            body: JSON.stringify(loginPostData)
        };
        fetch(MAKE_LOGIN_API, requestOptions)
            .then(response => {
                if (response.ok) {
                    //console.log('response', response)
                    return response.json()
                    //console.log('response.ok')

                }
                return Promise.reject(`Ошибка ${response.status}`)
            })
            .then(json => {
                json.success &&
                setCookie('accessToken', json.accessToken, {expires: 60 * 60 * 24})
                setCookie('refreshToken', json.refreshToken, {expires: 60 * 60 * 24})
                dispatch({
                    type: LOGIN_REQUEST_SUCCESS,
                    payload: json
                });
                //console.log('json.success', json.order)
            })
            .catch((e) => {
                //console.log('setOrderError', e)
                dispatch({
                    type: LOGIN_REQUEST_FILED
                });
            })
            .finally(() => {

            })
    };
}

const makeRefreshAccessToken = async (refreshToken) => {

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': Bearer + refreshToken
        },
        body: JSON.stringify({"token": refreshToken})
    };
    fetch(REFRESH_TOKEN_API, requestOptions)
        .then(response => {
            console.log('makeRefreshAccessToken')

            if (response.ok) {
                return response.json()
            }
            //return Promise.reject(`Ошибка ${response.status}`)
        })
        .then(json => {
            json.success &&
            console.log(' update acess tooken ', refreshToken, json.accessToken)
            setCookie('accessToken', json.accessToken, {expires: 60 * 60 * 24})
        })
        .catch((e) => {

        })
        .finally(() => {

        })

}

export function getUserProfile() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_PROFILE
        });
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken')
            }
        };
        fetch(GET_SET_USER_DATA_API, requestOptions)
            .then(response => {
                if ([403, 200].includes(response.status)) return response.json()
                //console.log(response.status)
                //return Promise.reject(`Ошибка ${response.status}`)
            })
            .then(json => {
                if (json.success) {
                    //setCookie('token' , json.accessToken, {expires: 60*60*24})
                    dispatch({
                        type: GET_USER_PROFILE_SUCCESS,
                        payload: json.user
                    });
                }
                if (!json.success && json.message === 'jwt expired') {
                    //console.log('need RefreshToken', getCookie('refreshToken'))
                    makeRefreshAccessToken(getCookie('refreshToken')).then(() => {
                        getUserProfile();
                    })


                }
            })
            .catch((e) => {
                //console.log('Error', e)
                dispatch({
                    type: GET_USER_PROFILE_FILED
                });
            })
            .finally(() => {

            })
    };
}

export function makeProfileUpdate(updatePostData) {
    return function (dispatch) {
        dispatch({
            type: POST_USER_PROFILE_UPDATE
        });
        const requestOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken')
            },
            body: JSON.stringify(updatePostData)
        };
        fetch(GET_SET_USER_DATA_API, requestOptions)
            .then(response => {
                if ([200].includes(response.status && response.ok)) return response.json()
                //console.log(response.status)
                //return Promise.reject(`Ошибка ${response.status}`)
            })
            .then(json => {
                if (json.success) {
                    //setCookie('token' , json.accessToken, {expires: 60*60*24})
                    dispatch({
                        type: POST_USER_PROFILE_UPDATE_SUCCESS,
                        payload: json.user
                    });
                }
                if (!json.success && json.message === 'jwt expired') {
                    //console.log('need RefreshToken', getCookie('refreshToken'))
                    makeRefreshAccessToken(getCookie('refreshToken')).then(() => {
                        getUserProfile();
                    })
                }
            })
            .catch((e) => {
                console.log('Error', e)
                dispatch({
                    type: POST_USER_PROFILE_UPDATE_FILED
                });
            })
            .finally(() => {

            })
    };
}