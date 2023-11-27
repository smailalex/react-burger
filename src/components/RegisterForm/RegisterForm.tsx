import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./RegisterForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {getUserProfile, makeProfileUpdate, makeRegisterUser} from "../../services/actions/user";
import {userDataSelector} from "../../selectors";
import {useForm} from "../../hooks/useForm";

export function RegisterForm() {
    const dispatch = useDispatch()
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const {userProfileRequestFiled, userProfileRequestSuccess} = useSelector(userDataSelector)

    const location = useLocation();
    const navigate = useNavigate();
    const {values, handleChange, setValues} = useForm({
        "name": "",
        "email": "",
        "password": ""
    });
    useEffect(() => {
        //:TODO не решено
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

    function handleUserProfileCreate(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNameError(false)
        setEmailError(false)
        setPasswordError(false)

        if (!isEmailValid(values.email)) return setEmailError(true);
        if (values.password.length < 5) return setPasswordError(true);
        if (values.name.length < 3) return setNameError(true);
        console.log('handleUserProfileCreate', values)
        //:TODO не решено
        // @ts-ignore
        dispatch(makeRegisterUser(values))
    }



    return (
        isLoading ? <p>loading...</p> :
            <section className={`${style.wr} `}>
                <p className={`text text_type_main-medium ${style.textCenter}`}>
                    Вход
                </p>
                <form onSubmit={handleUserProfileCreate} className={style.wr}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        error={nameError}
                        errorText={'Ошибка имя от 3 символов'}
                        size={'default'}
                        extraClass="pt-6 pb-6"
                        value={values.name}
                        onChange={handleChange}
                    />
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        name={'email'}
                        error={emailError}
                        errorText={'Ошибка, логин это email не подходит'}
                        size={'default'}
                        extraClass="pb-6"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        icon={'ShowIcon'}
                        name={'password'}
                        error={passwordError}
                        errorText={'Ошибка - такой пароль сохранить нелья, от 6 символов'}
                        size={'default'}
                        extraClass=" pb-6"
                        value={values.password}
                        onChange={handleChange}
                    />

                    <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20"
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Уже
                    зарегистрированы? <Link to="/login">Войти</Link></p>
            </section>
    )
}
