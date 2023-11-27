import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import style from "./ProfileForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {userDataSelector} from "../../selectors";
import {ChangeEvent, FC, FormEvent, FormEventHandler, useEffect, useState} from "react";
import {isEmailValid} from "../../utils/validation";
import {makeLogin, makeLogout, makeProfileUpdate} from "../../services/actions/user";
import {getCookie} from "../../utils/cookies";
import {useForm} from "../../hooks/useForm";




export const ProfileForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {values, handleChange : handleChangeInput, setValues} = useForm({
        "name": "",
        "email": "",
        "password": ""
    });
    const {user} = useSelector(userDataSelector)
    const dispatch = useDispatch()
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [profileChanged, setProfileChanged] = useState(false)

  

    useEffect(() => {
        setValues({...user, password: ""})
        //console.log(location)
    }, [user])

    function handleUserProfileUpdate(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNameError(false)
        setEmailError(false)
        setPasswordError(false)
        if (!isEmailValid(values.email)) return setEmailError(true);
        if (values.password.length < 5) return setPasswordError(true);
        //console.log('handleLogin', values)
        //:TODO не решено
        // @ts-ignore
        dispatch(makeProfileUpdate(values))
        //setValues({...user, password: ""})
    }

    function handleUserProfileUpdateCancel() {

        setValues({...user, password: ""})
        setNameError(false)
        setEmailError(false)
        setPasswordError(false)
        setProfileChanged(false)
    }

    function handleLogout(e:FormEvent<HTMLAnchorElement>) {
        e.preventDefault();
        //:TODO не решено
        // @ts-ignore
        dispatch(makeLogout({token: getCookie('refreshToken')}))
        /*console.log(logoutRequestSuccess)
        if (logoutRequestSuccess) {
            //navigate('/login', {replace: true})
        }*/
    }


   function handleChange(e:ChangeEvent<HTMLInputElement>){
        setProfileChanged(true)
        handleChangeInput(e)
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
            <form className={style.contentWr} onSubmit={handleUserProfileUpdate}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    error={nameError}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="pb-6"
                    icon={'EditIcon'}
                    value={values.name}
                    onChange={handleChange}
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
                    value={values.email}
                    onChange={handleChange}
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
                    value={values.password}
                    onChange={handleChange}
                />

                {profileChanged && <div className={style.wr}>
                    <Button htmlType="submit" type="primary" size="small" extraClass="mb-20"
                            >Сохранить</Button>
                    <Button htmlType="button" type="primary" size="small" extraClass="mb-20"
                            onClick={handleUserProfileUpdateCancel}>Отмена</Button>
                </div>
                }

            </form>

        </section>
    )
}
