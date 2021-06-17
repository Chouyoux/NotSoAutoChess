import React, { useState, useEffect } from 'react'
import './play_caster.css';

import getCookie from '../../utils/get_cookie.js';

import play_button from '../../images/menu_screen/play_button.png';
import play_button_hover from '../../images/menu_screen/play_button_hover.png';
import play_button_click from '../../images/menu_screen/play_button_click.png';

import cancel_button from '../../images/menu_screen/cancel_button.png';
import cancel_button_hover from '../../images/menu_screen/cancel_button_hover.png';
import cancel_button_click from '../../images/menu_screen/cancel_button_click.png';

const PlayCaster = ({ socket }) => {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [playButton, setPlayButton] = useState(isSearching ? cancel_button : play_button);


    const onClick = function () {

        socket.emit(isSearching ? "userMatchmakingLeave" : "userMatchmakingJoin", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setIsSearching(!isSearching);
                setPlayButton(!isSearching ? (isMouseOver ? cancel_button_hover : cancel_button) : (isMouseOver ? play_button_hover : play_button));
            }
        });

    }

    useEffect(() => {
        socket.on("MMEntered", function() {setIsSearching(true); setPlayButton(isMouseOver ? cancel_button_hover : cancel_button);});
        socket.on("MMCanceled", function() {setIsSearching(false); setPlayButton(isMouseOver ? play_button_hover : play_button);});

        socket.emit("userMatchmakingGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setIsSearching(response.isSearching);
                setPlayButton(response.isSearching ? cancel_button : play_button);
            }
        });

        return () => {
            socket.removeEventListener("MMEntered", function() {setIsSearching(true); setPlayButton(isMouseOver ? cancel_button_hover : cancel_button);});
            socket.removeEventListener("MMCanceled", function() {setIsSearching(false); setPlayButton(isMouseOver ? play_button_hover : play_button);});
        };

    }, []);

    return (
        <div className="playCaster">

                <img
                    className="playCasterPlay selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    alt="Play"
                    src={playButton}
                    onMouseOver={() => {setPlayButton(isSearching ? cancel_button_hover : play_button_hover); setIsMouseOver(true);}}
                    onMouseOut={() => {setPlayButton(isSearching ? cancel_button : play_button); setIsMouseOver(false);}}
                    onMouseDown={() => {setPlayButton(isSearching ? cancel_button_click : play_button_click)}}
                    onMouseUp={() => {setPlayButton(isSearching ? cancel_button_hover : play_button_hover)}}
                    onClick={() => {onClick();}}
                />
            
            
        </div>
    )
}

export default PlayCaster
