import React from 'react';
import logo from '../assets/FlightotechLogo.JPG';
import '../styles/header.css';

const Header = () => {
    return (
        <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#020e36', padding: '5px 10px', zIndex: '10' }}>
            <img src={logo} alt="Logo"/>
        </header>
    );
};

export default Header;
