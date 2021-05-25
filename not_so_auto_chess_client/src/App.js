import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import LoginScreen from './components/login_screen/LoginScreen'
import MenuScreen from './components/menu_screen/MenuScreen'

import io from 'socket.io-client'

import getCookie from './utils/get_cookie.js'

import './App.css';


const socket = io.connect('http://176.159.165.187:3001');

function App() {

  const [hideLogin, setHideLogin] = useState(false);
  const [hideMenu, setHideMenu] = useState(true);

  const [cookies, removeCookie] = useCookies(['auth_key']);

  const checkLogin = function() {

    var logged = false;

    logged = socket.emit("signIn", { auth_key: getCookie("auth_key") }, (response) => {
      console.log(response);
      if (response.success){
        onLogin();
        return true;
      }
      else{
        onLogout();
        return false;
      }
    });

    return logged;

  }

  const onLogin = function() {

    setHideLogin(true);
    setHideMenu(false);

  }

  const onLogout = function() {


    removeCookie('auth_key');
    setHideLogin(false);
    setHideMenu(true);

  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
      <div className="App" onContextMenu={(event) => event.preventDefault()}>
        < LoginScreen hide={hideLogin} onLogin={onLogin} socket={socket} />
        < MenuScreen hide={hideMenu} checkLogin={checkLogin} onLogout={onLogout} socket={socket} />
      </div>
  );
}

export default App;