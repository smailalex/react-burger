import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {Error404, ForgotPassword, HomePage, IngredientID, Login, Profile, Register, ResetPassword} from "../../pages";
import {ProtectedRouteElement} from "../ProtectedRouteElement/ProtectedRouteElement";
import AppHeader from "../AppHeader/AppHeader";
import style from "./App.module.css";

function App() {


    return (

            <div className={style.App}>
                <AppHeader/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>

                <Route path="/ingredients/:id" element={<IngredientID/>}/>

                <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>}/>}/>
                <Route path="*" element={<ProtectedRouteElement element={<Error404/>}/>}/>

            </Routes>
            </div>

    );
}

export default App;
