import style from "../components/App/App.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../services/actions/ingredients";
import {ingredientDataSelector} from "../selectors";
import Modal from "../components/Modal/Modal";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import {DELETE_MODAL_DATA} from "../services/actions/ingredientModal";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RootState, Tingredient} from "../utils/interfaces";


interface IError {
    isError: boolean;
    message: string | undefined;
}

export const HomePage = () => {
    const [error, setError] = useState<IError>({isError: false, message: ''});
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // @ts-ignore
    const ingredientDetailsDataSelector = (state:RootState) => state.ingredientModal.modalData;
    const ingredientDetailsData: Tingredient = useSelector(ingredientDetailsDataSelector);
    const {
        ingredientRequest, ingredientRequestSuccess, ingredientRequestFiled, ingredients
    } = useSelector(ingredientDataSelector);
    const [ingredientDetailPageData, setIngredientDetailPageData] = useState<null |  Tingredient>(null)

    const handleModalClose = () => {
        dispatch({type: DELETE_MODAL_DATA})
        if (params.id) {
            navigate('/')
        }
        //setVisibleModal(false)
    }

    useEffect(() => {
        //:TODO не решено
        // @ts-ignore
        dispatch(getIngredients())
    }, [dispatch]);

    useEffect(() => {
        if (!location.state?.isModal && params.id && ingredients.length > 0) {
            setIngredientDetailPageData(ingredients.find((i: { _id: string | undefined; }) => i._id = params.id))
        }
    }, [ingredientRequestSuccess, params, ingredients, location]);

    return (
        <main className={style.main}>
            {ingredientRequestFiled /*error.isError*/ && <p>Возникла ошибка загрузки данных ({error.message})</p>}
            {/*ingredientRequest && !error.isError*/
                !ingredientRequest && !ingredientRequestFiled && ingredientRequestSuccess &&
                <>
                    {ingredientDetailPageData ? <IngredientDetails ingredient={ingredientDetailPageData}/> :
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                            {ingredientDetailsData && <Modal onClose={handleModalClose}>
                                {/* {ingredientRequest && !ingredientRequestFiled && <p>Данные загружаются...</p>}*/}
                                <IngredientDetails ingredient={ingredientDetailsData}/>
                            </Modal>}

                        </DndProvider>}

                </>
            }

        </main>

    )
}