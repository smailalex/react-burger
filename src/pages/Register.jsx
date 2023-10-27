import AppHeader from "../components/AppHeader/AppHeader";
import {RegisterForm} from "../components/RegisterForm/RegisterForm";

export const Register = () => {
    return (
        <>
            <AppHeader/>
            <div className={`ContentCenterHorizontal ContentCenterVertical`}>
                <RegisterForm/>
            </div>
        </>
    )
} 