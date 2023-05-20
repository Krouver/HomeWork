import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/register/RegisterPage";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import CategoryCreatePage from "./components/admin/categories/create/CategoryCreatePage";
import AdminLayout from "./components/containers/admin/AdminLayout";
import CategoriesListPage from "./components/admin/categories/list/CategoriesListPage";
import ProductsListPage from "./components/admin/products/list/ProductsListPage";
import ProductCreatePage from "./components/admin/products/create/ProductCreatePage";

const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
          </Route>

          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="categories/create" element={<CategoryCreatePage/>} />
            <Route path="categories/list" element={<CategoriesListPage/>} />
            <Route path="products/list" element={<ProductsListPage/>} />
            <Route path="products/create" element={<ProductCreatePage/>} />
          </Route>
        </Routes>
    </>
  );
};

export default App;
