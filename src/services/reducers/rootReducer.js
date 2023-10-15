import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredientsReducer';
import {cartReducer} from './cartReducer';
export const rootReducer = combineReducers({
    ingredientsReducer,
    cartReducer
}) 