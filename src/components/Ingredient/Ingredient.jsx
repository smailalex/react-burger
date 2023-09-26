import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import Types from '../../utils/types';

const Ingredient = ({ _id, image, count, price, name }) => {
  const hadleAddToCard = () => {
    //console.log('xxx')
  }
  return (
    <figure className={style.ingredientWr}  onClick={hadleAddToCard}>
      {count && <Counter count={count} size="default" extraClass="m-1" />}
      <img className={`pl-4 pr-4 ${style.image}`} src={image} alt={name} />
      <div className={`pt-1 pb-1 ${style.priceWr}`}>
        <p className="text text_type_digits-default p-0 ">{price}</p>
        <CurrencyIcon />
      </div>
      <p className={`text text_type_main-default ${style.textCenter}`}>{name}</p>
    </figure>
  )
}
Ingredient.propTypes = Types.ingredient;
export default Ingredient