import React  from "react";
import {useState} from "react";
import Listing from "./Listing";
import Adder from "./Adder";
function Todo(props){
    //afteruse
    const [sublist,setsublist]=useState({
        id:props.id,
        title:props.title,
        list:props.list});
    //
    function handleChange(e){
        const values=e.target.value;
        const newlist =sublist.list.map((item)=>{
            console.log("item key:",item.key);//
            console.log("event key:",e.target.getAttribute("key"));//
            if(item.key!==e.target.getAttribute("key"))
            {item.desc=values;}
            return item;});

        setsublist({...sublist,
            list: newlist
        });
        e.preventDefault();
    }
    function checkEnter(event)
    {
        if(event.keyCode===13 )
        {
            if(1)
            {
                console.log("enterd");
                setsublist({...sublist,
                    list:[...sublist.list,
                        {
                            key: sublist.list[sublist.list.size()-1].key+"1",
                            desc: ""
                        }] 
                });
                event.preventDefault();
            }
            else
            {
                const form = event.target.form;
                const index = [...form].indexOf(event.target);
                form.elements[index + 1].focus();
                event.preventDefault();
            }
            
        }
    }
    return(
        <div id="todo" key={props.id}>
        <form>
            <div id="todo_title">
                <input className="inpt"
                refer="tasktitle"
                //onKeyDown={checkEnter} 
                id={props.id}
                onChange={(e)=>{setsublist({...sublist,title:e.target.value })}} 
                placeholder="enter task title" 
                value={sublist.title}
                
                />
                <button id="editbtn" onClick={props.handleClick}>e</button>
                <button id="editbtn" onClick={props.handleClick}>t</button>
            </div>
            {
                sublist.list.map((subtask)=>{
                    console.log("#",subtask);
                    return(
                    <div id="todo_lists" key={subtask.key}>
                        <Listing
                            className="inpt"
                            placeholder="list here"
                            refer="subtasks"
                            id={props.id} 
                            key={subtask.key}
                            ckey={subtask.key}
                            value={subtask.desc}
                            onChange={(e)=>{handleChange(e)}}
                            onKeyDown={checkEnter}
                        />
                        <button id="editbtn" onClick={props.handleClick}>e</button>
                        <button id="editbtn" onClick={props.handleClick}>d</button>
                    </div>
                )})
            }
            <Adder/>
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