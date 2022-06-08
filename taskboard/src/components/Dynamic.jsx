import React ,{useState} from 'react';
import Adder from './Adder';
import Todo from './Todo';
//import { useId } from "react-id-generator";

let id=0;
function Dynamic(){
    const [todos, settodos]=useState([{
        id:-1,
        key:"-1",
        title:'',
        list:[{key:"69",desc:''}]
    }]);
    /*function titleadd(e){
        let obj=todos.map((todo)=>
        {   
            if(todo.id===e.target.id)
            {
                return({...todo,title:e.target.value});
            }
            return null;
        });
        var i=0;
        while(obj[i]===null)
        {
            i++;
        }
        console.log(e.target.id);
        console.log(obj);
        //settodos([...todos,obj[i]]);
    }*/
    function onadd(){
        settodos([...todos,{
            id:id++,
            key:id*2,
            title:'',
            list:[{subid:'0',desc:'0'}]
        }]);
    }
    return(
        <div id="dynamic">
            
            {todos.map((props)=>{
                return(
                    <Todo 
                    index={props.id} 
                    key={props.key}
                    title={props.title} 
                    list={props.list} 
                    />
                    );
                })
            }
            
            <Adder handleClick={onadd}/>
        </div>
    );
}
export default Dynamic;

