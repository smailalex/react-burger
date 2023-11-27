import React, {FC} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import {useDrag} from 'react-dnd';
import {useLocation, useNavigate } from "react-router-dom";
import {Tingredient} from "../../utils/interfaces";



const Ingredient: FC<{ingredient: Tingredient & {count: number, _id: string} }> = ({ ingredient}) => {
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(ingredient, ingredient)
  const [, dragRef] = useDrag({
    // @ts-ignore
    type: ingredient.type,
    item: ingredient
  });

  const handleModalOpen = (ingredient: Partial<Tingredient> & { count: number; _id: string; }) => {
    //console.log(location.state)
    navigate('ingredients/'+ingredient._id, {state: {form: location.pathname, ingredient, isModal: true}})

    //dispatch({type: SET_MODAL_DATA, payload: ingredient})
  }

  return (
    <>
      <figure ref={dragRef} className={style.ingredientWr}  onClick={()=>handleModalOpen(ingredient)}>
        {ingredient.count > 0 && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
        <img className={`pl-4 pr-4 ${style.image}`} src={ingredient.image} alt={ingredient.name} />
        <div className={`pt-1 pb-1 ${style.priceWr}`}>
          <p className="text text_type_digits-default p-0 ">{ingredient.price}</p>
          <CurrencyIcon type={'secondary'}  />
        </div>
        <p className={`text text_type_main-default ${style.textCenter}`}>{ingredient.name}</p>
      </figure>




    </>

  )
}
export default Ingredient