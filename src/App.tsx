import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/register/RegisterPage";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import CategoryCreatePage from "./components/admin/categories/create/CategoryCreatePage";

const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
          </Route>

          <Route path="/admin" element={<DefaultLayout/>}>
            <Route path="categories/create" element={<CategoryCreatePage/>} />
          </Route>
        </Routes>
    </>
  );
};

export default App;
