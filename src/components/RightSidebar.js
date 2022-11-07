import React, {useState, useRef} from "react";

import "../styles/RightSidebar.css"

const RightSidebar = (props) => {
    const [inactiveRight, setInactiveRight] = useState(true);

    return(
        <div className={`right-menu ${inactiveRight ? "inactive" : ""}`}>
            <div className='top-section'>
                <div className='logo'>
                    {/* <img src={logo} alt='globe'/> */}
                    {/* <i className="bi bi-globe2"></i> */}
                    
                </div>
                <div onClick={()=> setInactiveRight(!inactiveRight)} className={`toggle-menu-btn ${inactiveRight ? "inactive" : ""}`}>
                    {inactiveRight ? <i className="bi bi-arrow-left-square-fill"></i> : <i className="bi bi-arrow-right-square-fill"></i>}
                </div>
            </div>

            <div className='main-menu'>
                <h3>Actions</h3>
                <ul>
                <li >
                    Edit
                </li>
                <li >
                    Delete
                </li>
                <li >
                    Chat
                </li>

                    
            
                </ul>
            </div>


        </div>
    );
}

export default RightSidebar;