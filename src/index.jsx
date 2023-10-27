import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers/rootReducer'; 
import {Provider, useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRouteElement} from "./components/ProtectedRouteElement/ProtectedRouteElement";
import {App, Error404, Login, Profile, ForgotPassword, ResetPassword, IngredientID, Register} from './pages';
import {userDataSelector} from "./selectors";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root')// as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/" element={<App />} />
                <Route path="/ingredients/:id"  element={<IngredientID />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} />


                <Route path="*" element={<ProtectedRouteElement element={<Error404 />}/>} />

            </Routes>
        </BrowserRouter>

    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();