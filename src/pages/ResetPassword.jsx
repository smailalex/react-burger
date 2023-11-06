import {ResetPasswordForm} from "../components/ResetPasswordForm/ResetPasswordForm";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

export const ResetPassword = () => {
    const location = useLocation();

    return (
        (location.state?.form?.pathname === '/forgot-password' ) ?  <div className={`ContentCenterHorizontal ContentCenterVertical`}>
            <ResetPasswordForm/>
        </div> : <Navigate to={'/'}  />

    )
}