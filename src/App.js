import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './user/Login';
import Register from './user/Register';

import Add from './product/Add';
import List from './product/List';
import Edit from './product/Edit';
import Home from './product/Home';


import React,{useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Outlet, useActionData, Navigate} from 'react-router-dom'
import EditCategory from './product/EditCategory';
import AddCategory from './product/AddCategory';
import Chat from './user/Chat';
function App() {
  const [user,setUser]=useState(GetUserFromLocalStorage())
  function GetUserFromLocalStorage(){
    const userInfo=localStorage.getItem('user')
    if(userInfo){
      return JSON.parse(userInfo)
    }
    return null
  }

    // lưu thông tin user vào localStorage
    const saveUserToLocalStorage = (userInfo) => {
      if (!userInfo) {
        localStorage.removeItem('user');
        setUser(null);
      } else {
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
      }
    }
    
  function PublicRoute(){
    if(user){
      return <Navigate to='/'/>
    }
    else{
      return <Outlet/>
    }
  }

  function PrivateRoute(){
    if(user){
      return <Outlet/>
    }
    else{
      return <Navigate to='/login'/>
    }
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />} >
            <Route path="/" element={<Home saveUser={saveUserToLocalStorage}/>} />
            <Route path="/list" element={<List saveUser={saveUserToLocalStorage}/>} />
            <Route path="/add" element={<Add saveUser={saveUserToLocalStorage}/>} />
            <Route path="/edit/:id" element={<Edit saveUser={saveUserToLocalStorage}/>} />
            <Route path="/add-category/" element={<AddCategory saveUser={saveUserToLocalStorage}/>} />
            <Route path="/edit-category/:id" element={<EditCategory saveUser={saveUserToLocalStorage}/>} />
            <Route path="/chat" element={<Chat saveUser={saveUserToLocalStorage}/>} />
          </Route>

          <Route element={<PublicRoute />} >
            <Route path="/login" element={<Login saveUser={saveUserToLocalStorage} />} />
            <Route path="/register" element={<Register/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
