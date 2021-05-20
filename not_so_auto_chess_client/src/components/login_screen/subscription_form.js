import React, { useState } from 'react';
import './subscription_form.css';

const Subscription_form = ( { hide } ) => {

    const [pseudonym, setPseudonym] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState('');

    const onSubmit = async (event) => {

        // prevent redirect
        event.preventDefault();

        setIsLoading(true);

        // fetch request
        let _data = {
            pseudonym: pseudonym,
            email: email,
            password1: password1,
            password2: password2
        }

        await fetch('http://176.159.165.187:3001/add-user', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => { return response.json();})
        .then(data => {
            if(data) {
                if (data.code === 201){
                    setPseudonym('');
                    setEmail('');
                    setPassword1('');
                    setPassword2('');
                }
                setFormState(data.message);
            }
        });

        // reset form and loading state
        
        setIsLoading(false);
    };

    

    return hide ? null : (

            <form className="subscription_form" onSubmit={onSubmit}>

                <label>Pseudonym :</label>
                <input
                    className="subscriptionInput"
                    type="text"
                    id="pseudonym"
                    name="pseudonym"
                    placeholder="pseudonym"
                    onChange={(event) => setPseudonym(event.target.value)}
                    value={pseudonym}
                    required
                /> <br />

                <label>Email Address :</label>
                <input
                    className="subscriptionInput"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@domain.com"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    required
                /> <br />

                <label>Password :</label>
                <input
                    className="subscriptionInput"
                    type="password"
                    id="password1"
                    name="password1"
                    placeholder="password"
                    onChange={(event) => setPassword1(event.target.value)}
                    value={password1}
                    required
                /> <br />

                <label>Password Confirmation :</label>
                <input
                    className="subscriptionInput"
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="password"
                    onChange={(event) => setPassword2(event.target.value)}
                    value={password2}
                    required
                /> <br />

                <label>I read and accept the <a href="/cgu.html"><u>General use conditions</u></a></label>
                <input type="checkbox" required/> <br /> <br />

                <button className="subscriptionButton" type="submit"> {isLoading ? 'Sending...' : 'Register'} </button> <br />
                <label>{formState}</label><br/> <br />

            </form>
    )
}

export default Subscription_form