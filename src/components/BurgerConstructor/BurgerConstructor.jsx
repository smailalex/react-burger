import React from 'react';
import style from './BurgerConstructor.module.css';
import Pin from '../../images/pin.png'
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: props.ingredients.slice()
    }
  }
  handleCloseIngridiens = (id) => {
    this.setState((state) => {
      let i = state.card.findIndex(e => e._id === id)
      if (i >= 0) {
        state.card.splice(i, 1)
        return { card: state.card }
      }

    });
  }

  render() {

    const bun = this.state.card[0];
    bun.isLocked = true;
    const ingridients = this.state.card.filter(e => e.type !== 'bun')

    return (
      <section className={style.section}>
        <div className={style.listWr} >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
            key={bun._id}
            handleClose={() => this.handleCloseIngridiens(bun._id)}
          />
          <div className={`${style.ingridientsWr} ${style.listWr}`}>
            {ingridients.map((i, index) => (
              <div className={style.itemWr} key={i._id}>
                <img src={Pin} className={style.pin} alt="перетащить" />
                <ConstructorElement
                  type={i.type}
                  isLocked={false}
                  text={i.name}
                  price={i.price}
                  thumbnail={i.image}
                  key={i._id}
                  handleClose={() => this.handleCloseIngridiens(i._id)}
                />
              </div>))}
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
            key={bun._id}
            handleClose={() => this.handleCloseIngridiens(bun._id)}
          />
        </div>
        <div className={`pt-10 pb-20 ${style.actionWr}`}>
          <div className={style.sumWr}>
            <p className="text text_type_digits-medium">
              {this.state.card.reduce((sum, i) => sum + i.price, 0)}
            </p>
            <CurrencyIcon type="primary" />
          </div>

          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired
}
export default BurgerConstructor;
