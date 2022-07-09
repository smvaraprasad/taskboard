import React  from "react";
import { useDrag } from 'react-dnd';
import {useState, useRef} from "react";
import Listing from "./Listing";
import Adder from "./Adder";
import {useDrop} from 'react-dnd';

function Todo(props){
    //afteruse
    const index=props.orderingindex;
    const id=props.id;
    
    const [{ isDragging }, drag] = useDrag({
      type:'Todo',
      item: () => {
        return { id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
    const ref = useRef(null);
    const [{ handlerId, isOver }, drop] = useDrop({
      accept: 'Todo',
      collect(monitor) {
        return {

          handlerId: monitor.getHandlerId(),
          isOver: !!monitor.isOver()
        }
      },
      hover(item, monitor) {
        console.log(item);
        const dragIndex = item.index;
        const hoverIndex = index;
        console.log("d and h ",dragIndex," ", hoverIndex);
        console.log(ref);
        if (!ref.current) {
          return
        }
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect()
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        props.movetodo(dragIndex, hoverIndex);
        item.index = hoverIndex
      },
    });
    drag(drop(ref));
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
    //console.log("##",sublist);
    return(
        
        <div 
        ref={drop}
        style={{
            position: 'relative'
        }}

        >

        <form id="todo" key={props.id} 
        index={props.orderingindex}
        ref={ref}
        style={{
        opacity: isDragging ? 0 : 1,
        cursor: 'move',
        }}>
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
                    //console.log("#",subtask);
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
            
        </form>
        </div>
    
    );
}
export default Todo;