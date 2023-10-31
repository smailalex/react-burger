import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_INGREDIENT_BUN,
    SET_CART,
    ERASE_CART,
} from '../actions/cart';

const initialState = {
    cart: [],
    bun: {
        text: 'Добавьте булку',
        price: 0,
        empty: true
    },
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_INGREDIENT:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case DELETE_INGREDIENT:
            //console.log(action.payload)
            return {
                ...state,
                cart: state.cart.filter((i) => action.payload !== i.key)
            }

        case SET_CART:
            //console.log(action.payload)
            //const drag = state.cart[action.payload.dragIndex];
            //const hovered = state.cart[action.payload.hoverIndex];
            const cart = state.cart.slice()
            cart.splice(
                action.payload.hoverIndex,
                0,
                cart.splice(action.payload.dragIndex, 1)[0]
            );
            return {
                ...state,
                cart: cart
            }
        case SET_INGREDIENT_BUN:
            return {
                ...state,
                bun: action.payload
            }
        case ERASE_CART:
            return initialState

        default:
            return state
    }
} 