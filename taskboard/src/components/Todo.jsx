import React  from "react";
import {useState} from "react";
import Listing from "./Listing";
function Todo(props){
    //afteruse
    const [sublist,setsublist]=useState({
        id:props.index,
        title:props.title,
        list:props.list});
    function handleChange(e){
        const refer = e.target.getAttribute("refer");
        const value = e.target.value;
        
        if(refer==="subtasks"){
            setsublist({...sublist,
                list:[...sublist.list,
                        {
                            ...sublist.list.map((item)=>{
                                console.log(e.target.getAttribute("ckey"));
                                console.log(e.target.getAttribute("key"));
                                console.log(e.target);
                                if(item.key===e.target.getAttribute("ckey")){
                                    return item;
                                }
                            }),
                        desc:value}
                    ] 
            });
        }
        else{
            setsublist({...sublist,
                title:value 
            });
        }
    }
    function checkEnter(event)
    {

        if(event.keyCode===13)
        {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
        }
//        if(cnt>0){sublists.elements[0].focus()}

    }
    return(
        <div id="todo">
        <form>
            <div id="todo_title">
                <input className="inpt"
                refer="tasktitle"
                onKeyDown={checkEnter} 
                id={props.index} 
                onChange={handleChange} 
                placeholder="enter task title" 
                value={sublist.title}
                
                />
                <button id="editbtn" onClick={props.handleClick}>e</button>
                <button id="editbtn" onClick={props.handleClick}>t</button>
            </div>
            
            {
                sublist.list.map((subtask)=>{return(
                    <div id="todo_lists">
                        <Listing
                            className="inpt"
                            placeholder="list here"
                            refer="subtasks"
                            id={props.index} 
                            ckey={subtask.key}
                            value={subtask.desc}
                            onChange={handleChange}
                        />
                        <button id="editbtn" onClick={props.handleClick}>e</button>
                        <button id="editbtn" onClick={props.handleClick}>d</button>
                    </div>
                )})
            }
            
            {//so we are going to use props
            //to handle the no.of inputs
            //props should contain additionally these...
            //--no. of sub tasks under a title 
            //--this no. will help us to update sublist 
            //or we can use size of list in the props
            //--in this case check enter function must 
            //--do somthing, may be a flag to start list of checkboxes
            //--in that case a prop must be added such that 
            ////note: whatever flag used the change must be in the states
            ////as only then rendereing happens
            ////SUBSTATES------!
            //substates will divide the truth
            //substate shoudl be tried. total cards should be updated
            //only when there is a click outside the box

            }
        </form>
        </div>
    
    );
}
export default Todo;