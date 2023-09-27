import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Tabs from '../Tabs/Tabs';
import style from './BurgerIngredients.module.css';


function BurgerIngredients(prop) {
  return (
    <section className={`mt-10 ${style.section}`}>
      <p className='text text_type_main-large pb-5' >Соберите бургер</p>
      <Tabs ingredients={prop.ingredients}/>
    </section>
  );
}
BurgerIngredients.propTypes ={
  ingredients: PropTypes.array.isRequired 
}
export default BurgerIngredients;
