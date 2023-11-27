import {checkResponse} from "../../utils/helpers";

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FILED = 'ORDER_REQUEST_FILED';
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const MAKE_ORDER_API = BASE_API_URL+'/orders';

export function makeOrder(orderPostData) {
    return function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderPostData)
        };
        fetch(MAKE_ORDER_API, requestOptions)
            .then(checkResponse)
            .then(json => {
                json.success &&
                dispatch({
                    type: ORDER_REQUEST_SUCCESS,
                    payload: json.order
                });
                //console.log('json.success', json.order)
            })
            .catch((e) => {
                //console.log('setOrderError', e)
                dispatch({
                    type: ORDER_REQUEST_FILED
                });
            })
            .finally(() => {

            })
    };
}