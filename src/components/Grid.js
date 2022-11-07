import React, { useState} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-balham.css';
//import { Grid as GridDHX, DataCollection } from "grid_gpl";

const Grid = (props) => {
    const { posts } = props;

    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Plan ID", field: "id", checkboxSelection:true},
        { headerName: "MAWB", field: "mawb"},
        { headerName: "C/nor", field: "consignor"},
        { headerName: "Airl. Code", field: "carrier"},
        { headerName: "Flight No.", field: "flight_no"},
        { headerName: "Origin", field: "port_of_lading"},
        { headerName: "E.T.D", field: "arrival_date"},
        { headerName: "Dest.", field: "port_of_unlading"},
        { headerName: "E.T.A", field: "arrival_date"},
        { headerName: "Trucking Co. Name", field: "fwdr_trucking_name"},
        { headerName: "Total RCPTs", field: "total_receptacles"},
        { headerName: "Total Parcels", field: "total_pieces"},
        { headerName: "Weight(KG)", field: "total_weight"},
        { headerName: "Value USD$", field: "total_value"},
        { headerName: "Created At", field: "created_at"},
        { headerName: "Last Mile", field: "last_mile_courier"},
        { headerName: "Last Mile Manifest Submitted", field: "last_mile_received_date"},
        { headerName: "BUP", field: "carrier_confirmed"},
        { headerName: "Plan Status", field: "current_process_status"},
        { headerName: "Split", field: "split_status"},
        { headerName: "Filing Type", field: "mawb_type"},
        { headerName: "AMS Proxy", field: "import_customs"},
        { headerName: "AMS Status", field: "customs_status"},
        { headerName: "Query Type", field: "userid"},
        { headerName: "UPD Reason", field: "action"},
        { headerName: "Remote Filing", field: "remote_filing"},
        { headerName: "Plan Owner", field: "userid"},
        { headerName: "Note", field: "description"},
        // { headerName: "User Id", field: "userid"},
    ]);

    // const [rowData, setRowData] = useState([
    //     {
    //         "id": "1",
    //         "mawb": "12121"
    //     },
    //     {
    //         "id": "2",
    //         "mawb": "55555"
    //     },
    // ]);

    const defaultColDef={
        sortable:true, editable:true, filter:false
    }

    return(
        <div className="ag-theme-balham" style={{height:'70vh', width:'80vw'}}>
            <AgGridReact
                rowData={posts}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />

        </div>
    );
}

export default Grid;