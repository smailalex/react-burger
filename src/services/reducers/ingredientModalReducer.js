import {DELETE_MODAL_DATA, SET_MODAL_DATA} from "../actions/ingredientModal";

const initialState = {
    modalData: null,
};
export const ingredientModalReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_MODAL_DATA:
            return {
                ...state,
                modalData: action.payload
            }

        case DELETE_MODAL_DATA:
            console.log(action.payload)
            return {
                initialState
            }

        default:
            return state


    }
}