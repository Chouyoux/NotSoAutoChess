import React, {useState} from 'react'

import decline from '../../../images/friend_list/decline.png';
import decline_hover from '../../../images/friend_list/decline_hover.png';
import decline_click from '../../../images/friend_list/decline_click.png';

const PendingInvite = ( {name, key, onDecline} ) => {

    const [declineIcon, setDeclineIcon] = useState(decline);

    return (
        <div className="contact" key={key}>
            <p>{name.length > 9 ? name.substring(0, 8)+"..." : name}</p>
            <img
                className="FLFirstIcon selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                alt="decline"
                src={declineIcon}
                onMouseOver={() => {setDeclineIcon(decline_hover)}}
                onMouseOut={() => {setDeclineIcon(decline)}}
                onMouseDown={() => {setDeclineIcon(decline_click)}}
                onMouseUp={() => {setDeclineIcon(decline_hover)}}
                onClick={() => onDecline(name)}
            />
        </div>
    )
}

export default PendingInvite
