// import React, { createContext, useReducer } from 'react';

// import { createContext,  useReducer } from "react";
//    export  let Context=   createContext()
 
// const reduser=(state,action)=>{
//   if(action.type==='incre'){
//     return state+1
//   }
//   else{
//     return state
//   }

// }

//      const Todo=({ children })=>{
//         let [state,dispatch]= useReducer(reduser,0)
//       return(<>
//       <Context.Provider value={{state,dispatch}}>
//       { children }
//       </Context.Provider>
//       </>)

//      }

//      export default Todo


// // Initial movie data
// const initialState = {
//   movies: [
//     {
//       id: 1,
//       title: "The Batman",
//       image: "https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       description: "A gritty crime thriller",
//       releaseDate: "2022-03-04"
//     },
//     {
//       id: 2,
//       title: "Spider-Man: No Way Home",
//       image: "https://images.unsplash.com/photo-1500156006176-b65d84d15b87?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       description: "A multiverse adventure",
//       releaseDate: "2021-12-17"
//     }
//     // Add more movies...
//   ]
// };

// // Create a context
// export const MovieContext = createContext();

// // Reducer to manage movie state
// const movieReducer = (state, action) => {
//   switch (action.type) {
//     // Add more cases like ADD_MOVIE, DELETE_MOVIE, etc. in future
//     default:
//       return state;
//   }
// };

// // MovieProvider component to wrap the app
// export const MovieProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(movieReducer, initialState);

//   return (
//     <MovieContext.Provider value={{ state, dispatch }}>
//       {children}
//     </MovieContext.Provider>
//   );
// };






// import React, { createContext, useReducer, useEffect } from 'react';
// import axios from 'axios';

// // Create a context
// export const MovieContext = createContext();

// // Initial state (start with an empty array, will be populated after fetching)
// const initialState = {
//   movies: [],
// };

// // Reducer to manage movie state
// const movieReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_MOVIES':
//       return {
//         ...state,
//         movies: action.payload, // Update movies with fetched data
//       };
//     default:
//       return state;
//   }
// };

// // MovieProvider component to wrap the app
// export const MovieProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(movieReducer, initialState);

//   // Fetch movies from the backend on component mount
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/movies'); // Replace with your backend URL
//         dispatch({ type: 'SET_MOVIES', payload: response.data });
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <MovieContext.Provider value={{ state, dispatch }}>
//       {children}
//     </MovieContext.Provider>
//   );
// };



// import React, { createContext, useReducer, useEffect } from 'react';
// import axios from 'axios';

// // Create a context
// export const MovieContext = createContext();

// // Initial state (including selectedCity state)
// const initialState = {
//   movies: [],
//   selectedCity: '', // New state to store the selected city
// };

// // Reducer to manage movie state
// const movieReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_MOVIES':
//       return {
//         ...state,
//         movies: action.payload, // Update movies with fetched data
//       };
//     case 'SET_SELECTED_CITY':
//       return {
//         ...state,
//         selectedCity: action.payload, // Update selected city
//       };
//     default:
//       return state;
//   }
// };

// // MovieProvider component to wrap the app
// export const MovieProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(movieReducer, initialState);

//   // Fetch movies from the backend on component mount
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/movies'); // Replace with your backend URL
//         dispatch({ type: 'SET_MOVIES', payload: response.data });
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <MovieContext.Provider value={{ state, dispatch }}>
//       {children}
//     </MovieContext.Provider>
//   );
// };




// MovieProvider.js

import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

const initialState = {
  movies: [],
  showtimes: [],  // New state to store showtime data
  selectedCity: '',
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'SET_SHOWTIMES':  // New action for setting showtime data
      return {
        ...state,
        showtimes: action.payload,
      };
    case 'SET_SELECTED_CITY':
      return {
        ...state,
        selectedCity: action.payload,
      };
    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesResponse = await axios.get('http://localhost:8000/movies');
        dispatch({ type: 'SET_MOVIES', payload: moviesResponse.data });

        const showtimesResponse = await axios.get('http://localhost:8000/showtimes'); // Fetch showtimes
        dispatch({ type: 'SET_SHOWTIMES', payload: showtimesResponse.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};









