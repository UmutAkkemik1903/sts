import React from "react";
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";

/*Sayfalar*/
import Index from './Pages/Index/index';
import Login from './Pages/Login/index';
import Register from './Pages/Register/index';
/*Ürünler*/
import ProductIndex from './Pages/Product/index';
import ProductCreate from './Pages/Product/create';
import ProductEdit from './Pages/Product/edit';
/*Kategori*/
import CategoryIndex from './Pages/Category/index';
import CategoryCreate from './Pages/Category/create';
import CategoryEdit from './Pages/Category/edit';
/*Müşteri*/
import CustomerIndex from './Pages/Customer/index';
import CustomerCreate from './Pages/Customer/create';
import CustomerEdit from './Pages/Customer/edit';
/*Stok*/
import StockIndex from './Pages/Stock/index';
import StockCreate from './Pages/Stock/create';
import StockEdit from './Pages/Stock/edit';
/*Profil*/
import ProfileIndex from './Pages/Profile/index';
const Main = () => (
    <Switch>
        <PrivateRoute exact path="/" component={Index}></PrivateRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>

        <PrivateRoute exact path="/products" component={ProductIndex}></PrivateRoute>
        <PrivateRoute path="/products/create" component={ProductCreate}></PrivateRoute>
        <PrivateRoute path="/products/edit/:id" component={ProductEdit}></PrivateRoute>

        <PrivateRoute exact path="/category" component={CategoryIndex}></PrivateRoute>
        <PrivateRoute path="/category/create" component={CategoryCreate}></PrivateRoute>
        <PrivateRoute path="/category/edit/:id" component={CategoryEdit}></PrivateRoute>

        <PrivateRoute exact path="/customers" component={CustomerIndex}></PrivateRoute>
        <PrivateRoute path="/customers/create" component={CustomerCreate}></PrivateRoute>
        <PrivateRoute path="/customers/edit/:id" component={CustomerEdit}></PrivateRoute>

        <PrivateRoute exact path="/stock" component={StockIndex}></PrivateRoute>
        <PrivateRoute path="/stock/create" component={StockCreate}></PrivateRoute>
        <PrivateRoute path="/stock/edit/:id" component={StockEdit}></PrivateRoute>

        <PrivateRoute exact path="/profile" component={ProfileIndex}></PrivateRoute>
    </Switch>
);
export default Main;
