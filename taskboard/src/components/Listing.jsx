import React from "react";
function Listing(props){
    return(
        <input
            className={props.className}
            refer={props.refer}
            id={props.index} 
            value={props.value}
            onChange={props.onChange}
            key={props.ckey}
        />
    )
}
export default Listing;
