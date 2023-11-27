import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./LoginForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, LOGIN_REQUEST, makeLogin} from "../../services/actions/user";
import {FormEvent, useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {userDataSelector} from "../../selectors";
import {useForm} from "../../hooks/useForm";

export function LoginForm() {
    const {userProfileRequestFiled, userProfileRequestSuccess} = useSelector(userDataSelector)
    const {values, handleChange, setValues} = useForm({
        "email": "",
        "password": ""
    });

    const dispatch = useDispatch()
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const location = useLocation();
    const navigate = useNavigate();


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



    function handleLogin(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setEmailError(false)
        setPasswordError(false)
        if (!isEmailValid(values.email)) return setEmailError(true);
        if (values.password.length < 5) return setPasswordError(true);
        // @ts-ignore
        dispatch(makeLogin(values))
    }


    return (
        isLoading ? <p>loading...</p> :
            <section className={`${style.wr} `}>
                <p className={`text text_type_main-medium ${style.textCenter}`}>
                    Вход
                </p>
                <form onSubmit={handleLogin} className={style.wr}>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        name={'email'}
                        error={emailError}
                        errorText={'Ошибка ввода email'}
                        size={'default'}
                        extraClass="pt-6 pb-6"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        icon={'ShowIcon'}
                        name={'password'}
                        error={passwordError}
                        errorText={'Ошибка ввода пароля, требуется больше 5 символов'}
                        size={'default'}
                        extraClass="pb-6"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20" >
                        Войти
                    </Button>

                </form>

                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Вы — новый
                    пользователь? <Link to="/register">Зарегистрироваться</Link></p>
                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Забыли
                    пароль? <Link
                        to="/forgot-password">Восстановить пароль</Link></p>

            </section>
    )
}
