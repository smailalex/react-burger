import React, { useState, useEffect, useContext } from 'react';
//import PropTypes from 'prop-types';

import Tabs from '../Tabs/Tabs';
import style from './BurgerIngredients.module.css';
import { IngredientContext } from '../../services/IngredientsContext';


function BurgerIngredients() {
  const ingredients = useContext(IngredientContext);
  return (
    <section className={`mt-10 ${style.section}`}>
      <p className='text text_type_main-large pb-5' >Соберите бургер</p>
      <Tabs ingredients={ingredients}/>
    </section>
  );
}

export default BurgerIngredients;
