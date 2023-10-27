import {
    POST_RECOVERY_BY_MAIL,
    POST_RECOVERY_BY_MAIL_FILED,
    POST_PASSWORD_RESET_BY_CODE,
    POST_PASSWORD_RESET_BY_CODE_FILED

} from "../actions/recoveryProfile";

const initialState = {
    message: null,
    recoveryRequestFiled: false,
    recoveryRequestSuccess: false,
    resetRequestSuccess: false,
    resetRequestSuccessFiled: false,

};
export const recoveryProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state

        case POST_RECOVERY_BY_MAIL:
            return {
                ...state,
                recoveryRequestSuccess: true,
                message: action.payload
            }
        case POST_RECOVERY_BY_MAIL_FILED:
            return {
                ...initialState,
                recoveryRequestFiled: true
            }

        case POST_PASSWORD_RESET_BY_CODE:
            return {
                ...state,
                resetRequestSuccess: true,
                message: action.payload
            }
        case POST_PASSWORD_RESET_BY_CODE_FILED:
            return {
                ...initialState,
                resetRequestSuccessFiled: true
            }


    }
}
