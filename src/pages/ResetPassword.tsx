import {ResetPasswordForm} from "../components/ResetPasswordForm/ResetPasswordForm";
import {Navigate, useLocation} from "react-router-dom";

export const ResetPassword = () => {
    const location = useLocation();

    return (
        (location.state?.from?.pathname === '/forgot-password' ) ?  <div className={`ContentCenterHorizontal ContentCenterVertical`}>
            <ResetPasswordForm/>
        </div> : <Navigate to={'/'}  />

    )
}