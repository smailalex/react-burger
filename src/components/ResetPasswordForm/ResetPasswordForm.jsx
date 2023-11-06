import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./ResetPasswordForm.module.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {recoveryDataSelector, userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";
import {ResetPasswordRequest} from "../../services/actions/recoveryProfile";
import {useForm} from "../../hooks/useForm";

export function ResetPasswordForm() {
    const {userProfileRequestSuccess, userProfileRequestFiled} = useSelector(userDataSelector)
    const {resetRequestSuccess, resetRequestSuccessFiled} = useSelector(recoveryDataSelector)

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [tokenError, setTokenError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const {values, handleChange, setValues} = useForm({
        "token": "",
        "password": ""
    });

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);

    useEffect(() => {
        if (resetRequestSuccess) navigate("/login")
    }, [resetRequestSuccess]);

    useEffect(() => {
        if (userProfileRequestSuccess) {
            navigate(location.state?.form?.pathname ? location.state.form.pathname : '/')
        }
        if (userProfileRequestFiled) {
            setIsLoading(false)
        }

    }, [userProfileRequestSuccess, userProfileRequestFiled]);

    function handleResetPasswordRequest(e) {
        e.preventDefault();
        if (values.password.length < 5) return setPasswordError(true);
        if (values.token.length < 1) return setTokenError(true);
        dispatch(ResetPasswordRequest(values))
    }



    return (
        isLoading ? <p>loading...</p> :
            <section className={`${style.wr} `}>
                <p className={`text text_type_main-medium ${style.textCenter} pb-6`}>
                    Вход
                </p>
                <form className={style.wr} onSubmit={handleResetPasswordRequest}>
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        icon={'ShowIcon'}
                        name={'password'}
                        error={passwordError}
                        errorText={'Ошибка ввода пароля, требуется больше 5 символов'}
                        size={'default'}
                        extraClass=" pb-6"
                        value={values.password}
                        onChange={handleChange}

                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите token код из письма'}
                        name={'token'}
                        error={tokenError}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="pb-6"
                        value={values.token}
                        onChange={handleChange}

                    />

                    <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                        Сохранить
                    </Button>
                </form>
                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Вспомнили
                    пароль?<Link
                        to="/register">Войти</Link></p>

            </section>
    )
}
