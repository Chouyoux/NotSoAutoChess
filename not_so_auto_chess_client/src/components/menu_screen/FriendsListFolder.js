import React, {useState} from 'react';

import fold_open from '../../images/friend_list/fold_open.png';
import fold_close from '../../images/friend_list/fold_close.png';

const FriendsListFolder = ( { title, elements } ) => {

    const [open, setOpen] = useState(true);

    return (
        <div>
            
            <div
                className="FLFolder selectDisable" 
                onClick={() => {setOpen(!open);}}
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
            >
                <img
                    className="FLFold"
                    alt="Fold"
                    src={open ? fold_open : fold_close}
                />
                <h2 className="friendsListFolderTitle" >{title}</h2>
            </div>
            {open ? elements : null}
            <br />

        </div>
    )
}

export default FriendsListFolder
