import React, {FC} from 'react';
import Tabs from '../Tabs/Tabs';
import style from './BurgerIngredients.module.css';

const BurgerIngredients:FC = () => {
    return (
    <section className={`mt-10 ${style.section}`}>
      <p className='text text_type_main-large pb-5' >Соберите бургер</p>
      <Tabs />
    </section>
  );
}

export default BurgerIngredients;
