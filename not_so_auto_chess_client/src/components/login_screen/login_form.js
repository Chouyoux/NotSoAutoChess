import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './login_form.css';

const Login_form = ( { hide, onLogin } ) => {

    const [pseudonym, setPseudonym] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState('');

    const [cookies, setCookie] = useCookies(['auth_key']);

    const onSubmit = async (event) => {

        // prevent redirect
        event.preventDefault();

        setIsLoading(true);

        // fetch request
        let _data = {
            pseudonym: pseudonym,
            password: password
        }

        await fetch('http://176.159.165.187:3001/authentify-user', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => { return response.json();})
        .then(data => {
            if(data) {
                if (data.code === 200){
                    setPseudonym('');
                    setPassword('');

                    setCookie('auth_key', data.auth_key, { path: '/' });
                    onLogin();
                }
                setFormState(data.message);
            }
        });

        // reset form and loading state
        
        setIsLoading(false);
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

export default Login_form
