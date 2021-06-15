import React from 'react';

import './player_info.css';

// Can't use FS in react ? manual filling for now
import avatar0 from '../../images/profile_screen/avatars/avatar0.png';
import avatar1 from '../../images/profile_screen/avatars/avatar1.png';
import avatar2 from '../../images/profile_screen/avatars/avatar2.png';
import avatar3 from '../../images/profile_screen/avatars/avatar3.png';
import avatar4 from '../../images/profile_screen/avatars/avatar4.png';
import avatar5 from '../../images/profile_screen/avatars/avatar5.png';

const avatars = [];
avatars.push(avatar0);
avatars.push(avatar1);
avatars.push(avatar2);
avatars.push(avatar3);
avatars.push(avatar4);
avatars.push(avatar5);

const PlayerInfo = ({ time, pseudonym, avatar, reverse }) => {

    return (
    <div className={reverse ? "player-info-reverse" : "player-info"}>

        <div className="player-info-timer">
            <p className="player-info-timer-txt">{time}</p>
        </div>
    
        <div className="player-info-avatarFrame">
        <div className="player-info-avatarContainer" style={{backgroundImage: `url(${avatars[avatar]})`}}>
            <p className="player-info-pseudoFrame">{pseudonym}</p>
        </div>
        </div>
    </div>
    )
}

export default PlayerInfo
