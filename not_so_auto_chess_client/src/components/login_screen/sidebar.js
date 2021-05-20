import logo from '../../images/login_screen/logo.png';
import React from 'react'
import './sidebar.css';

const sidebar = () => {
    return (
        <div className="sidebar">
            <img src={logo} onDragStart={(event) => {event.preventDefault();}} className="App-logo selectDisable" alt="logo" />
            <h1>Not So Auto Chess</h1>
            <h2>For Frodo !</h2>
        </div>
    )
}

export default sidebar
