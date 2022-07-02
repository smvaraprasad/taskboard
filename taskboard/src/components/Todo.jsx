import React  from "react";
import {useState} from "react";
import Listing from "./Listing";
import Adder from "./Adder";
function Todo(props){
    //afteruse
    function listupdater(e,newlist){
        props.listupdater(e,newlist);
    }
    function titleupdater(e,title){
        props.titleupdater(e,title);
    }
    const [sublist,setsublist]=useState({
        id:props.id,
        title:props.title,
        list:props.list});
    
    function additem(e){
        //
        e.preventDefault();
        console.log("triggered");

        const len=(sublist.list.length);
        const key=sublist.list[len-1].key;
        const items=sublist.list[0].desc;
        const item=items.slice();
        sublist.list[0].desc="";
        const listobj={
                        key:(parseInt(key)+1).toString(),
                        type:"text",
                        desc:item };
        sublist.list.push(listobj);
        const obj= {
            id:props.id,
            title:props.title,
            list:sublist.list};
        setsublist(obj);
        
        console.log(sublist.list);
        console.log("adding item");
        console.log("@e.target.ind&props.ind",e.target.ind,"&",props.id);
        e={target:{id:props.id}};
        listupdater(e,sublist.list);
        
    }
    function handleChange(e){
        console.log(e.target);
        console.log("update");
        const values=e.target.value;
        const ckey=e.target.getAttribute("ckey");
        const newlist =sublist.list.map((item)=>{
            if(item.key===ckey)
            {item.desc=values;}
            return item;});

        setsublist({...sublist,
            list: newlist
        });

        listupdater(e,newlist);
        e.preventDefault();
    }
    function checkEnter(event)
    {
        if(event.keyCode===13 )
        {
            additem(event);    
        }
    }
    function movefocus(event){
        if(event.keyCode===13)
        {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }
    console.log("##",sublist);
    return(
        
        <div id="todo" key={props.id}>
        <form>
            <div id="todo_title">
                <input className="inpt"
                refer="tasktitle"
                id={props.id}
                onChange={(e)=>{setsublist({...sublist,title:e.target.value });titleupdater(e,e.target.value)}} 
                placeholder="enter task title" 
                value={sublist.title}
                onKeyDown={movefocus}
                />
                <i className="bi bi-pencil" id="editbtn"></i>
                <i className="bi bi-trash3-fill" id="editbtn"></i>
            </div>
            {
                sublist.list.map((subtask)=>{
                    console.log("#",subtask);
                    return(
                    <div id="todo_lists" key={subtask.key}>
                        <Listing
                            type={subtask.type}
                            className="inpt"
                            placeholder="list here"
                            refer="subtasks"
                            id={props.id} 
                            key={subtask.key}
                            ckey={subtask.key}
                            value={subtask.desc}
                            onChange={handleChange}
                            onKeyDown={checkEnter}
                        />
                        <button id="editbtn" onClick={props.handleClick}>+</button>
                    </div>
                )})
            }
            <Adder text="add item" ind={props.id} handleClick={additem}  />
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