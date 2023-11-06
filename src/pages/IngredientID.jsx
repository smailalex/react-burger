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
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.state?.ingredient && location.state.isModal) {
            dispatch({type: SET_MODAL_DATA, payload: location.state?.ingredient})
        }
    }, []);


    return   <HomePage />


}