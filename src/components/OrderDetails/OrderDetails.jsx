import React from "react";
import style from "./OrderDetails.module.css";
import doneIco from "../../images/done.png"
import Types from '../../utils/types';


function OrderDetails({ order, orderError }) {
    //console.log(order, orderError )
    return (
        <div className={style.wr}>
            {!orderError.isError &&
                <>
                    <p className={`text text_type_digits-large pb-8 ${style.title}`}>{order.number}</p>
                    <p className={`text text_type_main-medium pb-2`}>идентификатор заказа</p>
                    {<img className={style.doneImg} src={doneIco} alt="Ваш заказ начали готовить" />}
                    <p className={`text text_type_main-default pb-2 `}>Ваш заказ начали готовить</p>
                    <p className={`text text_type_main-small ${style.darkcolor}`}>Дождитесь готовности на орбитальной станции</p>
                </>
            }
            {orderError.isError && <p>Ошибка оформления заказа ({orderError.message})</p>}
        </div>

    )
}

OrderDetails.propTypes = Types.order;
export default OrderDetails;