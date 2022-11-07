import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import '../styles/plans.css';
import Modal from '../components/modal'
import Grid from '../components/Grid'
import { NavLink, Outlet } from "react-router-dom";
import RightSidebar from "../components/RightSidebar";

import MenuItem from '../components/MenuItem'
const menuItems = [
    { name: "Dashboard", exact: true,  to: "/", iconClassName: "bi bi-speedometer2"},
];

const Plans = (props) => {
    const [inactivePlans, setInactivePlans] = useState(false);
    const [inactiveAllPlans, setInactiveAllPlans] = useState(false);
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [gridApi, setGridApi] = useState(null);
    const [addPlan, setAddPlan] = useState(false);
    const [editPlan, setEditPlan] = useState(false);
    const [deletePlan, setDeletePlan] = useState(false);
    const [inactiveMawb, setInactiveMawb] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [plansCount, setPlansCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    let pagination = {
        "page": pageNumber,
        "rows": rowsPerPage
    }
    

    const defaultColDef = {
        sortable:true,
        editable:true,
        flex:1,filter:true,
        floatingFilter:true
    }
    

    const datasource = {
        getRows(params) {
            //console.log(JSON.stringify(params.request, null, 1));
            const {startRow, endRow} = params.request
            //console.log(params.request)
            let url=`./ajaxfiles/plans.php?start=${startRow}&end=${endRow}`;
            // url+=`?start=${startRow}&end=${endRow}`;
            axios.get(url)
            .then((response) => {
                setPosts(response.data.plans);
                //console.log(response.data.plans);
                params.successCallback(response.data.plans,205);
                //console.log(params);
            }) 
            .catch((error) => {
                setErrorMessage(error.message);
                //console.log('There was an error! ', error.message);
            });
        }
    };

    const onGridReady = (params) => {
        // axios.get('./ajaxfiles/plans.php').then(resp=>resp.data.plans)
        // .then(resp=>console.log(resp))
        // .then(resp=>params.applyTransaction({add:resp}))
        setGridApi(params);
        // register datasource with the grid
        params.api.setServerSideDatasource(datasource);
    }

    useEffect(() => {
        getPlans();
    }, []);

    const handleKeypress = (e) => {
        if(e.key === 'Enter'){
            getPlans();
        }
    }
    const handleChange = (e) => {
        setPageNumber(e.target.value)
    }
    const getPlans = () => {
        // let url = './ajaxfiles/plans.php';
        // url += 'pageNumber='+pageNumber;
        // url += 'rowsPerPage='+rowsPerPage
        let url=`./ajaxfiles/plans.php?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`
        axios.get(url)
            .then((response) => {
                setPosts(response.data.plans);
                setPlansCount(response.data.count);
                console.log(response.data.plans)
            }) 
            .catch((error) => {
                setErrorMessage(error.message);
                console.log('There was an error! ', errorMessage);
            });
    };

    return (
        <div className="contents">
            <div className={`plans-menu ${inactivePlans ? "inactive" : ""} ${inactiveAllPlans ? "inactiveall" : ""} `}>
                <div className='top-section'>
                    <div className='topleft'>
                        <span>MAWBs /</span><span>HAWBs /</span><span> Products</span>
                    </div>
                    <div onClick={()=> setInactivePlans(!inactivePlans)} className={`toggle-menu-btn ${inactivePlans ? "inactive" : ""}`}>
                        {inactivePlans ? <i className="bi bi-arrow-right-square-fill"></i> : <i className="bi bi-arrow-left-square-fill"></i>}
                    </div>
                </div>

                <div className='search-controller'>
                    <button className='search-btn'>
                        <i className="bi bi-search"></i>
                    </button>
                    <input type="text" placeholder='search'></input>
                </div>

                <div className='divider'></div>

                <div className='main-menu'>
                    <h3 className={`${inactivePlans ? "" : "addSection"}`} >Plans
                        <button onClick={()=>setAddPlan(true)}><i className="bi bi-plus-lg"></i>Plan</button>
                    </h3>

                    <div className={` ${inactiveAllPlans ? "inactive" : ""}`}>
                        <div onClick={()=> setInactiveAllPlans(!inactiveAllPlans)} className={`toggle-allplans-btn ${inactiveAllPlans ? "inactive" : ""}`}>
                           Show All Plans Grid 
                            {inactiveAllPlans ?<i className="bi bi-arrow-left-square-fill"></i> : <i className="bi bi-arrow-right-square-fill"></i>}
                        </div>
                    </div>

                    <div className="pagination-arrows">
                        
                        <h3>
                            <i className="bi bi-skip-start"></i>
                            <i  className="bi bi-caret-left"></i>
                            Page <input className="page-number" value={pageNumber} onChange={handleChange} onKeyPress={handleKeypress}></input> of {Math.ceil(plansCount/rowsPerPage)}
                            <i  className="bi bi-caret-right"></i>
                            <i  className="bi bi-skip-end"></i>
                        </h3>
                        {/*  of {plansCount/rowsPerPage}</h3> */}
                        
                    </div>

                    <div className={`show-allplans ${inactiveAllPlans ? "" : "inactive"}`}>
                        <Grid  posts={posts}/>
                    </div>
                    

                    <Modal 
                        showAddModal={addPlan} setShowAddModal={setAddPlan}
                        showEditModal={editPlan} setShowEditModal={setEditPlan}
                        showDeleteModal={deletePlan} setShowDeleteModal={setDeletePlan}
                    ></Modal>   

                    <div className={`show-allplans ${inactiveAllPlans ? "inactive" : ""}`}>
                        <ul>
                            {posts.map((post, index) => (
                                <li > 
                                    <NavLink end to={`/plans/${post.mawb}`} className='menu-item' state={post}>
                                        <div className='menu-icon'>
                                            <i className='bi bi-file-earmark-code-fill'></i>
                                        </div>
                                        <div className="menu-item-content">
                                            <a>{post.id}  -  {post.mawb} </a><br></br>
                                            <a>{post.created_at.substr(5, 2)}/{post.created_at.substr(8, 2)}, {post.flight_no}, {post.port_of_lading}/{post.port_of_unlading}</a>
                                        </div>
                                        <div className="next-page">
                                            <i class="bi bi-box-arrow-in-right"></i>
                                        </div>
                                        
                                    </NavLink>
                                </li> 
                            ))}
                        </ul>
                    </div> 
                </div>     
            </div>   
            <div className={`container-mawb ${inactivePlans ? "inactive" : ""}`}>
                <Outlet />
            </div>

            <RightSidebar />
        </div>
    );
};

export default Plans