import React, {Children, FormEvent, ReactElement, ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
    onClose: () => void;
    children: ReactNode
}
function Modal(props: IModal) {
    useEffect(() => {
        //console.log(props)
        const onKeyboard = (e: KeyboardEvent) => {
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
                <div className={style.close} onClick={props.onClose}><CloseIcon type="primary"/></div>
                {props.children}
            </div>
        </div>
    ), modalRoot);
}

export default Modal;