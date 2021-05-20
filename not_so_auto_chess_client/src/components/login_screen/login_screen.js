import React, { useState } from 'react';
import Sidebar from './sidebar'
import SubscriptionForm from './subscription_form'
import LoginForm from './login_form'
import './login_screen.css';

const Login_screen = ( { hide, onLogin } ) => {

    const [login, setLogin] = useState(false);

    return hide ? null : (
        <div>
            <Sidebar />
            <div className="screen_form_block">
                <SubscriptionForm hide={login} />
                <LoginForm hide={!login} onLogin={onLogin} />
                <button
                    className="loginScreenButton"
                    onClick={() => setLogin(!login)}>
                {login ? "I don't have an account" : "I already have an account"}
                </button>
            </div>
        </div>
    )
}

  

export default Login_screen
