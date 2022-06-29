import React from 'react';
function Adder(props){
    const id =props.text==="add item"?"itemadder":"adder";
    return(
        <button id={id} ind={props.ind} onClick={props.handleClick}>
            + Add new list
        </button>
    );
}
export default Adder;