import {v4 as uuidv4} from 'uuid';
import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_INGREDIENT_BUN,
    SET_CART
} from '../actions/cart';

const initialState = {
    cart: [],
    bun: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case ADD_INGREDIENT:
            return {
                ...state,
                cart: [...state.cart, {...action.ingredient, key: uuidv4()}]
            }
        case DELETE_INGREDIENT:
            console.log(action.payload)
            return {
                ...state,
                cart: state.cart.filter((i) => action.payload !== i.key)
            }

        case SET_CART:
            //console.log(action.payload)
            const drag = state.cart[action.payload.dragIndex];
            const hovered = state.cart[action.payload.hoverIndex];
            const cart = state.cart.slice()
            cart.splice(action.payload.dragIndex, 1, hovered)
            cart.splice(action.payload.hoverIndex, 1, drag)
            return {
                ...state,
                cart: cart
            }
        case SET_INGREDIENT_BUN:
            return {
                ...state,
                bun: action.payload
            }


    }
} 