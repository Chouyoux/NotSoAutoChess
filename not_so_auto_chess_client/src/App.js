import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import LoginScreen from './components/login_screen/login_screen'
import MenuScreen from './components/menu_screen/menu_screen'
import './App.css';
import getCookie from './utils/get_cookie.js'


function App() {

  const [hideLogin, setHideLogin] = useState(false);
  const [hideMenu, setHideMenu] = useState(true);

  const [cookies, removeCookie] = useCookies(['auth_key']);

  useEffect(() => {

    checkLogin();

  });

  const checkLogin = async function() {
    
    let _data = {
      auth_key: getCookie("auth_key")
    }

    await fetch('http://176.159.165.187:3001/authentify-user', {
      method: "POST",
      body: JSON.stringify(_data),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => { return response.json(); })
      .then(data => {
        if (data) {
          if (data.code === 200) {
            onLogin();
            return true;
          }
          else {
            onLogout();
            return false;
          }
        }
      });

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

  return (
      <div className="App" onContextMenu={(event) => event.preventDefault()}>
        < LoginScreen hide={hideLogin} onLogin={onLogin} />
        < MenuScreen hide={hideMenu} checkLogin={checkLogin} onLogout={onLogout} />
      </div>
  );
}

export default App;