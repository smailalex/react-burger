import React, {useState, useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Tabs.module.css';
import Ingredient from '../Ingredient/Ingredient';
import {useInView} from 'react-intersection-observer';

import {useSelector} from "react-redux";
import {ingredientDataSelector} from "../../selectors";
import {Tingredient} from "../../utils/interfaces";


const Tabs = () => {

    const {ingredients }  = useSelector(ingredientDataSelector);
    const [current, setCurrent] = React.useState('bun');
    const { ref: refBun, inView: inViewBun } = useInView();
    const { ref: refSauce, inView: inViewSauce } = useInView();
    const { ref: refMain, inView: inViewMain } = useInView();

    useEffect(() => {
        if (inViewBun) {
            setCurrent('bun')
        } else if (inViewSauce) {
            setCurrent('sauce')
        } else if (inViewMain) {
            setCurrent('main')
        }
        //console.log(current)
    }, [inViewBun, inViewSauce, inViewMain]);

    const categoryArr = [
        {name: 'bun', value: 'Булки', inView: refBun},
        {name: 'sauce', value: 'Соусы', inView: refSauce},
        {name: 'main', value: 'Начики', inView: refMain}]
    return (
        <>
            <nav className={style.tabswr}>
                {categoryArr.map((i, index) =>
                    <Tab
                        value={i.name}
                        key={i.name}
                        active={current === i.name}
                        onClick={()=> {}}
                    >
                        {i.value}
                    </Tab>
                )}
            </nav>
            <div className={`pl-4 pr-4 ${style.listWrMain}`}>
                {categoryArr.map((item, index) =>
                    <div  ref={item.inView}  key={item.name} className={style.listWrItems}>
                        <p  className="{`text text_type_main-medium mt-10`}" style={{width: '100%'}}>
                            {item.value}
                        </p>
                        {ingredients.map((ingredient: Tingredient &{count: number, _id: string}) => ingredient.type === item.name ?
                            <Ingredient ingredient={ingredient} key={ingredient._id}/> : null)}
                    </div>
                )}
            </div>

        </>
    )
}

export default Tabs