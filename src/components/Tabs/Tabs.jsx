import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Tabs.module.css';
import Ingredient from '../Ingredient/Ingredient';


import IngredientDetails from '../IngredientDetails/IngredientDetails'
import {useSelector} from "react-redux";


const Tabs = () => {

    const {ingredients} = useSelector(state => state.ingredients);

    const [current, setCurrent] = React.useState('bun');

    const categoryArr = [
        {name: 'bun', value: 'Булки'},
        {name: 'sauce', value: 'Соусы'},
        {name: 'main', value: 'Начики'}]
    return (
        <>
            <nav className={style.tabswr}>
                {categoryArr.map((i, index) =>
                    <Tab value={i.name} key={index} active={current === i.name}>
                        {i.value}
                    </Tab>
                )}
            </nav>

            <div className={`pl-4 pr-4 ${style.listWr}`}>
                {categoryArr.map((item, index) =>
                        <>
                            <p className="{`text text_type_main-medium mt-10`}" style={{ width: '100%' }}  >
                                {item.value}
                            </p>
                            {ingredients.map((ingredient) => ingredient.type === item.name ? <Ingredient ingredient={ingredient} key={ingredient._id}/> : null)}
                        </>

                )}

            </div>

        </>
    )
}
Tabs.propTypes = {
    ingredients: PropTypes.array
}
export default Tabs