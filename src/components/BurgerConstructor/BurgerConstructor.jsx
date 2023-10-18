import React, {useCallback, useEffect, useRef} from 'react';
import style from './BurgerConstructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import OrderDetails from '../OrderDetails/OrderDetails';
import {useDrop, useDrag} from 'react-dnd';

import Modal from '../Modal/Modal';
import {useDispatch, useSelector} from "react-redux";
import {DELETE_INGREDIENT, ADD_INGREDIENT, SET_INGREDIENT_BUN, SET_CART} from "../../services/actions/cart";
import {makeOrder} from "../../services/actions/order";
import {SET_COUNT_INGREDIENT} from "../../services/actions/ingredients";
import {ConstructorElementWrapper} from "../ConstructorElementWrapper/ConstructorElementWrapper";

function BurgerConstructor(prop) {
    const {cart , bun } = useSelector(state => state.cart);
    const firstBun = useSelector(state => state.ingredients.ingredients[0]);
    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = React.useState(false)

    const [orderSum, dispatchOrderSum] = React.useReducer(reduceOrder, {sum: 0});
    const {order, orderRequest, orderRequestFiled} = useSelector(state => state.order)
    //const [orderError, setOrderError] = React.useState({isError: false, message: 'defaul error text'})

    useEffect(() => {
        //console.log(firstBun)
        dispatch({type: SET_INGREDIENT_BUN, payload: firstBun})
        dispatchOrderSum({type: 'count'})
    }, []);

    const [{isHover}, dropTarget] = useDrop({
        accept: ['main', 'sauce', 'bun'],
        collect: monitor => ({
            isHover: monitor.isOver()
        }),

        drop(ingredient) {
            if ((['main', 'sauce'].includes(ingredient.type))) {
                dispatch({type: ADD_INGREDIENT, ingredient})
                dispatch({type: SET_COUNT_INGREDIENT, payload: {_id: ingredient._id, count: isNaN(ingredient.count) ? 1 : ingredient.count+1 }})
            }
            if (ingredient.type === 'bun') {
                dispatch({type: SET_INGREDIENT_BUN, payload: ingredient})
            }
            dispatchOrderSum({type: 'count'})

        }
    });


    function reduceOrder(state, action) {

        if (action.type === 'count') {
            return {sum: cart.reduce((sum, i) => sum + i.price, 0) + bun.price * 2}
        }
        throw Error('ошибка вычисления суммы заказа')
    }

    const handleRemoveIngridien = (ingredient) => {
        //console.log(ingredient)
        dispatch({type: DELETE_INGREDIENT, payload: ingredient.key})
        //dispatch({type: SET_COUNT_INGREDIENT, payload: {_id: ingredient._id, count: null }})
        dispatchOrderSum({type: 'count'})
    }
    const handleOrderMake = () => {
        const orderIngridientsWithoutBun = cart.map(i => i._id)
        const orderPostData = {ingredients: [bun._id, bun._id, ...orderIngridientsWithoutBun]};
        dispatch(makeOrder(orderPostData));
        setVisibleModal(true)
    }

    const moveConstructorIngredient = ((dragIndex, hoverIndex) => {
        if (cart.length > 1) dispatch({type: SET_CART, payload: {dragIndex, hoverIndex}})
    })

    const handleModalClose = () => {
        setVisibleModal(false)
    }
    //TODO: тут если добавить [] deps , то перестает срабатывать сортировка при наведении, так работает но дергается и ConstructorElementWrapper useCallback можно вообще убрать, но в примере он был
    const renderConstructorElementWrapper = useCallback((i, index) => {
        return (
            <ConstructorElementWrapper
                key={i.key}
                index={index}
                item={i}
                handleRemoveIngredien={handleRemoveIngridien}
                moveConstructorIngredient={moveConstructorIngredient} />
        )
    }, )

    return (
        <>
            <section className={style.section}>
                <div className={`${style.listWr} ${isHover && style.onHover}`} ref={dropTarget}>
                    {
                        bun &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + ' (верх)'}
                            price={bun.price}
                            thumbnail={bun.image}
                            key={bun._id + "top"}
                            //handleClose={() => handleRemoveIngridien(bun._id)}

                        />

                    }

                    <div className={`${style.ingridientsWr} ${style.listWr}`}>
                        {cart.map((i, index) => renderConstructorElementWrapper(i, index)
                        )}
                    </div>
                    {
                        bun &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + ' (низ)'}
                            price={bun.price}
                            thumbnail={bun.image}
                            key={bun._id + "bottom"}
                        />

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

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array
}
export default BurgerConstructor;
