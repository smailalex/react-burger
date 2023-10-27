import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./ForgotPasswordForm.module.css";
import {useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {useDispatch, useSelector} from "react-redux";
import {recoveryByMail} from "../../services/actions/recoveryProfile";
import {recoveryDataSelector, userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false);
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    let {message, filed, success} = useSelector(recoveryDataSelector)
    let {userProfileRequestSuccess, userProfileRequestFiled} = useSelector(userDataSelector)

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


    function handleRecoveryByMail() {
        if (!isEmailValid(email)) return setEmailError(true);
        dispatch(recoveryByMail({email}));
    }

    function handleChangeInput(e) {
        setEmail(e.target.value)
    }


    return (
        isLoading ? <p>loading...</p> :
            <section className={`${style.wr} `}>
                <p className={`text text_type_main-medium ${style.textCenter} pb-6`}>
                    Вход
                </p>

                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    name={'login'}
                    error={emailError}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="pb-6"
                    value={email}
                    onChange={handleChangeInput}
                />
                {success && message && <p>{message}</p>}
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20"
                        onClick={handleRecoveryByMail}>
                    Восстановить
                </Button>
                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Вспомнили
                    пароль?<Link
                        to="/register">Войти</Link></p>

            </section>
    )
}
