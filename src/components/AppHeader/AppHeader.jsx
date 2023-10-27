import React from 'react';
//import logo from './logo.svg';
import style from './AppHeader.module.css';
import {Link} from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (        
            <header className={`${style.header} pt-4 pb-4 text`} >
                <nav className={style.headerWrapper}>
                    <div className={` ${style.menu}` }  >
                        <Link to="/" className={` p-5 ${style.menuItem}`} ><BurgerIcon type="primary"  />Конструктор</Link>
                        <a href="" className={` p-5 ${style.menuItem}`} ><ListIcon type="primary"  />Лента заказов</a>
                    </div>
                    <Link to="/"><Logo /></Link>
                    <Link to="/profile" className={`ml-25 p-5 ${style.menuItem}`} ><ProfileIcon type="primary" />Личный кабинет</Link>
                </nav>
            </header>        
    );
}
export default AppHeader;
