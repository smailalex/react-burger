import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_REQUEST_FILED, GET_INGREDIENTS_REQUEST_SUCCESS} from "./ingredients";

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FILED = 'ORDER_REQUEST_FILED';

const MAKE_ORDER_API = 'https://norma.nomoreparties.space/api/orders';

export function makeOrder(orderPostData) {
    return function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer your_access_token'
            },
            body: JSON.stringify(orderPostData)
        };
        fetch(MAKE_ORDER_API, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                    //console.log('response.ok')
                }
                return Promise.reject(`Ошибка ${response.status}`)
            })
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