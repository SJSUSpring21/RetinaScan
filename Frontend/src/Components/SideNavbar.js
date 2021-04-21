import React from 'react';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';
import './SideNavbar.css';
import { SideNavbarData } from './SideNavbarData';

function SideNavbar() {
    return (
        
        <div className="SideNavbar">
            
            <ul className="SideNavbarList">
            { SideNavbarData.map((val, key) => {
            return (
                
                <li className="SideNavbarRows"
                key = {key}
                id = {window.location.pathname == val.link ? "active" : ""}
                
                onClick={() =>{
                    window.location.pathname=val.link
                }}
                > 
                
                
                <div id="navIcons">{val.icon}</div>  
                <div id="navTitles">{val.title}</div>
                
                </li>
                
                
            );
            })}
            </ul>
        </div>
    );
}

export default withRouter(SideNavbar)
