import React from "react";
import style from "./OrderDetails.module.css";
import doneIco from "../../images/done.png"
import Types from '../../utils/types';


function OrderDetails({orderId}){
    
    return (
        <div className={style.wr}>
            <p className={`text text_type_digits-large pb-8 ${style.title}`}>{orderId}</p>
            <p className={`text text_type_main-medium pb-2`}>идентификатор заказа</p>
            {<img className={style.doneImg} src={doneIco} alt="Ваш заказ начали готовить" />}
            <p className={`text text_type_main-default pb-2 `}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-small ${style.darkcolor}`}>Дождитесь готовности на орбитальной станции</p>
        </div>

    )
}

OrderDetails.propTypes = Types.order;
export default OrderDetails;