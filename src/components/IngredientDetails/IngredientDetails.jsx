import React from "react";
import style from "./IngredientDetails.module.css";
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import Types from '../../utils/types';


function IngredientDetails(props) {
    //console.log(props)
    return (
        <div className={style.wr}>
            <p className="text text_type_main-large pb-8">Детали ингредиента</p>
            <img className={style.doneImg} src={props.image} alt={props.name}/>
            <p className="text text_type_main-medium pb-8">{props.name}</p>
            <div className={style.nutritionsWr}>
                <div className={style.nutritionWr}>
                    <div>Калории,ккал</div><div>{props.calories}</div>
                </div>
                <div className={style.nutritionWr}>
                    <div>Белки, г</div><div>{props.proteins}</div>
                </div>
                <div className={style.nutritionWr}>
                    <div>Жиры, г</div><div>{props.fat}</div>
                </div>
                <div className={style.nutritionWr}>
                    <div>Углеводы, г</div><div>{props.carbohydrates}</div>
                </div>
            </div>
        </div>

    )
}
IngredientDetails.propTypes = Types.ingredient;
export default IngredientDetails;