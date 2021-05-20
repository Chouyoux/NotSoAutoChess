import React, { useState } from 'react'
import { useSpring, useTransition, animated } from 'react-spring'
import PlayCaster from './play_caster'
import ProfileScreen from '../profile_screen/profile_screen'
import FriendsList from './friends_list'
import Chat from '../chat/Chat'

import icon_profile from '../../images/menu_screen/icon_profile.png';
import icon_profile_hover from '../../images/menu_screen/icon_profile_hover.png';
import icon_friends from '../../images/menu_screen/icon_friends.png';
import icon_friends_hover from '../../images/menu_screen/icon_friends_hover.png';
import icon_logout from '../../images/menu_screen/icon_logout.png';
import icon_logout_hover from '../../images/menu_screen/icon_logout_hover.png';

import './menu_screen.css';

const Menu_screen = ( { hide, checkLogin, onLogout } ) => {

    const [showProfile, setShowProfile] = useState(false);
    const [iconProfile, setIconProfile] = useState(icon_profile);
    const [iconFriends, setIconFriends] = useState(icon_friends);
    const [iconLogout, setIconLogout] = useState(icon_logout);

    const [showFriendList, setShowFriendList] = useState(false);
    const friendsTransition = useTransition(showFriendList, {
        from : { x: 300  },
        enter : { x : 0, y : 0 },
        leave: { x: 300 }
    })

    const unmountFriendlist = function () {

        setShowFriendList(false);

    }

    const backToMenu = function () {

        checkLogin();
        setShowProfile(false);

    }
    
    return hide ? null : showProfile ?
    (
        <div>
            <ProfileScreen backToMenu={backToMenu} onLogout={onLogout} hide={!showProfile} />
        </div>
    ) :
    (
        <div className="menuScreen">

            <img
                className="menuSreenLogoutIcon selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                src={iconLogout}
                alt="Logout"
                onClick={() => {onLogout(); setIconLogout(icon_logout);}}
                onMouseOver={() => {setIconLogout(icon_logout_hover)}}
                onMouseOut={() => {setIconLogout(icon_logout)}}
            />
            <img
                className="menuSreenProfileIcon selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                src={iconProfile}
                alt="Profile"
                onClick={() => { if (checkLogin()) { setShowProfile(true); setIconProfile(icon_profile); } }}
                onMouseOver={() => { setIconProfile(icon_profile_hover) }}
                onMouseOut={() => { setIconProfile(icon_profile) }}
            />
            <img
                className="menuSreenFriendsIcon selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                src={iconFriends}
                alt="Friends"
                onClick={() => {if (checkLogin()) { setShowFriendList(!showFriendList); }}}
                onMouseOver={() => {setIconFriends(icon_friends_hover)}}
                onMouseOut={() => {setIconFriends(icon_friends)}}
            />

            <Chat />

            <div className="menuScreenMenu">

                <PlayCaster /> <br />
                
            </div>

            {friendsTransition((style, item) =>
                item ? <animated.div style={style}> <FriendsList unmount={unmountFriendlist} /> </animated.div> : null
            )}

        </div>
    )
}

export default Menu_screen