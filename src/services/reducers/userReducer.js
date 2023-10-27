import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FILED,
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    POST_USER_PROFILE_UPDATE_SUCCESS,
    POST_USER_PROFILE_UPDATE,
    POST_USER_PROFILE_UPDATE_FILED,
    REGISTER_REQUEST,
    REGISTER_REQUEST_SUCCESS,
    REGISTER_REQUEST_FILED,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_SUCCESS,
    LOGOUT_REQUEST_FILED, GET_USER_PROFILE_FILED,


} from "../actions/user";

const initialState = {
    user: null,
    registerRequest: false,
    registerRequestSuccess: false,
    registerRequestFiled: false,

    userLoginRequest: false,
    userLoginRequestFiled: false,

    userProfileRequestSuccess: false,
    userProfileRequestFiled: false,

    userProfileRequestUpdate: false,
    userProfileRequestUpdateSuccess: false,

    logoutRequest: false,
    logoutRequestSuccess: false,
    logoutRequestFiled: false,
    logoutRequestMessage: null


    //accessToken: null,
    //refreshToken: null,

};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case REGISTER_REQUEST:
            return {
                ...state, registerRequest: true, registerRequestSuccess: false, registerRequestFiled: false
            }
        case REGISTER_REQUEST_SUCCESS:
            return {
                ...state,
                user: action.payload,
                registerRequest: false,
                registerRequestSuccess: true,
                registerRequestFiled: false
            }
        case REGISTER_REQUEST_FILED:
            return {
                ...initialState,
                registerRequestFiled: true
            }
        case LOGIN_REQUEST:
            return {
                ...state, userRequest: true
            }

        case LOGIN_REQUEST_SUCCESS:

            return {
                ...state,
                user: action.payload.user,
                userRequest: false,
                //accessToken: action.payload.accessToken,
                //refreshToken: action.payload.refreshToken,
                userProfileRequestSuccess: true
            }
        case LOGIN_REQUEST_FILED:
            return {
                ...initialState, userLoginRequestFiled: true
            }

        case GET_USER_PROFILE:

            return {
                ...state,
            }
        case GET_USER_PROFILE_SUCCESS:

            return {
                ...state, user: action.payload, userProfileRequestFiled: false, userProfileRequestSuccess: true
            }
        case GET_USER_PROFILE_FILED:
            return {
                ...state, userProfileRequestFiled: true, userProfileRequestSuccess: false
            }
        case POST_USER_PROFILE_UPDATE:

            return {
                ...state, userProfileRequestUpdate: true, userProfileRequestUpdateSuccess: false
            }
        case POST_USER_PROFILE_UPDATE_SUCCESS:

            return {
                ...state,
                user: {...state.user, name: action.payload.name, email: action.payload.email},
                userProfileRequestUpdate: false,
                userProfileRequestUpdateSuccess: true
            }
        case POST_USER_PROFILE_UPDATE_FILED:

            return {
                ...state, userProfileRequestUpdate: false, userProfileRequestUpdateSuccess: false
            }
        case LOGOUT_REQUEST:

            return {
                ...state, logoutRequest: true, logoutRequestFiled: false, logoutRequestSuccess: false
            }
        case LOGOUT_REQUEST_SUCCESS:

            return {
                ...initialState, logoutRequestSuccess: true, logoutRequestMessage: action.payload
            }
        case LOGOUT_REQUEST_FILED:

            return {
                ...state, logoutRequest: false, logoutRequestFiled: true, logoutRequestSuccess: false
            }

    }
}