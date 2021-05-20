import React from 'react'
import "./friends_list.css"

import remove_friend from '../../images/friend_list/remove_friend.png';
import remove_friend_hover from '../../images/friend_list/remove_friend.png';

import validate from '../../images/friend_list/validate.png';
import validate_hover from '../../images/friend_list/validate_hover.png';
import validate_click from '../../images/friend_list/validate_click.png';
import decline from '../../images/friend_list/decline.png';
import decline_hover from '../../images/friend_list/decline_hover.png';
import decline_click from '../../images/friend_list/decline_click.png';

import fold from '../../images/friend_list/fold.png';

const Friends_list = () => {
    return (
        <div className="friendsListDiv">
            <div className="friendsList">
                <img className="FLFold" alt="Fold" src={fold} /> <h2>Friends</h2> <br />
                <div className="contact"> <p>Spololo</p> <img className="FLFirstIcon" alt="remove" src={remove_friend} /> </div> <br />
                <div className="contact"> <p>Kaltaiid</p> <img className="FLFirstIcon" alt="remove" src={remove_friend} /> </div> <br />
                <div className="contact"> <p>0123456789...</p> <img className="FLFirstIcon" alt="remove" src={remove_friend} /> </div> <br />
                <br /> <br /> <img className="FLFold" alt="Fold" src={fold} /> <h2>Pending Invites</h2> <br />
                <div className="contact"> <p>Spololo</p> </div> <br />
                <div className="contact"> <p>Kaltaiid</p> </div> <br />
                <div className="contact"> <p>0123456789...</p> </div> <br />
                <br /> <br /> <img className="FLFold" alt="Fold" src={fold} /> <h2>Received Invites</h2> <br />
                <div className="contact"> <p>Spololo</p> <img className="FLFirstIcon" alt="validate" src={validate} /> <img className="FLSecondIcon" alt="decline" src={decline} /> </div> <br />
                <div className="contact"> <p>Kaltaiid</p> <img className="FLFirstIcon" alt="validate" src={validate} /> <img className="FLSecondIcon" alt="decline" src={decline} /> </div> <br />
                <div className="contact"> <p>Mr Michel</p> <img className="FLFirstIcon" alt="validate" src={validate} /> <img className="FLSecondIcon" alt="decline" src={decline} />  </div> <br />
            </div>
        </div>
    )
}

export default Friends_list
