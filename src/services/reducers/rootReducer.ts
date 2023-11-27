import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredientsReducer';
import {cartReducer} from './cartReducer';
import {orderReducer} from './orderReducer';
import {ingredientModalReducer} from './ingredientModalReducer'
import {userReducer} from './userReducer'
import {recoveryProfileReducer} from './recoveryProfileReducer'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    cart: cartReducer,
    order: orderReducer,
    ingredientModal: ingredientModalReducer,
    user: userReducer,
    recoveryProfile: recoveryProfileReducer
})


