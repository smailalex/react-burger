import React, {FC, useCallback, useEffect} from 'react';
import style from './BurgerConstructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import {useDrop} from 'react-dnd';

import Modal from '../Modal/Modal';
import {useDispatch, useSelector} from "react-redux";
import {DELETE_INGREDIENT, ADD_INGREDIENT, SET_INGREDIENT_BUN, SET_CART, ERASE_CART} from "../../services/actions/cart";
import {makeOrder} from "../../services/actions/order";
import emptyImage from '../../images/empty_img.png'

import {
    ADD_COUNT_INGREDIENT,
    DELETE_ALL_COUNTS_INGREDIENTS,
    DELETE_COUNT_INGREDIENT, SET_COUNT_BUN
} from "../../services/actions/ingredients";
import {ConstructorElementWrapper} from "../ConstructorElementWrapper/ConstructorElementWrapper";
import {v4 as uuidv4} from "uuid";
import {userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";
import {useNavigate} from "react-router-dom";
import {CartState, OrderState, RootState, Tingredient} from "../../utils/interfaces";




function BurgerConstructor() {
    const {cart, bun} = useSelector<RootState, CartState>(state => state.cart);
    // @ts-ignore
    const firstBun = useSelector(state => state.ingredients.ingredients[0]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visibleModal, setVisibleModal] = React.useState(false)

    const [orderSum, dispatchOrderSum] = React.useReducer(reduceOrder, {sum: 0});

    const {order, orderRequest, orderRequestFiled} = useSelector<RootState, OrderState>(state => state.order)
    //const [orderError, setOrderError] = React.useState({isError: false, message: 'defaul error text'})

    const {userProfileRequestFiled} = useSelector(userDataSelector)
    useEffect(() => {
        // @ts-ignore
        dispatch(getUserProfile())
    }, [dispatch]);


    useEffect(() => {
        //dispatch({type: SET_INGREDIENT_BUN, payload: firstBun})
        dispatchOrderSum({type: 'count'})
    }, []);

    //TODO: не понимаю как это исправить
    // @ts-ignore
    const [{isHover}, dropTarget] = useDrop({
        accept: ['main', 'sauce', 'bun'],
        collect: monitor => ({
            isHover: monitor.isOver()
        }),


        //TODO: не понимаю как это исправить
        // @ts-ignore
        drop(ingredient: Tingredient) {
            if ((['main', 'sauce'].includes(ingredient.type))) {
                dispatch({type: ADD_INGREDIENT, payload: {...ingredient, key: uuidv4()}})
                dispatch({type: ADD_COUNT_INGREDIENT, payload: {_id: ingredient._id}})
            }
            if (ingredient.type === 'bun') {
                dispatch({type: SET_INGREDIENT_BUN, payload: {...ingredient, key: uuidv4()}})
                dispatch({type: SET_COUNT_BUN, payload: {_id: ingredient._id}})

            }
            dispatchOrderSum({type: 'count'})

        }
    });


    function reduceOrder(state : {sum: number}, action: {type: 'count'}) {

        if (action.type === 'count') {
            return {sum: cart.reduce((sum: number, i : {price: number}) => sum + i.price, 0) + bun.price * 2}
        }
        throw Error('ошибка вычисления суммы заказа')
    }

    const handleRemoveIngridien = (ingredient: Tingredient ) => {
        //console.log(ingredient._id)
        dispatch({type: DELETE_COUNT_INGREDIENT, payload: {_id: ingredient._id}})
        dispatch({type: DELETE_INGREDIENT, payload: ingredient.key})

        dispatchOrderSum({type: 'count'})
    }
    const handleOrderMake = () => {

        if (userProfileRequestFiled) {
            navigate('/login');
            return;
        }


        if (cart.length < 1 && bun.empty) return;
        const orderIngridientsWithoutBun = cart.map((i) => i._id)
        const orderPostData = {ingredients: [bun._id, bun._id, ...orderIngridientsWithoutBun]};
        // @ts-ignore
        dispatch(makeOrder(orderPostData));
        setVisibleModal(true)
        dispatch({type: ERASE_CART})
        dispatch({type: SET_INGREDIENT_BUN, payload: firstBun})
        dispatch({type: DELETE_ALL_COUNTS_INGREDIENTS})
        dispatchOrderSum({type: 'count'})

    }

    const moveConstructorIngredient = ((dragIndex:number, hoverIndex:number) => {
        if (cart.length > 1) dispatch({type: SET_CART, payload: {dragIndex, hoverIndex}})
    })

    const handleModalClose = () => {
        setVisibleModal(false)
    }

    const renderConstructorElementWrapper = useCallback((i:Tingredient, index:number) => {

        return (
            <ConstructorElementWrapper
                key={i.key}
                index={index}
                item={i}
                handleRemoveIngredien={handleRemoveIngridien}
                moveConstructorIngredient={moveConstructorIngredient}/>
        )
    }, [])

    return (
        <>
            <section className={style.section}>
                <div className={`${style.listWr} ${isHover && style.onHover}`} ref={dropTarget}>
                    {
                        !bun.empty ?
                        (<ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + ' (верх)'}
                            price={bun.price}
                            thumbnail={bun.image}
                            key={bun._id + "top"}
                            //handleClose={() => handleRemoveIngridien(bun._id)}

                        />)
                        : (<ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bun.text}
                                price={bun.price}
                                thumbnail={emptyImage}
                            />)
                    }

                    <div className={`${style.ingridientsWr} ${style.listWr}`}>
                        {cart.length > 0 ?
                            cart.map((i, index:number) => renderConstructorElementWrapper(i, index))
                            :
                            <ConstructorElement
                                isLocked={true}
                                text={'добавьте ингредиенты'}
                                price={bun.price}
                                thumbnail={emptyImage}
                            />
                        }
                    </div>
                    {

                        !bun.empty ?
                            (<ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bun.name + ' (низ)'}
                                price={bun.price}
                                thumbnail={bun.image}
                                key={bun._id + "bottom"}
                            />)
                            : (<ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bun.text}
                                price={bun.price}
                                thumbnail={emptyImage}
                            />)

                    }
                </div>
                <div className={`pt-10 pb-20 ${style.actionWr}`}>
                    <div className={style.sumWr}>
                        <p className="text text_type_digits-medium">
                            {orderSum.sum}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>

                    <Button htmlType="button" type="primary" size="large" onClick={handleOrderMake}>
                        Оформить заказ
                    </Button>
                </div>
            </section>

            {visibleModal && !orderRequest &&
                <Modal onClose={handleModalClose}>
                    <OrderDetails order={order}
                                  orderError={{isError: (!!orderRequestFiled), message: 'ошибка заказа'}}/>
                </Modal>
            }
        </>
    )

}


export default BurgerConstructor;
