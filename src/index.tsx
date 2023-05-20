import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import setAuthToken from "./helpers/setAuthToken";
import { Provider } from "react-redux";
import { store } from "./store";
import jwt_decode from "jwt-decode";
import { AuthUserActionType } from "./components/auth/types";
import { IUser } from "./components/auth/login/types";

if(localStorage.token) {
  setAuthToken(localStorage.token);
  const user = jwt_decode<IUser>(localStorage.token);
  store.dispatch({type: AuthUserActionType.LOGIN_USER, payload: user});
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
