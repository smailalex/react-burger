import React, { useState, useEffect } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import Types from '../../utils/types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails'


const Ingredient = (props) => {
  const [visibleModal, setVisibleModal] = React.useState(false)


  const handleModalClose = () => {
    setVisibleModal(false)
  }

  const hadleAddToCard = (e) => {
    setVisibleModal(true)
  }

  return (
    <>
      <figure className={style.ingredientWr} onClick={hadleAddToCard}>
        {props.count && <Counter count={props.count} size="default" extraClass="m-1" />}
        <img className={`pl-4 pr-4 ${style.image}`} src={props.image} alt={props.name} />
        <div className={`pt-1 pb-1 ${style.priceWr}`}>
          <p className="text text_type_digits-default p-0 ">{props.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`text text_type_main-default ${style.textCenter}`}>{props.name}</p>
      </figure>
      {visibleModal && <Modal  key={props._id} {...props} onClose={handleModalClose} WrappedComponent={IngredientDetails} />}

    </>

  )
}
Ingredient.propTypes = Types.ingredient;
export default Ingredient