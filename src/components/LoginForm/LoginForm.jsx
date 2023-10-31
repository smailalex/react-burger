import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./LoginForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, LOGIN_REQUEST, makeLogin} from "../../services/actions/user";
import {useEffect, useRef, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {userDataSelector} from "../../selectors";

export function LoginForm() {
    const {userProfileRequestFiled, userProfileRequestSuccess} = useSelector(userDataSelector)

    const dispatch = useDispatch()
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        "email": "",
        "password": ""
    });
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

    function handleLogin(e) {
        e.preventDefault();
        setEmailError(false)
        setPasswordError(false)
        if (!isEmailValid(inputValue.email)) return setEmailError(true);
        if (inputValue.password.length < 5) return setPasswordError(true);
        dispatch(makeLogin(inputValue))
    }

    function handleChangeInput(e) {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
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
                        value={inputValue.email}
                        onChange={handleChangeInput}
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
                        value={inputValue.password}
                        onChange={handleChangeInput}
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
