import AppHeader from "../components/AppHeader/AppHeader";
import {ResetPasswordForm} from "../components/ResetPasswordForm/ResetPasswordForm";


export const ResetPassword = () => {
    return (
        <>
            <AppHeader/>
            <div className={`ContentCenterHorizontal ContentCenterVertical`}>
                <ResetPasswordForm/>
            </div>
        </>
    )
}