import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import LoginScreen from './components/login_screen/LoginScreen';
import MenuScreen from './components/menu_screen/MenuScreen';
import GameScreen from './components/game_screen/GameScreen';

import io from 'socket.io-client'

import getCookie from './utils/get_cookie.js'

import './App.css';

const socket = io.connect('https://notsoautochess.com:3002/');

function App() {

  const [currentScreen, setCurrentScreen] = useState("Login");

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

  const checkInGame = function() {

    var inGame = false;

    socket.emit("userGameGet", { auth_key: getCookie("auth_key") }, (response) => {
      console.log(response);
      if (response.success){
        setCurrentScreen("Game");
      }
      return response.success;
    });

    return inGame;

  }

  const onLogin = function() {

    setCurrentScreen("Menu");
    checkInGame();

  }

  const onLogout = function() {

    socket.emit("signOut", { auth_key: getCookie("auth_key") });
    removeCookie('auth_key');
    setCurrentScreen("Login");

  }

  useEffect(() => {
    checkLogin();

    socket.on("updateGame", function() {setCurrentScreen("Game");});

    return () => {
        socket.removeEventListener("updateGame", function() {setCurrentScreen("Game");});
    };
  }, []);

  return (
    <div className="App" onContextMenu={(event) => event.preventDefault()}>
      {currentScreen === "Login" ? < LoginScreen onLogin={onLogin} socket={socket} /> : null}
      {currentScreen === "Menu"  ? < MenuScreen checkLogin={checkLogin} onLogout={onLogout} socket={socket} /> : null }
      {currentScreen === "Game"  ? < GameScreen socket={socket} /> : null }
    </div>
  );
}

export default App;