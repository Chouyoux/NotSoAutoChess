import React, { useState } from 'react'

import remove_friend from '../../../images/friend_list/remove_friend.png';
import remove_friend_hover from '../../../images/friend_list/remove_friend_hover.png';

import add_friend_to_group from '../../../images/friend_list/add_friend_to_group.png';
import add_friend_to_group_hover from '../../../images/friend_list/add_friend_to_group_hover.png';

const Friend = ( {online, name, index, onRemove, onInvite} ) => {

    const [removeFriendIcon, setRemoveFriendIcon] = useState(remove_friend);
    const [addFriendToGroupIcon, setAddFriendToGroupIcon] = useState(add_friend_to_group);

    return (
        <div className="contact" key={index}>

            <p className={online ? "online" : "offline"}>{name.length > 9 ? name.substring(0, 8)+"..." : name}</p>
            
            {
                online ?
                <img
                className="FLFirstIcon selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                alt="add_group"
                src={addFriendToGroupIcon}
                onClick={() => {setAddFriendToGroupIcon(add_friend_to_group);}}
                onMouseOver={() => {setAddFriendToGroupIcon(add_friend_to_group_hover);}}
                onMouseOut={() => {setAddFriendToGroupIcon(add_friend_to_group);}}
                onClick={() => {setAddFriendToGroupIcon(add_friend_to_group);}}
                onClick={() => {onInvite(name);}}
                />
                : null
            }
            
            <img
                className={(online ? "FLSecondIcon" : "FLFirstIcon")+" selectDisable"}
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                alt="remove"
                src={removeFriendIcon}
                onClick={() => {setRemoveFriendIcon(remove_friend);}}
                onMouseOver={() => {setRemoveFriendIcon(remove_friend_hover);}}
                onMouseOut={() => {setRemoveFriendIcon(remove_friend);}}
                onClick={() => {onRemove(name);}}
            />
        </div>
    )
}

export default Friend
