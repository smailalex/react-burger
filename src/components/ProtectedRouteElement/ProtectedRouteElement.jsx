//import { useAuth } from '../services/auth';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";
import {useCallback, useEffect} from "react";

export const ProtectedRouteElement = ({element}) => {
    let {user, userProfileRequestSuccess} = useSelector(userDataSelector)
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        console.log(element.type.name)
        if (location.state?.form?.pathname === '/forgot-password') {
            navigate('/reset-password')
        }
    }, [location]);

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);

    //TODO: ДОбаввить проверку по кукам для компонентов ['ResetPassword','ForgotPassword' ]
    return (
        user && userProfileRequestSuccess
            ? element
            : (location.state?.form?.pathname === '/forgot-password')
                ? element
                : <Navigate to="/login" replace state={{form: location}}/>

    )


}