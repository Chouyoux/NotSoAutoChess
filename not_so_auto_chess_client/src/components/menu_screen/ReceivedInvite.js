import React, { useState } from 'react'

import validate from '../../images/friend_list/validate.png';
import validate_hover from '../../images/friend_list/validate_hover.png';
import validate_click from '../../images/friend_list/validate_click.png';
import decline from '../../images/friend_list/decline.png';
import decline_hover from '../../images/friend_list/decline_hover.png';
import decline_click from '../../images/friend_list/decline_click.png';

const ReceivedInvite = ( {name, key, onValidate, onDecline} ) => {

    const [validateIcon, setValidateIcon] = useState(validate);
    const [declineIcon, setDeclineIcon] = useState(decline);

    return (
        <div className="contact" key={key}>
            <p>{name}</p>
            <img
                className="FLFirstIcon selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                alt="validate"
                src={validateIcon}
                onMouseOver={() => {setValidateIcon(validate_hover)}}
                onMouseOut={() => {setValidateIcon(validate)}}
                onMouseDown={() => {setValidateIcon(validate_click)}}
                onMouseUp={() => {setValidateIcon(validate_hover)}}
                onClick={() => onValidate(name)}
            />
            <img
                className="FLSecondIcon selectDisable"
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

export default ReceivedInvite
