

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



// import React, { useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MovieContext } from './MovieContext';
// import './MovieDetails.css';

// const MovieDetails = () => {
//   const { id } = useParams(); // Get the movie id from the route
//   console.log(id,"idddddd");
  
//   const { state } = useContext(MovieContext); // Access movies from context
//   const { movies } = state;
//   const navigate = useNavigate(); // Hook to programmatically navigate
// console.log(movies,"abhiii");

//   // Find the movie with the matching ID
//   const movie = movies.find((movie) => movie._id ==(id));
//   // console.log(movie,"abhhh");
  

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

import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from './MovieContext';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  console.log(id,"idididdidii");
  
  const { state } = useContext(MovieContext);
  const { movies } = state;
  console.log(movies,"movieee");
  
  const navigate = useNavigate();

  const movie = movies.find((movie) => movie._id === id); // Find the movie by ID

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');

  if (!movie) return <p>Movie not found</p>;

  const availableTheaters = selectedCity
    ? movie.locations.filter(loc => loc.city === selectedCity)
    : [];

  const availableShowtimes = selectedTheater
    ? availableTheaters.find(loc => loc.theater === selectedTheater)?.showtimes || []
    : [];

  const availableSeats = selectedTheater && selectedShowtime
    ? availableTheaters.find(loc => loc.theater === selectedTheater)?.seats || []
    : [];
    // const  handleBookTicket=()=>{
    //   console.log('hello');
      
    // }

  const handleBookTicket = () => {
    console.log('hellloo');
    
    console.log(id,"iddddddd");
    
    navigate(`/book-ticket/${id}`, {
      // state: { selectedCity, selectedTheater, selectedShowtime, availableSeats },
    });
  };

  return (
    <div className="movie-details">
      <img src={movie.image} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Release Date: {movie.releaseDate}</p>

      <div>
        <label>City:</label>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Select City</option>
          {[...new Set(movie.locations.map(loc => loc.city))].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <div>
          <label>Theater:</label>
          <select value={selectedTheater} onChange={(e) => setSelectedTheater(e.target.value)}>
            <option value="">Select Theater</option>
            {availableTheaters.map((loc) => (
              <option key={loc.theater} value={loc.theater}>{loc.theater}</option>
            ))}
          </select>
        </div>
      )}

      {selectedTheater && (
        <div>
          <label>Showtime:</label>
          <select value={selectedShowtime} onChange={(e) => setSelectedShowtime(e.target.value)}>
            <option value="">Select Showtime</option>
            {availableShowtimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      )}

      {selectedShowtime && (
        <div className="seat-selection">
          <h3>Available Seats:</h3>
          <div className="seats">
            {availableSeats.map((seat, index) => (
              <span key={index} className="seat">{seat}</span>
            ))}
          </div>
        </div>
      )}

      <button
        className="book-ticket-button"
        onClick={handleBookTicket}
        // disabled={!selectedCity || !selectedTheater || !selectedShowtime}
      >
        Book Ticket
      </button>
    </div>
  );
};

export default MovieDetails;
