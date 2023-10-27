import AppHeader from "../components/AppHeader/AppHeader";
import {LoginForm} from "../components/LoginForm/LoginForm";

export const Login = () => {
    return (
        <>
            <AppHeader/>
            <div className={`ContentCenterHorizontal ContentCenterVertical`}>
                <LoginForm/>
            </div>
        </>

    )
}