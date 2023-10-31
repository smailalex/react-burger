import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./ForgotPasswordForm.module.css";
import {useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {useDispatch, useSelector} from "react-redux";
import {recoveryByMail} from "../../services/actions/recoveryProfile";
import {recoveryDataSelector, userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";
import {useForm} from "../../hooks/useForm";

export function ForgotPasswordForm() {
    const {values, handleChange, setValues} = useForm({
        "email": "",
    });
    const [emailError, setEmailError] = useState(false);
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const {message, filed, success} = useSelector(recoveryDataSelector)
    const {userProfileRequestSuccess, userProfileRequestFiled} = useSelector(userDataSelector)

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);

    useEffect(() => {
        if (userProfileRequestSuccess) {
            navigate(location.state?.form?.pathname ? location.state.form.pathname : '/')
        }
        if (userProfileRequestFiled) {
            setIsLoading(false)
        }

    }, [userProfileRequestSuccess, userProfileRequestFiled]);

    useEffect(() => {
        if (success) navigate("/reset-password", {state: {form: location}})
    }, [success])


    function handleRecoveryByMail(e) {
        e.preventDefault();
        if (!isEmailValid(values.email)) return setEmailError(true);
        dispatch(recoveryByMail(values));
    }



    return (
        isLoading ? <p>loading...</p> :
            <section className={`${style.wr} `}>
                <p className={`text text_type_main-medium ${style.textCenter} pb-6`}>
                    Вход
                </p>
                <form className={style.wr} onSubmit={handleRecoveryByMail}>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        name={'email'}
                        error={emailError}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="pb-6"
                        value={values.email}
                        onChange={handleChange}
                    />

                    {success && message && <p>{message}</p>}
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                        Восстановить
                    </Button>
                </form>
                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Вспомнили
                    пароль?<Link
                        to="/register">Войти</Link></p>

            </section>
    )
}
