import Ingredient from "../components/Ingredient/Ingredient";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ingredientDataSelector} from "../selectors";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getIngredients} from "../services/actions/ingredients";
import {SET_MODAL_DATA} from "../services/actions/ingredientModal";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import {HomePage} from "./HomePage";

export const IngredientID = () => {
    const [ingredient, setIngredient] = useState({});
    const dispatch = useDispatch();
    const {
        ingredientRequest, ingredientRequestSuccess, ingredientRequestFiled, ingredients
    } = useSelector(ingredientDataSelector);
    const ingredientDetailsDataSelector = (state) => state.ingredientModal.modalData;
    const ingredientDetailsData = useSelector(ingredientDetailsDataSelector)
    const location = useLocation();
    const {id} = useParams();


    useEffect(() => {
        if (location.state?.form === '/' && location.state?.ingredient) {
            dispatch({type: SET_MODAL_DATA, payload: location.state?.ingredient})
        }else {
            if (id) dispatch(getIngredients());
        }

    }, []);

    useEffect(() => {
        if (ingredientRequestSuccess) {
            setIngredient(ingredients.find(i => i._id = id))
            //console.log(location.state?.ingredient)

        }
    }, [ingredientRequestSuccess, ingredient]);

    if ( ingredientDetailsData ) {
        return   <HomePage />
        }else {
            return  <IngredientDetails ingredient={ingredient}/>
        }


}