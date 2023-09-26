import React from 'react';
//import logo from './logo.svg';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import ingredients from '../../utils/data';
function App() {
  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
      
        
     
    </div>
  );
}

export default App;
