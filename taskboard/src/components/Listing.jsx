import React from "react";
function Listing(props){
    
        if(props.type==="text")
        {
            return (<p
                className={props.className}
                refer={props.refer}
                id={props.index}
                key={props.ckey}
                >{props.value}</p>);
        }
        else{
            return (<input
                type={props.type}
                className={props.className}
                refer={props.refer}
                id={props.index}
                onChange={props.onChange}
                value={props.value}
                key={props.ckey}
            />)
        }
        
        
        

}
export default Listing;
