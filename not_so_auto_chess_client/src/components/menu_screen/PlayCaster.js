import React, { useState } from 'react'
import './play_caster.css';

import play_button from '../../images/menu_screen/play_button.png';
import play_button_hover from '../../images/menu_screen/play_button_hover.png';
import play_button_click from '../../images/menu_screen/play_button_click.png';

const PlayCaster = () => {

    const [playButton, setPlayButton] = useState(play_button);

    return (
        <div className="playCaster">

            <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
            >
                <img
                    className="playCasterPlay selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    alt="Play"
                    src={playButton}
                    onMouseOver={() => {setPlayButton(play_button_hover)}}
                    onMouseOut={() => {setPlayButton(play_button)}}
                    onMouseDown={() => {setPlayButton(play_button_click)}}
                    onMouseUp={() => {setPlayButton(play_button_hover)}}
                />
            </a>
            
            
        </div>
    )
}

export default PlayCaster
