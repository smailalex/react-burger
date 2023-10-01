import React, { useState, useEffect } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import Types from '../../utils/types';


const Ingredient = ({ ingredient, onOpen }) => {
  const [count, setCount] = React.useState(0)
  
  return (
    <>
      <figure className={style.ingredientWr}  onClick={() => onOpen(ingredient)}>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        <img className={`pl-4 pr-4 ${style.image}`} src={ingredient.image} alt={ingredient.name} />
        <div className={`pt-1 pb-1 ${style.priceWr}`}>
          <p className="text text_type_digits-default p-0 ">{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`text text_type_main-default ${style.textCenter}`}>{ingredient.name}</p>
      </figure>
      

    </>

  )
}
Ingredient.propTypes = Types.ingredient;
export default Ingredient