import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Login from './Screens/Login/Login'
import Register from './Screens/Register/Register'
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword'
import ResetPassword from './Screens/ResetPassword/ResetPassword'
import Home from './Screens/Home/Home'
import CreateProduct from './Screens/CreateProduct/CreateProduct'
import ProductsScreen from './Screens/ProductsScreen/ProductsScreen'
import DeleteProduct from './Screens/DeleteProduct/DeleteProduct'
import UpdateProduct from './Screens/UpdateProduct/UpdateProduct'
import Verify from './Screens/Verify/Verify'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}/> 
      <Route path="/login" element={<Login />}/> 
      <Route path="/register" element={<Register />}/> 
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password/:reset_token" element={<ResetPassword />}/>
      <Route path="/verify/:token" element={<Verify />}/> 
      <Route path="/home" element={<Home />}/>
      <Route path="/product/new" element={<CreateProduct/>}/>
      <Route path="/product/:product_id" element={<ProductsScreen />}/>
      <Route path="/product/:product_id/edit" element={<UpdateProduct/>}/>
      <Route path="/product/:product_id/delete" element={<DeleteProduct/>}/>
    </Routes>
    </>
  )
}

export default App
