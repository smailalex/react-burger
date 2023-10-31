import {createSelector} from "reselect";
const  userSelector = (state) => state.user;
const  recoveryProfileSelector = (state) => state.recoveryProfile;

const ingredientSelector = (state) => state.ingredients;

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
        resetRequestSuccess: recoveryRequest.resetRequestSuccess,
        resetRequestSuccessFiled: recoveryRequest.resetRequestSuccessFiled,
        filed: recoveryRequest.recoveryRequestFiled,
        message: recoveryRequest.message,

    })
)
export const ingredientDataSelector = createSelector(
    ingredientSelector,
    (ingredientRequest) => ({
        ingredients: ingredientRequest.ingredients,
        ingredientRequest: ingredientRequest.ingredientRequest,
        ingredientRequestFiled: ingredientRequest.ingredientRequestFiled,
        ingredientRequestSuccess: ingredientRequest.ingredientRequestSuccess


    })
)