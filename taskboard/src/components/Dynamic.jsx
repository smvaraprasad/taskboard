import React ,{useState, useCallback} from 'react';
import update from 'immutability-helper'
import Adder from './Adder';
import Todo from './Todo';
//import { useId } from "react-id-generator";

import { useDrop } from 'react-dnd';

let id=0;
function Dynamic(){

    function updatetitle(e,newtitle){
        console.log(newtitle," !",e.target.id," ");
        const objlist=todos.map((todo)=>{
            console.log(todo.id," !",e.target.id," ");
            if(todo.id===parseInt(e.target.id))
            {
                console.log("hurray");
                todo.title=newtitle;
            }
            return todo;
        });
        console.log(objlist);
        settodos(objlist);
    }
    function updatelist(e,newlist){
        const objlist=todos.map((todo)=>{
            console.log(todo.id," @",e.target.id);
            if(todo.id===e.target.id)
            {
                console.log("hurray");
                todo.list=newlist;
            }
            return todo;
        });
        settodos(objlist);
    }
    const [todos, settodos]=useState([{
        id:-1,
        key:"-1",
        title:'',
        list:[{key:"69",type:"input",desc:''}]
    }]);   
    function onadd(){
        settodos([...todos,{
            id:id++,
            key:(id*2).toString(),
            title:'',
            list:[{key:"0",type:"input",desc:""}]
        }]);
    }
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: 'Todo',
          drop: () => movetodo(),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
        [null]
    );
    const movetodo = useCallback((dragIndex, hoverIndex) => {
        console.log("movetodo: ",dragIndex,hoverIndex);
        settodos((todos) =>
          update(todos, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, todos[dragIndex]],
            ],
          }),
        )
      }, []);

    return(
        <div id="dynamic"
        >
            
            {todos.map((props,index)=>{
                return(
                    <Todo
                    Forwardref={drop}
                    id={props.id} 
                    orderingindex={index}
                    key={props.key}
                    title={props.title} 
                    list={props.list}
                    listupdater={updatelist}
                    titleupdater={updatetitle}
                    movetodo={movetodo}
                    />
                    );
                })
            }
            
            <Adder handleClick={onadd}/>
        </div>
    ); 
}
export default Dynamic;

