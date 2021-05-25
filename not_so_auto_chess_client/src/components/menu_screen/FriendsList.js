import React from 'react'
import "./friends_list.css"

import remove_friend from '../../images/friend_list/remove_friend.png';
import remove_friend_hover from '../../images/friend_list/remove_friend.png';

import add_friend_to_group from '../../images/friend_list/add_friend_to_group.png';
import add_friend_to_group_hover from '../../images/friend_list/add_friend_to_group_hover.png';

import validate from '../../images/friend_list/validate.png';
import validate_hover from '../../images/friend_list/validate_hover.png';
import validate_click from '../../images/friend_list/validate_click.png';
import decline from '../../images/friend_list/decline.png';
import decline_hover from '../../images/friend_list/decline_hover.png';
import decline_click from '../../images/friend_list/decline_click.png';

import fold from '../../images/friend_list/fold.png';

const FriendsList = () => {
    return (
        <div className="friendsListDiv">
            <div className="friendsList">
                <img className="FLFold" alt="Fold" src={fold} />
                <h2>Friends</h2> <br />
                <div className="contact">
                    <p>Spololo</p>
                    <img className="FLFirstIcon" alt="decline" src={add_friend_to_group} />
                    <img className="FLSecondIcon" alt="remove" src={remove_friend} />
                </div>
                <div className="contact">
                    <p>Kaltaiid</p>
                    <img className="FLFirstIcon" alt="decline" src={add_friend_to_group} />
                    <img className="FLSecondIcon" alt="remove" src={remove_friend} />
                </div>
                <div className="contact">
                    <p>0123456789...</p>
                    <img className="FLFirstIcon" alt="decline" src={add_friend_to_group} />
                    <img className="FLSecondIcon" alt="remove" src={remove_friend} />
                </div>
                <div className="contact">
                    <p>Mr. Michel</p>
                    <img className="FLFirstIcon" alt="decline" src={add_friend_to_group} />
                    <img className="FLSecondIcon" alt="remove" src={remove_friend} />
                </div>
                <br /> <br /> <img className="FLFold" alt="Fold" src={fold} />
                <h2>Pending Invites</h2> <br />
                <div className="contact">
                    <p>Spololo</p>
                </div> <br />
                <div className="contact">
                    <p>Kaltaiid</p>
                </div> <br />
                <div className="contact">
                    <p>0123456789...</p>
                </div>
                <br /> <br /> <img className="FLFold" alt="Fold" src={fold} />
                <h2>Received Invites</h2> <br />
                <div className="contact">
                    <p>Spololo</p>
                    <img className="FLFirstIcon" alt="validate" src={validate} />
                    <img className="FLSecondIcon" alt="decline" src={decline} />
                </div>
                <div className="contact">
                    <p>Kaltaiid</p>
                    <img className="FLFirstIcon" alt="validate" src={validate} />
                    <img className="FLSecondIcon" alt="decline" src={decline} />
                </div>
                <div className="contact">
                    <p>Cyrellema</p>
                    <img className="FLFirstIcon" alt="validate" src={validate} />
                    <img className="FLSecondIcon" alt="decline" src={decline} />
                </div>
                <div className="contact">
                    <p>Chouyoux</p>
                    <img className="FLFirstIcon" alt="validate" src={validate} />
                    <img className="FLSecondIcon" alt="decline" src={decline} />
                </div>
                <div className="contact">
                    <p>Mr. Michel</p>
                    <img className="FLFirstIcon" alt="validate" src={validate} />
                    <img className="FLSecondIcon" alt="decline" src={decline} />
                </div>
            </div>
        </div>
    )
}

export default FriendsList
