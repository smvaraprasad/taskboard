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
            console.log("not text00");
            return (<input
                type={props.type}
                className={props.className}
                refer={props.refer}
                id={props.index}
                onChange={props.onChange}
                value={props.value}
                key={props.ckey}
                ckey={props.ckey}
                onKeyDown={props.onKeyDown}
            />)
        }
        
        
        

}
export default Listing;
