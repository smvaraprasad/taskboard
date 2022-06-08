import React from "react";
let sid=0;
function Listing(props){
    return(
        <input
            className={props.className}
            refer={props.refer}
            id={props.index} 
            value={props.desc}
            onChange={props.onChange}
            key={props.ckey}
        />
    )
}
export default Listing;
