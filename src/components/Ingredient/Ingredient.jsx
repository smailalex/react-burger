import React, { useState, useEffect } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import Types from '../../utils/types';
import {useDrag} from 'react-dnd';
import Modal from '../Modal/Modal';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_MODAL_DATA, SET_MODAL_DATA} from "../../services/actions/ingredientModal";
const Ingredient = ({ ingredient}) => {
  const [, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient
  });

  const ingredientDetailsDataSelector = (state) => state.ingredientModal.modalData;
  const ingredientDetailsData = useSelector(ingredientDetailsDataSelector)
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch({type: DELETE_MODAL_DATA})
    //setVisibleModal(false)
  }
  const handleModalOpen = (ingredient) => {
    dispatch({type: SET_MODAL_DATA, payload: ingredient})
  }

  return (
    <>
      <figure ref={dragRef} className={style.ingredientWr}  onClick={()=>handleModalOpen(ingredient)}>
        {ingredient.count > 0 && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
        <img className={`pl-4 pr-4 ${style.image}`} src={ingredient.image} alt={ingredient.name} />
        <div className={`pt-1 pb-1 ${style.priceWr}`}>
          <p className="text text_type_digits-default p-0 ">{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`text text_type_main-default ${style.textCenter}`}>{ingredient.name}</p>
      </figure>
      {ingredientDetailsData && <Modal onClose={handleModalClose} >
        <IngredientDetails ingredient={ingredientDetailsData} />
      </Modal>}



    </>

  )
}
Ingredient.propTypes = Types.ingredient;
export default Ingredient