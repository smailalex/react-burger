import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./ResetPasswordForm.module.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {recoveryDataSelector, userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";
import {ResetPasswordRequest} from "../../services/actions/recoveryProfile";

export function ResetPasswordForm() {
    let {userProfileRequestSuccess, userProfileRequestFiled} = useSelector(userDataSelector)
    let {resetRequestSuccess, resetRequestSuccessFiled} = useSelector(recoveryDataSelector)

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [tokenError, setTokenError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [inputValue, setInputValue] = useState({
        "token": "",
        "password": ""
    });

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);

    useEffect(() => {
        if(resetRequestSuccess) navigate("/login")
    }, [resetRequestSuccess]);

    useEffect(() => {
        if (userProfileRequestSuccess) {
            navigate(location.state?.form?.pathname ? location.state.form.pathname : '/')
        }
        if (userProfileRequestFiled) {
            setIsLoading(false)
        }

    }, [userProfileRequestSuccess, userProfileRequestFiled]);

    function handleResetPasswordRequest() {
        if (inputValue.password.length < 5) return setPasswordError(true);
        if (inputValue.token.length < 1) return setTokenError(true);
        dispatch(ResetPasswordRequest(inputValue))
    }
    function handleChangeInput(e) {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    return (
        isLoading ? <p>loading...</p> :
            <section className={`${style.wr} `}>
                <p className={`text text_type_main-medium ${style.textCenter} pb-6`}>
                    Вход
                </p>

                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    icon={'ShowIcon'}
                    name={'password'}
                    error={passwordError}
                    errorText={'Ошибка ввода пароля, требуется больше 5 символов'}
                    size={'default'}
                    extraClass=" pb-6"
                    value={inputValue.password}
                    onChange={handleChangeInput}

                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    name={'token'}
                    error={tokenError}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="pb-6"
                    value={inputValue.token}
                    onChange={handleChangeInput}

                />

                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={handleResetPasswordRequest}>
                    Сохранить
                </Button>
                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Вспомнили
                    пароль?<Link
                        to="/register">Войти</Link></p>

            </section>
    )
}
