
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_FILED,
  GET_INGREDIENTS_REQUEST_SUCCESS,

} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  ingredientRequest: false,
  ingredientRequestFiled: false
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
    case GET_INGREDIENTS_REQUEST_SUCCESS: return {
      ...state,
      ingredients: action.ingredients,
      ingredientRequest: false,
      ingredientRequestFiled: false
    }
    case GET_INGREDIENTS_REQUEST_FILED: return {
      ...state,
      ingredientRequest: false,
      ingredientRequestFiled: true
    }


  }
} 