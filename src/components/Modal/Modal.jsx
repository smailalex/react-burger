import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import Types from '../../utils/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById("react-modals");

function Modal(props) {
    
    

    const onKeyboard = (e) => {
        e.key === "Escape" && props.onClose()
    }
    useEffect(() => {
        //console.log(props)
        window.addEventListener('keydown', onKeyboard)
        return () => {
            window.removeEventListener('keydown', onKeyboard)
        }
    }, [])

    return ReactDOM.createPortal((
        <div className={style.modal} onClick={props.onClose}>
            <div className={style.content}>
                <div className={style.close} onClick={props.onClose}><CloseIcon type="primary" /></div>
                <props.WrappedComponent  {...props}  />
            </div>
        </div>
    ), modalRoot);
}
Modal.propTypes = Types.modal;
export default Modal;