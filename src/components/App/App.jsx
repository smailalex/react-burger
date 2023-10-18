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

  //const [isDataLoaded, setIsDataLoaded] = React.useState(false)
 // const [isLoading, setIsLoading] = React.useState(true)
  //const [ingredientData, setIngredientData] = React.useState({})
  const [error, setError] = React.useState({ isError: false, message: '' })
  const dispatch = useDispatch();
  const ingredientSelector = (state) => state.ingredients;
  const {ingredientRequest, ingredientRequestFiled} = useSelector(ingredientSelector);
    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);

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
