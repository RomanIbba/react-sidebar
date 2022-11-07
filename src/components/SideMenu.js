import React, { useEffect, useState } from 'react';
import axios from "axios";
import logo from '../assets/logo/globe_sm.png';
import user from '../assets/spacesloth.jpg';

import MenuItem from './MenuItem'

/**
 * @author
 * @function SideMenu
 */

const menuItems = [
    { name: "Dashboard", exact: true,  to: "/", iconClassName: "bi bi-speedometer2"},
    {
        name: "Content",
        exact: true,
        to: `/Posts`,
        iconClassName: "bi bi-newspaper",
        subMenus: [{ name: "Courses", to: "/Posts/ListPosts"}, {name: "Videos", to: "/Posts/CreatePosts"} ],
    },
    {
        name: "MyAccount",
        exact: true,
        to: `/MyAccount`,
        iconClassName: "bi bi-newspaper",
        subMenus: [{ name: "MyWorkspace", to: "/MyAccount/MyWorkspace"}, {name: "MyProfile", to: "/MyAccount/MyProfile"} ],
    },
    { name: "Plans", to: `/FAQ`, iconClassName: "bi bi-vector-pen"},
];

const iconMapping = {
    "Home": "bi bi-speedometer2",
    "Solutions":"bi bi-newspaper",
    "About Us":"bi bi-vector-pen",
    "Contact Us":"bi bi-phone-vibrate",
    "FAQ":"bi bi-patch-question",
    "Posts":"bi bi-signpost-split",
    "List Posts":"bi bi-signpost-split",
    "Create Posts":"bi bi-signpost-split",
    "My Account":"bi bi-person-lines-fill",
    "My Workspace":"bi bi-person-lines-fill",
    "My Profile":"bi bi-person-lines-fill",
}

const menuMapping = {
    "Home": "/",
    "Solutions":"/plans",
    "About Us":"/AboutUs",
    "Contact Us":"/ContactUs",
    "FAQ":"/FAQ",
    "Posts":"/Posts",
    "List Posts":"/Posts/ListPosts",
    "Create Posts":"/Posts/CreatePosts",
    "My Account":"/MyAccount",
    "My Workspace":"/MyAccount/MyWorkspace",
    "My Profile":"/MyAccount/MyProfile",
}

const SideMenu = (props) => {
    const [inactive, setInactive] = useState(false);
    const [primeMenu, setPrimeMenu] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(inactive){
            document.querySelectorAll('.sub-menu').forEach((el) => {
                el.classList.remove("active");
            });
        }

        props.onCollapse(inactive);

    }, [inactive]);

    useEffect(() => {
        axios.get('./ajaxfiles/menus.php')
            .then((response) => {
                setPrimeMenu(response.data.menus);
                // console.log(response.data.menus)
            }) 
            .catch((error) => {
                setErrorMessage(error.message);
                console.log('There was an error! ', errorMessage);
            });
    }, []);


    var m = [];
    const createSub = (primeMenu) => {
        for(let i = 0; i < primeMenu.length; ){
            let temp = i + 1;
            if(temp >= primeMenu.length){
                console.log("reached end")
            }
            if(primeMenu[i].sub == '' && primeMenu[temp].sub == ''){
                let mainM = [primeMenu[i]];
                m.push(mainM);
                i++;
            }
            else{
                let sm = [];
                let subM = [primeMenu[i]];
                sm.push(subM);
                i++;
                while(  i < primeMenu.length && primeMenu[i].sub != ''){
                    subM = [primeMenu[i]];
                    sm.push(subM);
                    i++;
                }
                m.push(sm);
            }
        }
        // console.log(m)
    }
    createSub(primeMenu);

    return(
        <div className={`side-menu ${inactive ? "inactive" : ""}`}>
            <div className='top-section'>
                <div className='logo'>
                    {/* <img src={logo} alt='globe'/> */}
                    <i className="bi bi-globe2"></i>
                </div>
                <div onClick={()=> setInactive(!inactive)} className={`toggle-menu-btn ${inactive ? "inactive" : ""}`}>
                    {inactive ? <i className="bi bi-arrow-right-square-fill"></i> : <i className="bi bi-arrow-left-square-fill"></i>}
                </div>
            </div>

            {/* <div className='search-controller'>
                <button className='search-btn'>
                    <i className="bi bi-search"></i>
                </button>
                <input type="text" placeholder='search'></input>
            </div>

            <div className='divider'></div> */}

            <div className='main-menu'>
                <h3>Menu</h3>
                <ul>
                    {/* { menuItems.map((menuItems, index) => (
                        <MenuItem
                            key={index}
                            name={menuItems.name}
                            end={menuItems.exact}
                            to={menuItems.to}
                            subMenus={menuItems.subMenus || []}
                            iconClassName={menuItems.iconClassName}
                            onClick={() => {
                                if(inactive){
                                    setInactive(false);
                                }

                            }}
                        />
                    ))} */}

                    { m.map((menuItems, index) => (
                        <MenuItem
                            menuItems = {menuItems}
                            // primeMenu = {primeMenu}
                            menuMapping = {menuMapping}
                            iconMapping = {iconMapping}
                            onClick={() => {
                                if(inactive){
                                    setInactive(false);
                                }

                            }}
                        />
                    ))}
            
                </ul>
            </div>

            <div className='side-menu-footer'>
                <div className='avatar'>
                    <img src={user} alt="user" />
                </div>
                <div className='user-info'>
                    <h5>Roman Ibba</h5>
                    <p>ro@yahoo.com</p>
                </div>
            </div>
        </div>
    )
};

export default SideMenu;