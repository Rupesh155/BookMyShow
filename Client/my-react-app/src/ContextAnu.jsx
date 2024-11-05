import { createContext, useReducer } from "react";
 
export   let context=   createContext()

let data={
    input:'',
    arrData:[]
}
function reduser(state,action){
    if(action.type==='addIn'){
        return {
            ...state,
            input:action.payload
        }
        

    }
    else if(action.type==='addTodo'){
        return{
            ...state,
            arrData:[...state.arrData,action.payload],
            input:''
        }
    }
    else{
        return state
    }


}

function ContextP(  {children}){
  let [state,dispatch] =     useReducer(reduser,data)
    return(
        <context.Provider value={{input:state.input,arrData:state.arrData,dispatch}}>
           {children}
        </context.Provider>
    )

}

export default ContextP