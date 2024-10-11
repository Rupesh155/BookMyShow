// App.jsx
import React from 'react';


import Navbar from './Components/NavBar';
import MovieCard from './Components/RecommendedMovies';


const App = () => {
  return (
    <div>
    <Navbar/>
<MovieCard/>
    </div>
  );
};

export default App;



// import React, { useState } from 'react'

// const App = () => {
//   let [data,SetData]=useState('none')
//   return (
//     <div>
//       <button  onClick={()=>SetData('block')}>click</button>
//       <div     style={{display:data}} id='card'>
//         <input  type='text'  />
//         <input  type='number'  />

//       </div>
//     </div>
//   )
// }

// export default App

// Math.floor( 100000+  Math.random()*900000)
