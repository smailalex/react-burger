const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const API = BASE_API_URL+'/ingredients';
export const GET_INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'INGREDIENTS_REQUEST_SUCCESS';
export const GET_INGREDIENTS_REQUEST_FILED = 'INGREDIENTS_REQUEST_FILED';
export const ADD_COUNT_INGREDIENT = 'ADD_COUNT_INGREDIENT';
export const DELETE_COUNT_INGREDIENT = 'DELETE_COUNT_INGREDIENT';
export const DELETE_ALL_COUNTS_INGREDIENTS = 'DELETE_ALL_COUNTS_INGREDIENTS';
export const SET_COUNT_BUN = 'SET_COUNT_BUN';


export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(API)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(`Ошибка ${response.status}`)
            })
            .then(json => {
                json.success &&
                dispatch({
                    type: GET_INGREDIENTS_REQUEST_SUCCESS,
                    payload: json.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_REQUEST_FILED
                })
                //setError({ isError: true, message: error })
                //setIsDataLoaded(false)
                //console.error(error)
            })
            .finally(() => {
                //setIsLoading(false)
            })

    };
}