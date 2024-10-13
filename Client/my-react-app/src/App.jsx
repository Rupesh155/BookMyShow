// // App.jsx
// import React from 'react';


// import Navbar from './Components/NavBar';
// import MovieCard from './Components/RecommendedMovies';


// const App = () => {
//   return (
//     <div>
//     <Navbar/>
// <MovieCard/>
//     </div>
//   );
// };

// export default App;



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



// import React from 'react';
// import Navbar from './Components/NavBar';
// import MovieCard from './Components/RecommendedMovies';
// import { MovieProvider } from './Components/MovieContext'; // Import the context provider

// const App = () => {
//   return (
//     <MovieProvider>
//       <div>
//         <Navbar />
//         <MovieCard />
//       </div>
//     </MovieProvider>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieCard from './Components/RecommendedMovies'; // Your movie listing page
import MovieDetails from './Components/MovieDetails'; // The details page
import Navbar from './Components/NavBar';
import TicketBooking from './Components/TicketBooking';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<MovieCard />} /> {/* Home or movie list */}
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* Movie details page */}
        <Route path="/book-ticket/:id" element={<TicketBooking />} />
      </Routes>
    </Router>
  );
}

export default App;




// import React, { useReducer } from 'react'
// const App = () => {

//   function reduser(state,action){
//     if(action.type==='incre'){
//       return state+1
//     }
//     else if(action.type==='decr'){
//       return state-1
//     }
//     else{
//       return state
//     }

//   }
//   let [state,dispatch]=    useReducer(reduser,0)
//   return (
//     <div>
//       <h2> {state}</h2>
//       <button  onClick={()=>{dispatch({type:"incre"})}}>++</button>
//       <button  onClick={()=>{dispatch({type:"decr"})}}>--</button>


//     </div>
//   )
// }

// export default App