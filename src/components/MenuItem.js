import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

/**
 * @author
 * @function
 */

const MenuItem = (props) => {
    const { name, subMenus, iconClassName, onClick, to, end, primeMenu, menuMapping, menuItems, iconMapping } = props;
    const [ expand, setExpanded] = useState(false);
    
    return (
         <li onClick={props.onClick}> 
            
            {menuItems.length > 1 ? 
                (<NavLink end to={ menuMapping[menuItems[0][0].name] ? menuMapping[menuItems[0][0].name] : '/' } onClick={()  => setExpanded(!expand)} className='menu-item'>
                    <div className='menu-icon'>
                        <i className={ iconMapping[menuItems[0][0].name] ? iconMapping[menuItems[0][0].name] : 'bi bi-speedometer2' }></i>
                    </div>
                    <span>{menuItems[0][0].name}</span>
                </NavLink>)
                : 
                (<NavLink end to={ menuMapping[menuItems[0].name] ? menuMapping[menuItems[0].name] : '/' } onClick={()  => setExpanded(!expand)} className='menu-item'>
                    <div className='menu-icon'>
                        <i className={ iconMapping[menuItems[0].name] ? iconMapping[menuItems[0].name] : 'bi bi-speedometer2' }></i>
                    </div>
                    <span>{menuItems[0].name}</span>
                </NavLink>)
                }

                
                {menuItems.length > 1 ? (
                    <ul className={`sub-menu ${expand ? "active" : ""}`}>
                        {menuItems.map((menu, index) => (
                            menu.map((me, ind)=>(
                                me.sub == '' ? null :
                                <li key={index}>
                                    <NavLink end to={ menuMapping[me.sub] ? menuMapping[me.sub] : '/' }> {me.sub} </NavLink>
                                </li>
                            ))
                            //menu.shift();
                            

                            // <li key={index}>
                            //     <NavLink to={ menuMapping[menu.sub] ? menuMapping[menu.sub] : '/' }> {menu.sub} </NavLink>
                            // </li>
                        ))}
                    </ul> 
                ) : null }

            {/* // <NavLink end to={ to } onClick={()  => setExpanded(!expand)} className='menu-item'>
            //     <div className='menu-icon'>
            //         <i className={iconClassName}></i>
            //     </div>
            //     <span>{name}</span>
            // </NavLink>
            // {subMenus && subMenus.length > 0 ? (
            //     <ul className={`sub-menu ${expand ? "active" : ""}`}>
            //         {subMenus.map((menu, index) => (
            //             <li key={index}>
            //                 <NavLink to={ menu.to }> {menu.name} </NavLink>
            //             </li>
            //         ))}
            //     </ul> 
            // ) : null } */}
        </li> 
    );
};

export default MenuItem;