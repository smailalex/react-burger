import Ingredient from "../components/Ingredient/Ingredient";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ingredientDataSelector} from "../selectors";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getIngredients} from "../services/actions/ingredients";
import {SET_MODAL_DATA} from "../services/actions/ingredientModal";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";

export const IngredientID = () => {
    const [ingredient, setIngredient] = useState({});
    const dispatch = useDispatch();
    const {
        ingredientRequest, ingredientRequestSuccess, ingredientRequestFiled, ingredients
    } = useSelector(ingredientDataSelector);
    const location = useLocation();
    const {id} = useParams();


    useEffect(() => {
        //console.log(location)
        //console.log(navigate)
        if (id) {
            dispatch(getIngredients())
        }

    }, []);

    useEffect(() => {
        if (ingredientRequestSuccess) {
            setIngredient(ingredients.find(i => i._id = id))
            if (location.state?.form === '/') {
                dispatch({type: SET_MODAL_DATA, payload: ingredient})
            }
        }
    }, [ingredientRequestSuccess, ingredient]);

    return (
        ingredient && ingredientRequestSuccess && location.state?.form === '/' ?
            <Ingredient ingredient={ingredient} key={ingredient._id}/>
            : <IngredientDetails ingredient={ingredient}/>
    )
}