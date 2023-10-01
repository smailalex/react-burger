import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Tabs.module.css';
import Ingredient from '../Ingredient/Ingredient';
import Modal from '../Modal/Modal';

import IngredientDetails from '../IngredientDetails/IngredientDetails'

const Tabs = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('bun');

  const [visibleModal, setVisibleModal] = React.useState(false)
  const [ingredientDetailsData, setIngredientDetailsData] = React.useState(false)

  const handleModalClose = () => {
    setVisibleModal(false)
  }

  
  const handleModalOpen = (clickedIngridient) => {
   setIngredientDetailsData(clickedIngridient)
   setVisibleModal(true)
  }



  let ing = ingredients.filter((i) => i.type === current);
  useEffect(() => {
    //ing = ingredients.filter((i) => i.type === current);
    //console.log('tabs rend')
  },[]);
  return (
    <>
      <nav className={style.tabswr}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <p className="text text_type_main-medium mt-10">
        {current === 'bun' && "Булки"}
        {current === 'sauce' && "Соусы"}
        {current === 'main' && "Начики"}
      </p>
      <div className={`pl-4 pr-4 ${style.listWr}`}>
        {ing && ing.map((ingredient) => <Ingredient onOpen={handleModalOpen} ingredient={ingredient} key={ingredient._id} />)}
      </div>
      {visibleModal && <Modal onClose={handleModalClose} >
        <IngredientDetails ingredient={ingredientDetailsData} />
      </Modal>}

    </>
  )
}
Tabs.propTypes = {
  ingredients: PropTypes.array.isRequired
}
export default Tabs