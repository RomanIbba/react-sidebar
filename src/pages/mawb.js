import { useParams, useLocation } from "react-router-dom";
import "../styles/mawb.css"
import Accordion from "../components/Accordion";
import RightSidebar from "../components/RightSidebar";

const MAWB = () => {
    const {mawb} = useParams()
    const location = useLocation();
    const data = location.state;
    console.log(data)
    return(
        <div>
            <h1>MAWB: {mawb}</h1>
            <h2>
                Order ID<input className="mawb-top" defaultValue={data.id}></input> MAWB<input className="mawb-top" defaultValue={data.mawb}></input> Status<input className="mawb-top" defaultValue={data.customs_status}></input>
            </h2>
            

            <div className="">
                <Accordion 
                    title="Carriers "
                    data={data}
                />
                <Accordion 
                    title="Parties"
                    data={data}
                />
                <Accordion 
                    title="Customs"
                    data={data}
                />
                <Accordion 
                    title="Notes"
                    data={data}
                />
            </div>

            {/* <RightSidebar /> */}

        </div>
        
    ); 
};

export default MAWB