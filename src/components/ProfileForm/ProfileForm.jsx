import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import style from "./ProfileForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {userDataSelector} from "../../selectors";
import {useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {makeLogin, makeLogout, makeProfileUpdate} from "../../services/actions/user";
import {getCookie} from "../../utils/cookies";

export function ProfileForm() {
    const navigate = useNavigate();
    const location = useLocation();
    let {user, logoutRequestSuccess, userProfileRequestFiled, userProfileRequestSuccess} = useSelector(userDataSelector)
    const dispatch = useDispatch()
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [profileChanged, setProfileChanged] = useState(false)

    const [inputValue, setInputValue] = useState({
        "name": "",
        "email": "",
        "password": ""
    });

    useEffect(() => {
        setInputValue({...user, password: ""})
        //console.log(location)
    }, [])

    function handleUserProfileUpdate() {
        setNameError(false)
        setEmailError(false)
        setPasswordError(false)
        if (!isEmailValid(inputValue.email)) return setEmailError(true);
        if (inputValue.password.length < 5) return setPasswordError(true);
        //console.log('handleLogin', inputValue)
        dispatch(makeProfileUpdate(inputValue))
    }

    function handleUserProfileUpdateCancel() {
        setInputValue({...user, password: ""})
        setNameError(false)
        setEmailError(false)
        setPasswordError(false)
        setProfileChanged(false)
    }

    function handleLogout(e) {
        e.preventDefault();
        dispatch(makeLogout({token: getCookie('refreshToken')}))
        /*console.log(logoutRequestSuccess)
        if (logoutRequestSuccess) {
            //navigate('/login', {replace: true})
        }*/
    }


    function handleChangeInput(e) {
        setProfileChanged(true)
        setInputValue({...inputValue, [e.target.name]: e.target.value})
        //console.log(refMail)
    }


    return (
        <section className={`${style.wr} `}>
            <div className={style.menuWr}>
                <NavLink to="/profile"
                         className={({isActive}) => (isActive ? style.active + ' ' + 'text text_type_main-medium pb-4 pt-4' : `text text_type_main-medium pb-4 pt-4`)}
                >Профиль</NavLink>
                <NavLink to="/order-history"
                         className={({isActive}) => (isActive ? style.active + ' ' + 'text text_type_main-medium pb-4 pt-4' : `text text_type_main-medium pb-4 pt-4`)}
                >История заказов</NavLink>
                <NavLink to="/logout"
                         className={({isActive}) => (isActive ? style.active + ' ' + 'text text_type_main-medium pb-4 pt-4' : `text text_type_main-medium pb-4 pt-4`)}

                         onClick={handleLogout}>Выход</NavLink>
                <p className={`text text_type_main-default mt-20 ${style.inactiveText}`}>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <div className={style.contentWr}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    error={nameError}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="pb-6"
                    icon={'EditIcon'}
                    value={inputValue.name}
                    onChange={handleChangeInput}
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    name={'email'}
                    error={emailError}
                    errorText={'Ошибка, логин это email не подходит'}
                    size={'default'}
                    extraClass="pb-6"
                    icon={'EditIcon'}
                    value={inputValue.email}
                    onChange={handleChangeInput}
                />
                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    icon={'EditIcon'}
                    name={'password'}
                    error={passwordError}
                    errorText={'Ошибка - такой пароль сохранить нелья, от 6 символов'}
                    size={'default'}
                    extraClass=" pb-6"
                    value={inputValue.password}
                    onChange={handleChangeInput}
                />

                {profileChanged && <div className={style.wr}>
                    <Button htmlType="button" type="primary" size="small" extraClass="mb-20"
                            onClick={handleUserProfileUpdate}>Сохранить</Button>
                    <Button htmlType="button" type="primary" size="small" extraClass="mb-20"
                            onClick={handleUserProfileUpdateCancel}>Отмена</Button>
                </div>
                }

            </div>

        </section>
    )
}
