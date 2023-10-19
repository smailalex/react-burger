export type ingredientContext = {
    _id: string,
    name: string,
    type: 'top' | 'bottom',
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
};
export type ingredientsContext = ingredientContext[];

export type order =  {
    orderId: number
}
export type modal =  {
    onClose: Function
}