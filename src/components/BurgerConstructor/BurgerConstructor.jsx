import React, { useContext } from 'react';
import style from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import OrderDetails from '../OrderDetails/OrderDetails';

import Modal from '../Modal/Modal'

function BurgerConstructor(prop) {
  const [card, setCard] = React.useState(prop.ingredients.filter(e => e.type !== 'bun').slice())
  const [visibleModal, setVisibleModal] = React.useState(false)
  const [bun, setBun] = React.useState(prop.ingredients.slice()[0]);
  const [orderSum, dispatchOrderSum] = React.useReducer(reduceOrder, {sum: 0});
  const [order, setOrder] = React.useState(0);
  const [orderError, setOrderError] = React.useState({ isError: false, message: 'defaul error text' })

  function reduceOrder(state, action) {

    if (action.type === 'count') {
      return {sum: card.reduce((sum, i) => sum + i.price, 0) + bun.price * 2}
    }
    throw Error('ошибка вычисления суммы заказа')
  }
  React.useEffect(() => {
    console.log('BurgerConstructor rend')    
    dispatchOrderSum({type : 'count'})
  },[])


  const handleRemoveIngridien = (id) => {
    const updateCard = card.filter(i => i._id !== id);
    //console.log(card.length, updateCard.length)
    setCard(updateCard)
    dispatchOrderSum({type : 'count'})
  }
  const handleOrderMake = () => {
    const MAKE_ORDER_API = 'https://norma.nomoreparties.space/api/orders';
    const orderIngridientsWithoutBun = card.map(i => i._id)
    const orderPostData = { ingredients: [bun._id, bun._id, ...orderIngridientsWithoutBun] };

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
        setOrderError({ isError: true, message: e })
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
        <div className={style.listWr} >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
            key={bun._id + "top"}
          //handleClose={() => handleRemoveIngridien(bun._id)}

          />
          <div className={`${style.ingridientsWr} ${style.listWr}`}>
            {card.map((i, index) => (
              <div className={style.itemWr} key={i._id}>
                <span className={style.drugIcon}><DragIcon type="primary" /></span>
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
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
            key={bun._id + "bottom"}
          //handleClose={() => handleRemoveIngridien(bun._id)}
          />
        </div>
        <div className={`pt-10 pb-20 ${style.actionWr}`}>
          <div className={style.sumWr}>
            <p className="text text_type_digits-medium" >
              {orderSum.sum}
            </p>
            <CurrencyIcon type="primary" />
          </div>

          <Button htmlType="button" type="primary" size="large" onClick={handleOrderMake}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {visibleModal &&
        <Modal onClose={handleModalClose}>
          <OrderDetails order={order} orderError={orderError} />
        </Modal>
      }
    </>
  )

}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired
}
export default BurgerConstructor;
