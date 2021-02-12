
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './navbar.css';


const Navbar = () => {


    const [sectorsOpen, setSectorsOpen] = useState(false);

    const changeFocus = (event) => {
        const elements = document.querySelectorAll("#link_B");
        for (let el of elements) {
            el.style.background = "none";
        }
        event.target.style.background = "linear-gradient(to right bottom, rgba(245, 191, 125, 0.8), rgba(245, 191, 125,0.2))";
    }


    return (
        <div className="navbar-menu">
            <div className="navbar-start">
                <NavLink
                    onClick={changeFocus}
                    className="nav-link"
                    to="/overview"
                    exact
                >
                    <div className="nav-link-text">
                        <p id="link_B">Overview</p>
                        <img id="opened_folder" src="https://img.icons8.com/ios-glyphs/30/000000/news.png" alt="" />
                    </div>
                </NavLink>
                <button className="nav-link" onClick={() => setSectorsOpen(!sectorsOpen)}>
                    <div className="nav-link-text">
                        <p>Sectors</p>
                        <img id="opened_folder" src="https://img.icons8.com/ios-glyphs/30/000000/opened-folder.png" alt="" />
                    </div>

                </button>
                <div id="link_B" className={`${!sectorsOpen && "navbar-item"} ${sectorsOpen && "showSectors"}`}>
                    <NavLink
                        id="link_B"
                        onClick={changeFocus}
                        className="nav-link sector_link"
                        to="/sectors/subsector1"
                    >Sector 1
                </NavLink>
                    <NavLink
                        id="link_B"
                        onClick={changeFocus}
                        className="nav-link sector_link"
                        to="/sectors/subsector2"
                    >Sector 2</NavLink>
                    <NavLink
                        id="link_B"
                        onClick={changeFocus}
                        className="nav-link sector_link"
                        to="/sectors/subsector3"
                    >Sector 3</NavLink>
                </div>

            </div>
        </div>
    );
}

export default Navbar;


