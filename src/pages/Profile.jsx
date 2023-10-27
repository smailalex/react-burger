import AppHeader from "../components/AppHeader/AppHeader";
import {ProfileForm} from "../components/ProfileForm/ProfileForm";

export const Profile = () => {
    return (
        <>
            <AppHeader/>
            <div className={`ContentCenterHorizontal ContentCenterVertical`}>
                <ProfileForm/>
            </div>
        </>
    )
}