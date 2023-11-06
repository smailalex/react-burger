import {checkResponse} from "../../utils/helpers";

export const POST_RECOVERY_BY_MAIL = 'POST_RECOVERY_BY_MAIL';
export const POST_RECOVERY_BY_MAIL_FILED = 'POST_RECOVERY_BY_MAIL';
export const POST_PASSWORD_RESET_BY_CODE = 'POST_PASSWORD_RESET_BY_CODE';
export const POST_PASSWORD_RESET_BY_CODE_FILED = 'POST_PASSWORD_RESET_BY_CODE_FILED';
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const RECOVERY_API = BASE_API_URL + '/password-reset';


export function recoveryByMail(mailPostData) {
    return function (dispatch) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailPostData)
        };
        fetch(RECOVERY_API, requestOptions)
            .then(checkResponse)
            .then(json => {
                dispatch({type: POST_RECOVERY_BY_MAIL, payload: json.message})
            })
            .catch((e) => {
                dispatch({type: POST_RECOVERY_BY_MAIL_FILED});
            })
    }

}

export function ResetPasswordRequest(codePostData) {
    return function (dispatch) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(codePostData)
        };
        fetch(RECOVERY_API + '/reset', requestOptions)
            .then(checkResponse)
            .then(json => {
                dispatch({type: POST_PASSWORD_RESET_BY_CODE, payload: json.message})
            })
            .catch((e) => {
                dispatch({type: POST_PASSWORD_RESET_BY_CODE_FILED});
            })

    }


}