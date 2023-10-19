import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredientsReducer';
import {cartReducer} from './cartReducer';
import {orderReducer} from './orderReducer';
import {ingredientModalReducer} from './ingredientModalReducer'
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    cart: cartReducer,
    order: orderReducer,
    ingredientModal: ingredientModalReducer
})