import React, {useContext, useEffect} from 'react';
import style from './BurgerConstructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import OrderDetails from '../OrderDetails/OrderDetails';
import {useDrop} from 'react-dnd';

import Modal from '../Modal/Modal';
import {useDispatch, useSelector} from "react-redux";
import {DELETE_INGREDIENT, ADD_INGREDIENT, SET_INGREDIENT_BUN} from "../../services/actions/cart";

function BurgerConstructor(prop) {
    //const [cart, setCart] = React.useState(prop.ingredients.filter(e => e.type !== 'bun').slice())
    const cart = useSelector(state => state.cartReducer.cart);
    let bun = useSelector(state => state.ingredientsReducer.ingredients[0]);
    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = React.useState(false)

    const [orderSum, dispatchOrderSum] = React.useReducer(reduceOrder, {sum: 0});
    const [order, setOrder] = React.useState(0);
    const [orderError, setOrderError] = React.useState({isError: false, message: 'defaul error text'})
    const [, dropTargetBun] = useDrop({
        accept: ['bun'],

        drop(ingredient) {
            dispatch({type: SET_INGREDIENT_BUN, ingredient})
        }
    });

    //TODO: разобраться почему не добавялется в state
    /*useEffect(() => {
        dispatch({type: SET_INGREDIENT_BUN, bun})
    }, []);*/

    const [{isHover}, dropTarget] = useDrop({
        accept: ['main', 'sauce'],
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(ingredient) {
            dispatch({type: ADD_INGREDIENT, ingredient})
            dispatchOrderSum({type: 'count'})
        }
    });


    useEffect(() => {
        dispatchOrderSum({type: 'count'})
    }, []);

    function reduceOrder(state, action) {

        if (action.type === 'count') {
            return {sum: cart.reduce((sum, i) => sum + i.price, 0) + bun.price * 2}
        }
        throw Error('ошибка вычисления суммы заказа')
    }



    const handleRemoveIngridien = (id) => {

        dispatch({type: DELETE_INGREDIENT, id})

        dispatchOrderSum({type: 'count'})
    }
    const handleOrderMake = () => {
        const MAKE_ORDER_API = 'https://norma.nomoreparties.space/api/orders';
        const orderIngridientsWithoutBun = cart.map(i => i._id)
        const orderPostData = {ingredients: [bun._id, bun._id, ...orderIngridientsWithoutBun]};

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer your_access_token'
            },
            body: JSON.stringify(orderPostData)
        };

        fetch(MAKE_ORDER_API, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                    //console.log('response.ok')
                }
                return Promise.reject(`Ошибка ${response.status}`)
            })
            .then(json => {
                json.success && setOrder(json.order);
                //console.log('json.success', json.order)
            })
            .catch((e) => {
                //console.log('setOrderError', e)
                setOrderError({isError: true, message: e})
            })
            .finally(() => {
                setVisibleModal(true);
            })

    }
    const handleModalClose = () => {
        setVisibleModal(false)
    }


    return (
        <>

            <section className={style.section}>
                <div className={style.listWr}>
                    {
                        //TODO: без проверки доступности bun приложение падает, не пойму как правильно инициализировать или оставить так
                        bun ? (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bun.name + ' (верх)'}
                                price={bun.price}
                                thumbnail={bun.image}
                                key={bun._id + "top"}
                                //handleClose={() => handleRemoveIngridien(bun._id)}

                            />
                        ) : null
                    }

                    <div ref={dropTarget}
                         className={`${style.ingridientsWr} ${style.listWr} ${isHover && style.onHover}`}>
                        {cart.map((i, index) => (
                            <div className={style.itemWr} key={i._id}>
                                <span className={style.drugIcon}><DragIcon type="primary"/></span>
                                <ConstructorElement
                                    type={i.type}
                                    isLocked={false}
                                    text={i.name}
                                    price={i.price}
                                    thumbnail={i.image}
                                    key={i._id}
                                    handleClose={() => handleRemoveIngridien(i._id)}
                                />
                            </div>))}
                    </div>
                    {
                        bun ? (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bun.name + ' (низ)'}
                                price={bun.price}
                                thumbnail={bun.image}
                                key={bun._id + "bottom"}
                            />
                        ) : null
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

            {visibleModal &&
                <Modal onClose={handleModalClose}>
                    <OrderDetails order={order} orderError={orderError}/>
                </Modal>
            }
        </>
    )

}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array
}
export default BurgerConstructor;
