
import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import './navbar.css';


const Navbar = () => {

    const [isOpen, setOpen] = useState(false);
    const [sectorsOpen, setSectorsOpen] = useState(false);


    return (
        <div className="navbar-menu">
            <div className="navbar-start">
                <NavLink
                    className="nav-link"
                    to="/overview"
                    exact
                >
                    <div className="nav-link-text">
                    
                    <p>Overview</p>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/news.png"/>
                    </div>
                    
                    
                </NavLink>
                <button className="nav-link" onClick={() => setSectorsOpen(!sectorsOpen)}>
                <div className="nav-link-text">
                
                    <p>Sectors</p>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/opened-folder.png"/>
                    </div>
                
                    </button>
                <div className={`${!sectorsOpen && "navbar-item"} ${sectorsOpen && "showSectors"}`}>
                <NavLink
                        className="nav-link sector_link"
                        to="/sectors/subsector1"
                    >Sector1
                </NavLink>
                    <NavLink
                        className="nav-link sector_link"
                        to="/sectors/subsector2"
                    >Sector2</NavLink>
                    <NavLink
                        className="nav-link sector_link"
                        to="/sectors/subsector3"
                    >Sector3</NavLink>
                </div>

            </div>
        </div>
    );
}

export default Navbar;


