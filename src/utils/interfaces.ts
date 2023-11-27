import {rootReducer} from "../services/reducers/rootReducer";
import ingredient from "../components/Ingredient/Ingredient";

export type RootState = ReturnType<typeof rootReducer>;

export interface CartState {
    cart: Tingredient [];
    bun: Tingredient & { empty?: boolean | undefined, text: string };
}

export interface OrderState {
    order: {
        number: number
    };
    orderRequest: boolean;
    orderRequestFiled: boolean;
}

export interface IUser {
    user: {
        email: string,
        name: string
    } | null,
    registerRequest: boolean,
    registerRequestSuccess: boolean,
    registerRequestFiled: boolean,

    userLoginRequest: boolean,
    userLoginRequestFiled: boolean,

    userProfileRequestSuccess: boolean,
    userProfileRequestFiled: boolean,

    userProfileRequestUpdate: boolean,
    userProfileRequestUpdateSuccess: boolean,

    logoutRequest: boolean,
    logoutRequestSuccess: boolean,
    logoutRequestFiled: boolean,
    logoutRequestMessage: null | string
}
export interface IingredientsState {
    ingredients: Tingredient[]  ,
    ingredientRequest: boolean,
    ingredientRequestSuccess: boolean,
    ingredientRequestFiled: boolean,
}
export type IingredientDetailsDataState  = {
    modalData: Tingredient | null | undefined ;
}
export type Tingredient = {
    _id?: string;
    key?: string;
    index?: number;
    id: string;
    name: string;
    type: 'main' | 'sauce' | 'bun';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;

}

export interface IFormValues {
    email?: string;
    password?: string;
    login?: string
}
