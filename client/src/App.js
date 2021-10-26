import { login, logout } from "actions/login";
import authApi from "API/authApi";
import userApi from "API/userApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { resetListFile } from './actions/file';
import { resetListUser } from './actions/user';
import "./App.scss";
import LoginForm from "./components/Authentication/LoginForm";
import RegisterForm from "./components/Authentication/RegisterForm";
import Header from "./components/Header";
import ConvertFile from "./features/Converter/pages/ConvertFile";
import FileController from "./features/Converter/pages/FileController";
import { Logout } from './features/Converter/pages/Logout';
import UserController from "./features/Converter/pages/UserController";

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const [message, setMessage] = useState("");
  const [account_type, setAccount_type] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Nếu người dùng cố tình refresh lại trình duyệt:
    setInterval(() => {
      if(!localStorage.getItem("isLogin") || localStorage.getItem("isLogin") === false) {
        setAccount_type(null);

        dispatch(resetListFile());
        dispatch(resetListUser());
    
        localStorage.clear();
        const actionLogout = logout();
        dispatch(actionLogout);  
      } else {
        if(localStorage.getItem("account_type")) {
          setAccount_type(localStorage.getItem("account_type"));
        }
        const actionLogin = login();
        dispatch(actionLogin);
      }
    }, 2000); // Mỗi sau 2s check lại trạng thái login 1 lần, nếu 2 tab cùng đc mở, 1 tab nhấn đăng xuất thì tab còn lại cũng sẽ bị out
  },[dispatch]);

  const handleLogin = (dataLogin) => {
    authApi.login(dataLogin)
      .then((response) => {
        setMessage(response.message);
        if(response.status === 1){
          const actionLogin = login();
          dispatch(actionLogin);
          
          // reset Message báo đăng nhập nếu đăng nhập thành công
          setMessage("");
          setAccount_type(response.account_type);

          localStorage.setItem("isLogin", true);
          localStorage.setItem("account_type", response.account_type);
          localStorage.setItem("access_token", response.access_token);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (dataRegister) => {
    userApi.register(dataRegister)
      .then((response) => {
        setMessage(response.message);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setAccount_type(null);

    dispatch(resetListFile());
    dispatch(resetListUser());

    localStorage.clear();
    const actionLogout = logout();
    dispatch(actionLogout);  
  };

  if (isLogin) {
    if(account_type === "modifier"){
      return (
        <BrowserRouter>
          <Header headerType="modifier"/>
          <Switch>
            <Route path="/ConvertFile" component={ConvertFile} />
            <Route path="/FileController" component={FileController} />
            <Route path="/UserController" component={UserController} />
            <Route path="/logout">
                <Logout handleLogout={handleLogout}></Logout>
            </Route>
            <Redirect to="/convertFile" />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return(
        <BrowserRouter>
        <Header headerType="normal"/>
        <Switch>
          <Route path="/ConvertFile" component={ConvertFile} />
          <Route path="/FileController" component={FileController} />
          <Route path="/logout">
                <Logout handleLogout={handleLogout}></Logout>
            </Route>
            <Redirect to="/convertFile" />
          </Switch>
        </BrowserRouter>
      )
    }
  } else {
    return (
      <BrowserRouter>
        <p className="message">{message}</p>
        <Switch>
          <Route path="/loginForm">
            <LoginForm handleLogin={handleLogin} />
          </Route>
          <Route path="/registerForm">
            <RegisterForm handleRegister={handleRegister} />
          </Route>
          <Redirect to="/loginForm" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
