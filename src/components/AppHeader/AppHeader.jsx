import React from 'react';
//import logo from './logo.svg';
import style from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (        
            <header className={`${style.header} pt-4 pb-4 text`} >
                <nav className={style.headerWrapper}>
                    <div className={` ${style.menu}` }  >
                        <a href="" className={` p-5 ${style.menuItem}`} ><BurgerIcon type="primary"  />Конструктор</a>
                        <a href="" className={` p-5 ${style.menuItem}`} ><ListIcon type="primary"  />Лента заказов</a>
                    </div>
                    <Logo />
                    <a href="" className={`ml-25 p-5 ${style.menuItem}`} ><ProfileIcon type="primary" />Личный кабинет</a>
                </nav>
            </header>        
    );
}

export default AppHeader;
