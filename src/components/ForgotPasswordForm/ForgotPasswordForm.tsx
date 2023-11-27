import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./ForgotPasswordForm.module.css";
import {FormEvent, SyntheticEvent, useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {useDispatch, useSelector} from "react-redux";
import {recoveryByMail} from "../../services/actions/recoveryProfile";
import {recoveryDataSelector, userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";
import {useForm} from "../../hooks/useForm";
import {IFormValues} from "../../utils/interfaces";

export const ForgotPasswordForm = () => {
    const {values, handleChange, setValues} = useForm({
        "email": "",
    });
    const [emailError, setEmailError] = useState<boolean>(false);
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {message, success} = useSelector(recoveryDataSelector)
    const {userProfileRequestSuccess, userProfileRequestFiled} = useSelector(userDataSelector)

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        // @ts-ignore
        dispatch(getUserProfile())
    }, [dispatch]);

    useEffect(() => {
        if (userProfileRequestSuccess) {
            navigate(location.state?.from?.pathname ? location.state.from.pathname : '/')
        }
        if (userProfileRequestFiled) {
            setIsLoading(false)
        }

    }, [userProfileRequestSuccess, userProfileRequestFiled]);

    useEffect(() => {
        if (success) navigate("/reset-password", {state: {from: location}})
    }, [success])


    function handleRecoveryByMail(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isEmailValid(values.email)) return setEmailError(true);
        // @ts-ignore
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
