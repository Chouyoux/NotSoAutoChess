import React, {useState, useEffect} from 'react';
import './profile_screen.css';

import Selector from './Selector';

import getCookie from '../../utils/get_cookie.js';

import pen from '../../images/profile_screen/pen.png';
import back_arrow from '../../images/profile_screen/back_arrow.png';

// Can't use FS in react ? manual filling for now
import avatar0 from '../../images/profile_screen/avatars/avatar0.png';
import avatar1 from '../../images/profile_screen/avatars/avatar1.png';
import avatar2 from '../../images/profile_screen/avatars/avatar2.png';
import avatar3 from '../../images/profile_screen/avatars/avatar3.png';
import avatar4 from '../../images/profile_screen/avatars/avatar4.png';
import avatar5 from '../../images/profile_screen/avatars/avatar5.png';

import set0 from '../../images/profile_screen/sets/set0.png';
import set1 from '../../images/profile_screen/sets/set1.png';

const avatars = [];
avatars.push(avatar0);
avatars.push(avatar1);
avatars.push(avatar2);
avatars.push(avatar3);
avatars.push(avatar4);
avatars.push(avatar5);

const sets = [];
sets.push(set0);
sets.push(set1);

const ProfileScreen = ( { hide, backToMenu, onLogout, socket } ) => {

    const [isEditingPseudonym, setIsEditingPseudonym] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [pseudonym, setPseudonym] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPseudonym, setOldPseudonym] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [oldPassword] = useState("******");

    const [avatarChoice, setAvatarChoice] = useState(0);
    const [setChoice, setSetChoice] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState('');

    const onSubmit = (event) => {

        // prevent redirect
        event.preventDefault();

        setIsLoading(true);

        // fetch request
        let _data = {
            pseudonym: isEditingPseudonym ? pseudonym : "",
            password: isEditingPassword ? password : "",
            email : isEditingEmail ? email : "",
            avatar: avatarChoice,
            set : setChoice,
            auth_key : getCookie("auth_key")
        }

        socket.emit("userUpdate", _data, (response) => {
            console.log(response);
            if (response.success){
                setIsEditingPseudonym(false);
                setIsEditingEmail(false);
                setIsEditingPassword(false);
                updateContent();
            }
            setFormState(response.message);
        });

        
        setIsLoading(false);
    };

    const updateContent = function () {

        socket.emit("userGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setOldPseudonym(response.pseudonym);
                setOldEmail(response.email);
                setAvatarChoice(response.avatar);
                setSetChoice(response.set);
            }
            else{
                onLogout();
            }
        });

    }

    useEffect(() => {
        updateContent();
    }, []);

    return (
        <div className="profileScreen">
            
            <button className="profileBackButton"  onClick={() => backToMenu()} ><img src={back_arrow} alt="back arrow" /></button>
            <form className="profileForm" onSubmit={onSubmit}>
                <h1 className="profileH1" > Your Profile </h1>
                <hr className="profileHR" />
                
                <Selector
                    imgSet={avatars}
                    current={avatarChoice}
                    title="Avatar"
                    Choose={setAvatarChoice}
                />

                <Selector
                    imgSet={sets}
                    current={setChoice}
                    title="Set"
                    Choose={setSetChoice}
                />

                <br />


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
                        type="text"
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

export default ProfileScreen