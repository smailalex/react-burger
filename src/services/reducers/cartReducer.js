
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SET_INGREDIENT_BUN,
} from '../actions/cart';

const initialState = {
  cart: [],
  bun: null,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
    case ADD_INGREDIENT: return {
      ...state,
      cart: [...state.cart, action.ingredient]
    }
    case DELETE_INGREDIENT: return {
      ...state,
      cart: state.cart.filter((i) =>  action.id !== i._id)
    }
    case SET_INGREDIENT_BUN: return {
      ...state,
      bun: action.ingredient
    }


  }
} 