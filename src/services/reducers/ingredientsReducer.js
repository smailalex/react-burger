import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_REQUEST_FILED,
    GET_INGREDIENTS_REQUEST_SUCCESS,
    ADD_COUNT_INGREDIENT,
    DELETE_COUNT_INGREDIENT
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    ingredientRequest: false,
    ingredientRequestFiled: false,
};
export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state

        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientRequest: true
            }
        case GET_INGREDIENTS_REQUEST_SUCCESS:
            //console.log(action.payload)
            return {
                ...state,
                ingredients: action.payload,
                ingredientRequest: false,
                ingredientRequestFiled: false,

            }
        case GET_INGREDIENTS_REQUEST_FILED:
            return {
                ...state,
                ingredientRequest: false,
                ingredientRequestFiled: true
            }
        case ADD_COUNT_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map((i) => (i._id === action.payload._id) ? {...i, count: isNaN(i.count) ? 1 : i.count+1} : i)
            }
        case DELETE_COUNT_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map((i) => (i._id === action.payload._id) ? {...i, count: i.count > 1 ? i.count-1: null} : i)
            }


    }
} 