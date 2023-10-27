import AppHeader from "../components/AppHeader/AppHeader";
import {ForgotPasswordForm} from "../components/ForgotPasswordForm/ForgotPasswordForm";

export const ForgotPassword = () => {
    return (
        <>
            <AppHeader/>
            <div className={`ContentCenterHorizontal ContentCenterVertical`}>
                <ForgotPasswordForm/>
            </div>
        </>
    )
}