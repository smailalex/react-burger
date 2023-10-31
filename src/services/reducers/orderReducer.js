import {
    ORDER_REQUEST, ORDER_REQUEST_FILED, ORDER_REQUEST_SUCCESS

} from "../actions/order";

const initialState = {
    order: null,
    orderRequest: false,
    orderRequestFiled: false
};
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }
        case ORDER_REQUEST_SUCCESS:
            return {
                ...state,
                order: action.payload,
                orderRequest: false,
                orderRequestFiled: false
            }
        case ORDER_REQUEST_FILED:
            return {
                ...state,
                orderRequest: false,
                orderRequestFiled: true
            }

        default:
            return state

    }
} 