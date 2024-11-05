

// import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { MovieContext } from './MovieContext';
// import './MovieDetails.css'
// const MovieDetails = () => {
//   const { id } = useParams(); // Get the movie id from the route
//   const { state } = useContext(MovieContext); // Access movies from context
//   const { movies } = state;

//   // Find the movie with the matching ID
//   const movie = movies.find((movie) => movie.id === parseInt(id));

//   if (!movie) {
//     return <p>Movie not found</p>;
//   }

//   return (
//     <div className="movie-details">
//       <img src={movie.image} alt={movie.title} />
//       <h1>{movie.title}</h1>
//       <p>{movie.description}</p>
//       <p>Release Date: {movie.releaseDate}</p>
//     </div>
//   );
// };

// export default MovieDetails;


// import React, { useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MovieContext } from './MovieContext';
// import './MovieDetails.css';

// const MovieDetails = () => {
//   const { id } = useParams(); // Get the movie id from the route
//   const { state } = useContext(MovieContext); // Access movies from context
//   const { movies } = state;
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   // Find the movie with the matching ID
//   const movie = movies.find((movie) => movie.id ==(id));

//   if (!movie) {
//     return <p>Movie not found</p>;
//   }

//   const handleBookTicket = () => {
//     navigate(`/book-ticket/${id}`); // Navigate to the ticket booking page with movie ID
//   };

//   return (
//     <div className="movie-details">
//       <img src={movie.image} alt={movie.title} />
//       <h1>{movie.title}</h1>
//       <p>{movie.description}</p>
//       <p>Release Date: {movie.releaseDate}</p>
//       <button className="book-ticket-button" onClick={handleBookTicket}>
//         Book Ticket
//       </button>
//     </div>
//   );
// };

// export default MovieDetails;



import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from './MovieContext';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie id from the route
  console.log(id,"idddddd");
  
  const { state } = useContext(MovieContext); // Access movies from context
  const { movies } = state;
  const navigate = useNavigate(); // Hook to programmatically navigate
console.log(movies,"abhiii");

  // Find the movie with the matching ID
  const movie = movies.find((movie) => movie._id ==(id));
  // console.log(movie,"abhhh");
  

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const handleBookTicket = () => {
    navigate(`/book-ticket/${id}`); // Navigate to the ticket booking page with movie ID
  };

  return (
    <div className="movie-details">
      <img src={movie.image} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Release Date: {movie.releaseDate}</p>
      <button className="book-ticket-button" onClick={handleBookTicket}>
        Book Ticket
      </button>
    </div>
  );
};

export default MovieDetails;

