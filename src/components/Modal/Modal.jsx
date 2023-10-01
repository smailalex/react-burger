import React, { Children, useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import Types from '../../utils/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById("react-modals");

function Modal(props) {
    useEffect(() => {
        //console.log(props)
        const onKeyboard = (e) => {
            e.key === "Escape" && props.onClose()
        }

        window.addEventListener('keydown', onKeyboard)
        return () => {
            window.removeEventListener('keydown', onKeyboard)
        }
    }, [])
 

    return ReactDOM.createPortal((
        <div className={style.modal} onClick={props.onClose}>
            <div className={style.content} onClick={(e) => e.stopPropagation()}>
                <div className={style.close} onClick={props.onClose}><CloseIcon type="primary" /></div>
                {props.children}
            </div>
        </div>
    ), modalRoot);
}
Modal.propTypes = Types.modal;
export default Modal;