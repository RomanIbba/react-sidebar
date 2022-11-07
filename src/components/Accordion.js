import React, {useState, useRef} from "react";

import "../styles/Accordion.css"

const Accordion = (props) => {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");
    const { data } = props;

    const content = useRef(null);

    function toggleAccordion(){
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive === "active" ? "accordion__icon" : "accordion__icon rotate")
    }


    return(
        <div className="accordion__section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <p className={`${setRotate}`} width={10} fill={"#777"}><i className="bi bi-chevron-right"></i> </p> {props.title}
            </button>
            <div ref={content} style={{maxHeight: `${setHeight}`}}className="accordion__content">
                Order ID<input className="mawb-top" defaultValue={data.id}></input> 
                MAWB<input className="mawb-top" defaultValue={data.mawb}></input> 
                Status<input className="mawb-top" defaultValue={data.customs_status}></input>
                {/* <div 
                    className="accordion__text"
                    dangerouslySetInnerHTML={{__html: props.content}}
                /> */}
            </div>
        </div>
    );
}

export default Accordion;