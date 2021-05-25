import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './login_form.css';

const LoginForm = ( { hide, onLogin, socket } ) => {

    const [pseudonym, setPseudonym] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState('');

    const [cookies, setCookie] = useCookies(['auth_key']);

    const onSubmit = async (event) => {

        // prevent redirect
        event.preventDefault();

        setIsLoading(true);

        socket.emit("signIn", { pseudonym: pseudonym, password: password }, (response) => {
            console.log(response);
            if (response.success){
                setCookie('auth_key', response.token, { path: '/' });
                onLogin();
            }
            else{
                setFormState(response.message);
                setIsLoading(false);
            }
        });


    };

    return hide ? null : (

            <form className="loginForm" onSubmit={onSubmit}>

                <label>Pseudonym :</label>
                <input
                    className="loginInput"
                    type="text"
                    id="pseudonym"
                    name="pseudonym"
                    placeholder="pseudonym"
                    onChange={(event) => setPseudonym(event.target.value)}
                    value={pseudonym}
                    required
                /> <br />

                <label>Password :</label>
                <input
                    className="loginInput"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    required
                /> <br />

                <button className="loginButton" type="submit"> {isLoading ? 'Sending...' : 'Login'} </button> <br />
                <label>{formState}</label><br/> <br />

            </form>

    )
}

export default LoginForm
