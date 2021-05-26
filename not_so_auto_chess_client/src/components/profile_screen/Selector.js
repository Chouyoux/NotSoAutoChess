import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import './selector.css';

const Selector = ({ imgSet, current, title, Choose }) => {

    const [enabled, setEnabled] = useState(false);

    const selectorTransition = useTransition(enabled, {
        from : { opacity: 0  },
        enter : { opacity: 1 },
        leave: { opacity: 0 }
    });

    return (
        <div className="selector">

            <img
                className="selectorImg selectDisable"
                onDragStart={(event) => { event.preventDefault(); }}
                unselectable="on"
                src={imgSet[current]}
                alt={title}
                onClick={() => {setEnabled(!enabled)}}
            />
            {selectorTransition((style, item) =>
                item ?
                <animated.div
                    className="selectorFull"
                    style={style}
                    onClick={() => {setEnabled(!enabled)}}
                > 
                
                {
                    imgSet.map((img, index) => 

                        <img
                            className="selectorFullImg selectDisable"
                            onDragStart={(event) => { event.preventDefault(); }}
                            unselectable="on"
                            src={img}
                            alt={title}
                            onClick={() => {Choose(index)}}
                        />

                    )
                }

                </animated.div> : null
            )}

        </div>
    )
}

export default Selector
