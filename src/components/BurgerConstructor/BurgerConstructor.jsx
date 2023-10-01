import React from 'react';
import style from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import OrderDetails from '../OrderDetails/OrderDetails';

import Modal from '../Modal/Modal'


function BurgerConstructor(props) {

  const [card, setCard] = React.useState(props.ingredients.filter(e => e.type !== 'bun').slice())
  const [visibleModal, setVisibleModal] = React.useState(false)
  const [bun, setBun] = React.useState(props.ingredients.slice()[0]);
  const [orderSum, setOrderSum] = React.useState(0)
  const [orderId, setOrderId] = React.useState(0)

  React.useEffect(() => {
    //console.log('BurgerConstructor rend')
    setOrderSum(card.reduce((sum, i) => sum + i.price, 0))
    
  })

  const handleCloseIngridiens = (id) => {
    const updateCard = card.filter(i => i._id !== id);
    //console.log(card.length, updateCard.length)
    setCard(updateCard)
  }
  const handleModalShow = () => {
    setOrderId(Math.floor(Math.random() * 10000))
    setVisibleModal(true)
    
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
          //handleClose={() => handleCloseIngridiens(bun._id)}

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
                  handleClose={() => handleCloseIngridiens(i._id)}
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
          //handleClose={() => handleCloseIngridiens(bun._id)}
          />
        </div>
        <div className={`pt-10 pb-20 ${style.actionWr}`}>
          <div className={style.sumWr}>
            <p className="text text_type_digits-medium" >
              {orderSum}
            </p>
            <CurrencyIcon type="primary" />
          </div>

          <Button htmlType="button" type="primary" size="large" onClick={handleModalShow}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {visibleModal && 
      <Modal  onClose={handleModalClose}>
        <OrderDetails orderId={orderId}/>
      </Modal>
      }
    </>
  )

}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired
}
export default BurgerConstructor;
