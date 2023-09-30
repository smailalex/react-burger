import React from 'react';
//import logo from './logo.svg';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const API = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [isLoadingData, setIsLoadingData] = React.useState(false)
  const [data, setData] = React.useState({})
  const [error, setError] = React.useState({isError: false, message: ''})

  React.useEffect(() => {
    const data = {}
    
      fetch(API)
      .then((response) => response.json())      
      .then(json =>  {
        json.success && setData(json.data) 
      })
      .catch ((error) => {        
        setError({isError: true, message: error.message})
        setIsLoadingData(false)
        console.error(error.message)
      })
      .finally(() => setIsLoadingData(true)) 
    
  },[])

  return (
    <div className={style.App}>      
      <AppHeader />
      <main className={style.main}>
        {!isLoadingData && <p>Данные загружаются...</p>}
        {error.isError && <p>Возникла ошибка загрузки данных {/* error.message */}</p>}
        {isLoadingData && !error.isError &&  <BurgerIngredients ingredients={data} />}
        {isLoadingData && !error.isError && <BurgerConstructor ingredients={data} />}         
      </main>
    </div>
  );
}

export default App;
