import React from 'react';
//import logo from './logo.svg';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const API = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [isDataLoaded, setIsDataLoaded] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState({})
  const [error, setError] = React.useState({ isError: false, message: '' })

  React.useEffect(() => {
    const data = {}

    fetch(API)
      .then((response) => {
        if (response.ok) {
         return response.json()
        }
        return Promise.reject(`Ошибка ${response.status}`)
      })
      .then(json => {
        json.success && setData(json.data);
        setIsDataLoaded(true)        
      })
      .catch((error) => {
        setError({ isError: true, message: error })
        setIsDataLoaded(false)
        //console.error(error)
      })
      .finally(() => {        
        setIsLoading(false)
      })

  }, [])

  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        {isLoading && <p>Данные загружаются...</p>}
        {error.isError && <p>Возникла ошибка загрузки данных ({error.message })</p>}
        {isDataLoaded && !error.isError && <BurgerIngredients ingredients={data} />}
        {isDataLoaded && !error.isError && <BurgerConstructor ingredients={data} />}
      </main>
    </div>
  );
}

export default App;
