import React from 'react';
function Adder(props){
    return(
        <button id="adder" onClick={props.handleClick}>
            + Add new list
        </button>
    );
}
export default Adder;