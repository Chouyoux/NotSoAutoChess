import React, { useState } from 'react';
import Sidebar from './Sidebar'
import SubscriptionForm from './SubscriptionForm'
import LoginForm from './LoginForm'
import './login_screen.css';

const LoginScreen = ( { onLogin, socket } ) => {

    const [login, setLogin] = useState(true);

    return (
        <div>
            <Sidebar />
            <div className="screen_form_block">
                <SubscriptionForm hide={login} socket={socket} />
                <LoginForm hide={!login} onLogin={onLogin} socket={socket} />
                <button
                    className="loginScreenButton"
                    onClick={() => setLogin(!login)}>
                {login ? "I don't have an account" : "I already have an account"}
                </button>
            </div>
        </div>
    )
}

  

export default LoginScreen
