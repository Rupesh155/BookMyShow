import React, { useContext } from 'react'
import { context } from './ContextAnu'

const Todo = () => {
 let {arrData}=    useContext(context)

  return (
    <div>
          {
        arrData.map((val,id)=>{
          return(<>
          <li>{val}</li>
       
          </>)
        })
      }
    </div>
  )
}

export default Todo