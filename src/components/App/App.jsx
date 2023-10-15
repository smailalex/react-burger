import React, {useEffect} from 'react';
//import logo from './logo.svg';
import { IngredientContext } from '../../services/IngredientsContext';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {useDispatch, useSelector} from "react-redux";
import {GET_INGREDIENTS_REQUEST_FILED, getIngredients} from "../../services/actions/ingredients";
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';
const API = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [isDataLoaded, setIsDataLoaded] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  //const [ingredientData, setIngredientData] = React.useState({})
  const [error, setError] = React.useState({ isError: false, message: '' })
  const dispatch = useDispatch();
  const {ingredients, ingredientRequest, ingredientRequestFiled} = useSelector(state => state.ingredientsReducer);
    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);

  /*React.useEffect(() => {
    const ingredientData = {}

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(`Ошибка ${response.status}`)
      })
      .then(json => {
        json.success && setIngredientData(json.data);
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

  }, [])*/

  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        {ingredientRequest && !ingredientRequestFiled && <p>Данные загружаются...</p>}
        {ingredientRequestFiled /*error.isError*/ && <p>Возникла ошибка загрузки данных ({error.message})</p>}
        {/*ingredientRequest && !error.isError*/
            !ingredientRequest && !ingredientRequestFiled &&
            <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
            </>
        }

      </main>
    </div>
  );
}

export default App;
