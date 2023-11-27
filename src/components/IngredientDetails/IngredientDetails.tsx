import React, {FC} from "react";
import style from "./IngredientDetails.module.css";
import {Tingredient} from "../../utils/interfaces";



const IngredientDetails: FC<{ingredient: Tingredient }> = ({ingredient}) => {
    return (
        <div className={style.wr}>
            <p className="text text_type_main-large pb-8">Детали ингредиента</p>
            <img className={style.doneImg} src={ingredient.image_large} alt={ingredient.name}/>
            <p className="text text_type_main-medium pb-8">{ingredient.name}</p>
            <div className={style.nutritionsWr}>
                <div className={style.nutritionWr}>
                    <div>Калории,ккал</div><div>{ingredient.calories}</div>
                </div>
                <div className={style.nutritionWr}>
                    <div>Белки, г</div><div>{ingredient.proteins}</div>
                </div>
                <div className={style.nutritionWr}>
                    <div>Жиры, г</div><div>{ingredient.fat}</div>
                </div>
                <div className={style.nutritionWr}>
                    <div>Углеводы, г</div><div>{ingredient.carbohydrates}</div>
                </div>
            </div>
        </div>

    )
}
export default IngredientDetails;