import React, {useState, useEffect} from 'react'
import './profile_screen.css'

import getCookie from '../../utils/get_cookie.js'

import pen from '../../images/profile_screen/pen.png';
import back_arrow from '../../images/profile_screen/back_arrow.png';

const Profile_screen = ( { hide, backToMenu, onLogout } ) => {

    const [isEditingPseudonym, setIsEditingPseudonym] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [pseudonym, setPseudonym] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPseudonym, setOldPseudonym] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("******");

    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState('');

    useEffect(() => {

        if (!hide){
            updateContent();
        }
    
    });

    

    const onSubmit = async (event) => {

        // prevent redirect
        event.preventDefault();

        setIsLoading(true);

        if ( (!isEditingPseudonym || pseudonym === "") && (!isEditingPassword || password === "") && (!isEditingEmail || email === "") ) {
            setFormState("No changes were submitted.");
            setIsLoading(false);
            return;
        }

        // fetch request
        let _data = {
            pseudonym: isEditingPseudonym ? pseudonym : "",
            password: isEditingPassword ? password : "",
            email : isEditingEmail ? email : "",
            auth_key : getCookie("auth_key")
        }

        await fetch('http://176.159.165.187:3001/update-user', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => { return response.json();})
        .then(data => {
            if(data) {
                if (data.code === 200){
                    setIsEditingPseudonym(false);
                    setIsEditingEmail(false);
                    setIsEditingPassword(false);
                    updateContent();
                }
                setFormState(data.message);
            }
        });

        
        setIsLoading(false);
    };

    const updateContent = function () {

        let _data = {
            auth_key: getCookie("auth_key")
        }

        fetch('http://176.159.165.187:3001/get-user', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => { return response.json();})
        .then(data => {
            if(data) {
                if (data.code === 200){
                    setOldPseudonym(data.pseudonym);
                    setOldEmail(data.email);
                }
                else {
                    onLogout();
                }
            }
        });

    }

    return (
        <div className="profileScreen">
            
            <button className="profileBackButton"  onClick={() => backToMenu()} ><img src={back_arrow} alt="back arrow" /></button>
            <form className="profileForm" onSubmit={onSubmit}>
                <h1 className="profileH1" > Your Profile </h1>
                <hr className="profileHR" />
                <label className="profileLabel">Pseudonym : {oldPseudonym} </label> <img className="profilePen" src={pen} alt="pen" onClick={() => {setIsEditingPseudonym(!isEditingPseudonym)}} /> <br/>
                { isEditingPseudonym ?
                <div>
                    <input
                        className="profileInput"
                        type="text"
                        id="pseudonym"
                        name="pseudonym"
                        placeholder={oldPseudonym}
                        onChange={(event) => setPseudonym(event.target.value)}
                    /> <br />
                </div> :
                <div>
                    <input
                        className="profileInput"
                        type="text"
                        id="oldpseudonym"
                        name="oldpseudonym"
                        placeholder={oldPseudonym}
                        disabled
                    /> <br />
                </div> }
                <br />
                <label className="profileLabel">Email : {oldEmail} </label> <img className="profilePen" src={pen} alt="pen" onClick={() => {setIsEditingEmail(!isEditingEmail)}} /> <br />
                { isEditingEmail ?
                <div>
                    <input
                        className="profileInput"
                        type="email"
                        id="email"
                        name="email"
                        placeholder={oldEmail}
                        onChange={(event) => setEmail(event.target.value)}
                    /> <br />
                </div> :
                <div>
                    <input
                        className="profileInput"
                        type="email"
                        id="oldemail"
                        name="oldemail"
                        placeholder={oldEmail}
                        disabled
                    /> <br />
                </div> }
                <br />
                <label className="profileLabel">Password : {oldPassword} </label> <img className="profilePen" src={pen} alt="pen" onClick={() => {setIsEditingPassword(!isEditingPassword)}} /> <br />
                { isEditingPassword ?
                <div>
                    <input
                        className="profileInput"
                        type="password"
                        id="password"
                        name="password"
                        placeholder={oldPassword}
                        onChange={(event) => setPassword(event.target.value)}
                    /> <br />
                </div> :
                <div>
                    <input
                        className="profileInput"
                        type="password"
                        id="oldpassword"
                        name="oldpassword"
                        placeholder={oldPassword}
                        disabled
                    /> <br />
                </div>  }
                <br />

                <button type="submit" className="profileButton">{isLoading ? 'Sending...' : 'Submit Changes'}</button> <br />
                <label className="profileLabel">{formState}</label>
            </form>
        </div>
    )
}

export default Profile_screen