import {createSelector} from "reselect";
const  userSelector = (state) => state.user;
const  recoveryProfileSelector = (state) => state.recoveryProfile;

export const userDataSelector = createSelector(
    userSelector,
    (userData) => ({
        user: userData.user,
        userProfileRequestFiled: userData.userProfileRequestFiled,
        userProfileRequestSuccess: userData.userProfileRequestSuccess,
        logoutRequestSuccess: userData.logoutRequestSuccess,
    })
)
export const recoveryDataSelector = createSelector(
    recoveryProfileSelector,
    (recoveryRequest) => ({
        success: recoveryRequest.recoveryRequestSuccess,
        filed: recoveryRequest.recoveryRequestFiled,
        message: recoveryRequest.message,

    })
)