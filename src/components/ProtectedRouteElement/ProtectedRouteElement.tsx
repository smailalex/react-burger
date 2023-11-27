//import { useAuth } from '../services/auth';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {userDataSelector} from "../../selectors";
import {getUserProfile} from "../../services/actions/user";
import React, {ReactNode, useEffect} from "react";

interface ProtectedRouteElementProps {
    element: ReactNode;
}


export const ProtectedRouteElement:React.FC<ProtectedRouteElementProps> = (props) => {
    const {element} = props;
    const {user, userProfileRequestSuccess} = useSelector(userDataSelector)
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        //console.log(element.type.name)
        if (location.state?.from?.pathname === '/forgot-password') {
            navigate('/reset-password')
        }
    }, [location]);

    useEffect(() => {
        // @ts-ignore
        (location.state?.from?.pathname !== '/profile') && dispatch(getUserProfile())
    }, [dispatch]);

    return (
        user && userProfileRequestSuccess
            ? <>{element}</>
            : (location.state?.from?.pathname === '/forgot-password')
                ? <>{element}</>
                : <Navigate to="/login" replace state={{from: location}}/>

    )

}