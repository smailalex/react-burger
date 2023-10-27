export const POST_RECOVERY_BY_MAIL = 'POST_RECOVERY_BY_MAIL';
export const POST_RECOVERY_BY_MAIL_FILED = 'POST_RECOVERY_BY_MAIL';
export const POST_PASSWORD_RESET_BY_CODE = 'POST_PASSWORD_RESET_BY_CODE';
export const POST_PASSWORD_RESET_BY_CODE_FILED = 'POST_PASSWORD_RESET_BY_CODE_FILED';


const RECOVERY_API = 'https://norma.nomoreparties.space/api/password-reset';


export function recoveryByMail(mailPostData){
    return function (dispatch) {
       async function recovery() {
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
           try{
               const res = await fetch(RECOVERY_API, requestOptions)
               if (res.ok) {
                   const data = await res.json()
                   dispatch({type: POST_RECOVERY_BY_MAIL, payload: data.message })
               }

           }catch (e) {
               dispatch({type: POST_RECOVERY_BY_MAIL_FILED});
           }

        }
        recovery()

    }
}
export function ResetPasswordRequest(codePostData){
    return function (dispatch) {
        async function recovery() {
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
            try{
                const res = await fetch(RECOVERY_API+'/reset', requestOptions)
                if (res.ok) {
                    const data = await res.json()
                    dispatch({type: POST_PASSWORD_RESET_BY_CODE, payload: data.message })
                }

            }catch (e) {
                dispatch({type: POST_PASSWORD_RESET_BY_CODE_FILED});
            }

        }
        recovery()

    }
}