import React from 'react';
import './header.css';


const Header = (props) => {



    return (<div className="header_container">
        <div className="header">
            <img src="https://i.imgur.com/WWGz8jr.png" alt="wood logo" id="img" />
            {props.render}
        </div>
        
    </div>)

}

export default Header;