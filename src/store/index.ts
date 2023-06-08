import { AuthReducer } from './../components/auth/authReducer';
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    auth: AuthReducer
});

//старіший спосіб
// export const store = createStore(rootReducer,
//     composeWithDevTools(applyMiddleware(thunk)));

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
});