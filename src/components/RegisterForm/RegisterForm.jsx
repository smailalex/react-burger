import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./RegisterForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {makeProfileUpdate, makeRegisterUser} from "../../services/actions/user";
import {userDataSelector} from "../../selectors";

export function RegisterForm() {
    const dispatch = useDispatch()
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    let {userProfileRequestFiled, userProfileRequestSuccess} = useSelector(userDataSelector)

    const location = useLocation();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        "name": "",
        "email": "",
        "password": ""
    });


    useEffect(() => {
        if (userProfileRequestSuccess) {
            navigate(location.state?.form?.pathname ? location.state.form.pathname : '/')
        }
        if (userProfileRequestFiled) {
            setIsLoading(false)
        }

    }, [userProfileRequestSuccess, userProfileRequestFiled]);

    function handleUserProfileCreate() {
        setNameError(false)
        setEmailError(false)
        setPasswordError(false)

        if (!isEmailValid(inputValue.email)) return setEmailError(true);
        if (inputValue.password.length < 5) return setPasswordError(true);
        if (inputValue.name.length < 3) return setNameError(true);
        console.log('handleUserProfileCreate', inputValue)
        dispatch(makeRegisterUser(inputValue))
    }

    function handleChangeInput(e) {
        return setInputValue({...inputValue, [e.target.name]: e.target.value})
        //console.log(refMail)
    }

    return (
        isLoading ? <p>loading...</p> :
            <section className={`${style.wr} `}>
                <p className={`text text_type_main-medium ${style.textCenter}`}>
                    Вход
                </p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    error={nameError}
                    errorText={'Ошибка имя от 3 символов'}
                    size={'default'}
                    extraClass="pt-6 pb-6"
                    value={inputValue.name}
                    onChange={handleChangeInput}
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    name={'email'}
                    error={emailError}
                    errorText={'Ошибка, логин это email не подходит'}
                    size={'default'}
                    extraClass="pb-6"
                    value={inputValue.email}
                    onChange={handleChangeInput}
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
                    value={inputValue.password}
                    onChange={handleChangeInput}
                />

                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20"
                        onClick={handleUserProfileCreate}>
                    Зарегистрироваться
                </Button>
                <p className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>Уже
                    зарегистрированы? <Link to="/login">Войти</Link></p>
            </section>
    )
}
