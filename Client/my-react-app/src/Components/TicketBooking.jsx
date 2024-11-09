// import React from 'react';
// import { useParams } from 'react-router-dom';

// const TicketBooking = () => {
//   const { id } = useParams(); // Get the movie id from the route

//   return (
//     <div>
//       <h1>Book Tickets for Movie ID: {id}</h1>
//       {/* Add your ticket booking form or functionality here */}
//     </div>
//   );
// };

// export default TicketBooking;


// import React, { useState } from 'react';
// import './TicketBooking.css'; // Import the CSS for styling

// const TicketBooking = () => {
//   // Dummy data for locations and showtimes
//   const showtimes = [
//     {
//       theater: { id: 1, name: 'PVR Cinemas' },
//       times: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
//     },
//     {
//       theater: { id: 2, name: 'INOX' },
//       times: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
//     },
//     {
//       theater: { id: 3, name: 'Cinepolis' },
//       times: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM'],
//     },
//   ];

//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');

//   // Handle time slot selection
//   const handleTimeSelect = (location, time) => {
//     setSelectedLocation(location);
//     setSelectedTime(time);
//   };

//   // Handle booking (dummy functionality for now)
//   const handleBooking = () => {
//     if (selectedLocation && selectedTime) {
//       alert(`Booking confirmed for Location: ${selectedLocation}, Time: ${selectedTime}`);
//     } else {
//       alert('Please select a location and time slot');
//     }
//   };

//   return (
//     <div className="ticket-booking">
//       <h1>Book Tickets for Your Movie</h1>

//       {/* Showtime Cards */}
//       <div className="showtime-cards">
//         {showtimes.map((showtime) => (
//           <div key={showtime.theater.id} className="showtime-card">
//             <h3>{showtime.theater.name}</h3>
//             <div className="time-slots">
//               {showtime.times.map((time) => (
//                 <button
//                   key={time}
//                   className={`time-slot ${selectedTime === time && selectedLocation === showtime.theater.name ? 'selected' : ''}`}
//                   onClick={() => handleTimeSelect(showtime.theater.name, time)}
//                 >
//                   {time}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Confirm Booking Button */}
//       <button className="book-now-btn" onClick={handleBooking}>
//         Book Now
//       </button>
//     </div>
//   );
// };

// export default TicketBooking;



// import React, { useState } from 'react';
// import './TicketBooking.css'; // Import the CSS for styling

// const TicketBooking = () => {
//   // Dummy data for locations, showtimes, and seats
//   const showtimes = [
//     {
//       theater: { id: 1, name: 'PVR Cinemas' },
//       times: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
//       seats: generateSeats(40), // 40 seats as an example
//     },
//     {
//       theater: { id: 2, name: 'INOX' },
//       times: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
//       seats: generateSeats(50), // 50 seats as an example
//     },
//     {
//       theater: { id: 3, name: 'Cinepolis' },
//       times: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM'],
//       seats: generateSeats(60), // 60 seats as an example
//     },
//   ];

//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   // Handle time slot and seat selection
//   const handleTimeSelect = (location, time) => {
//     setSelectedLocation(location);
//     setSelectedTime(time);
//     setSelectedSeats([]); // Reset selected seats
//   };

//   const toggleSeatSelection = (seat) => {
//     setSelectedSeats((prevSeats) =>
//       prevSeats.includes(seat)
//         ? prevSeats.filter((s) => s !== seat) // Deselect seat
//         : [...prevSeats, seat] // Select seat
//     );
//   };

//   const handleBooking = () => {
//     if (selectedLocation && selectedTime && selectedSeats.length > 0) {
//       alert(
//         `Booking confirmed for Location: ${selectedLocation}, Time: ${selectedTime}, Seats: ${selectedSeats.join(
//           ', '
//         )}`
//       );
//     } else {
//       alert('Please select a location, time slot, and seats');
//     }
//   };

//   // Find the current theater's showtime and seats based on selected location and time
//   const currentShow = showtimes.find(
//     (showtime) =>
//       showtime.theater.name === selectedLocation && showtime.times.includes(selectedTime)
//   );

//   return (
//     <div className="ticket-booking">
//       <h1>Book Tickets for Your Movie</h1>

//       {/* Showtime Cards */}
//       <div className="showtime-cards">
//         {showtimes.map((showtime) => (
//           <div key={showtime.theater.id} className="showtime-card">
//             <h3>{showtime.theater.name}</h3>
//             <div className="time-slots">
//               {showtime.times.map((time) => (
//                 <button
//                   key={time}
//                   className={`time-slot ${
//                     selectedTime === time && selectedLocation === showtime.theater.name ? 'selected' : ''
//                   }`}
//                   onClick={() => handleTimeSelect(showtime.theater.name, time)}
//                 >
//                   {time}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Seat Selection */}
//       {currentShow && (
//         <div className="seat-selection">
//           <h2>Select Your Seats</h2>
//           <div className="seat-grid">
//             {currentShow.seats.map((seat) => (
//               <button
//                 key={seat}
//                 className={`seat ${selectedSeats.includes(seat) ? 'selected-seat' : ''}`}
//                 onClick={() => toggleSeatSelection(seat)}
//                 disabled={Math.random() < 0.1} // Randomly disable some seats as already booked (for demo purposes)
//               >
//                 {seat}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Confirm Booking Button */}
//       {selectedLocation && selectedTime && (
//         <button className="book-now-btn" onClick={handleBooking}>
//           Book Now
//         </button>
//       )}
//     </div>
//   );
// };

// // Helper function to generate seats (A1, A2, B1, B2, etc.)
// function generateSeats(numSeats) {
//   const rows = Math.ceil(numSeats / 10);
//   const seats = [];
//   for (let row = 1; row <= rows; row++) {
//     for (let col = 1; col <= 10; col++) {
//       seats.push(String.fromCharCode(64 + row) + col);
//     }
//   }
//   return seats;
// }

// export default TicketBooking;



// import React, { useContext, useState } from 'react';
// import { MovieContext } from './MovieContext';
// import './TicketBooking.css';

// const TicketBooking = () => {
//   const { state } = useContext(MovieContext);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [selectedTheater, setSelectedTheater] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const handleMovieSelect = (movie) => {
//     setSelectedMovie(movie);
//     setSelectedTheater('');
//     setSelectedTime('');
//     setSelectedSeats([]);
//   };

//   const handleTheaterSelect = (location) => {
//     setSelectedTheater(location.theater);
//     setSelectedTime('');
//     setSelectedSeats([]);
//   };

//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//     setSelectedSeats([]);
//   };

//   const toggleSeatSelection = (seat) => {
//     setSelectedSeats((prevSeats) =>
//       prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]
//     );
//   };

//   const handleBooking = () => {
//     if (selectedMovie && selectedTheater && selectedTime && selectedSeats.length > 0) {
//       alert(`Booking confirmed for ${selectedMovie.title} at ${selectedTheater}, Time: ${selectedTime}, Seats: ${selectedSeats.join(', ')}`);
//     } else {
//       alert('Please select a movie, theater, time slot, and seats');
//     }
//   };

//   return (
//     <div className="ticket-booking">
//       <h1>Book Tickets for Your Movie</h1>

//       {/* Movie Selection */}
//       <div className="movie-selection">
//         {state.movies.map((movie) => (
//           <div key={movie._id} className={`movie-card ${selectedMovie?._id === movie._id ? 'selected' : ''}`} onClick={() => handleMovieSelect(movie)}>
//             <img src={movie.image} alt={movie.title} />
//             <h3>{movie.title}</h3>
//             <p>{movie.description}</p>
//             <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>

//       {/* Theater and Showtimes */}
//       {selectedMovie && (
//         <div className="theater-selection">
//           <h2>Select Theater and Showtime for {selectedMovie.title}</h2>
//           {selectedMovie.locations.map((location) => (
//             <div key={location._id} className="theater-card">
//               <h3>{location.theater}</h3>
//               <p>City: {location.city}</p>
//               <div className="time-slots">
//                 {location.showtimes.map((time) => (
//                   <button
//                     key={time}
//                     className={`time-slot ${selectedTheater === location.theater && selectedTime === time ? 'selected' : ''}`}
//                     onClick={() => {
//                       handleTheaterSelect(location);
//                       handleTimeSelect(time);
//                     }}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Seat Selection */}
//       {selectedTheater && selectedTime && (
//         <div className="seat-selection">
//           <h2>Select Your Seats at {selectedTheater}</h2>
//           <div className="seat-grid">
//             {selectedMovie.locations
//               .find((location) => location.theater === selectedTheater)
//               .seats.map((seat) => (
//                 <button
//                   key={seat}
//                   className={`seat ${selectedSeats.includes(seat) ? 'selected-seat' : ''}`}
//                   onClick={() => toggleSeatSelection(seat)}
//                 >
//                   {seat}
//                 </button>
//               ))}
//           </div>
//         </div>
//       )}

//       {/* Confirm Booking Button */}
//       {selectedTheater && selectedTime && selectedSeats.length > 0 && (
//         <button className="book-now-btn" onClick={handleBooking}>
//           Book Now
//         </button>
//       )}
//     </div>
//   );
// };

// export default TicketBooking;




import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from './MovieContext';
import './TicketBooking.css';

const TicketBooking = () => {
  const { state } = useContext(MovieContext);
  const { id } = useParams(); // Get the movie ID from URL parameters
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Find the movie by ID from context state
    const movie = state.movies.find((m) => m._id === id);
    setSelectedMovie(movie);
    setSelectedTheater('');
    setSelectedTime('');
    setSelectedSeats([]);
  }, [id, state.movies]);

  const handleTheaterSelect = (location) => {
    setSelectedTheater(location.theater);
    setSelectedTime('');
    setSelectedSeats([]);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
  };

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]
    );
  };

  const handleBooking = () => {
    if (selectedMovie && selectedTheater && selectedTime && selectedSeats.length > 0) {
      alert(`Booking confirmed for ${selectedMovie.title} at ${selectedTheater}, Time: ${selectedTime}, Seats: ${selectedSeats.join(', ')}`);
    } else {
      alert('Please select a movie, theater, time slot, and seats');
    }
  };

  if (!selectedMovie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="ticket-booking">
      <h1>Book Tickets for {selectedMovie.title}</h1>
      
      {/* Theater and Showtimes */}
      <div className="theater-selection">
        <h2>Select Theater and Showtime</h2>
        {selectedMovie.locations.map((location) => (
          <div key={location._id} className="theater-card">
            <h3>{location.theater}</h3>
            <p>City: {location.city}</p>
            <div className="time-slots">
              {location.showtimes.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${selectedTheater === location.theater && selectedTime === time ? 'selected' : ''}`}
                  onClick={() => {
                    handleTheaterSelect(location);
                    handleTimeSelect(time);
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Seat Selection */}
      {selectedTheater && selectedTime && (
        <div className="seat-selection">
          <h2>Select Your Seats at {selectedTheater}</h2>
          <div className="seat-grid">
            {selectedMovie.locations
              .find((location) => location.theater === selectedTheater)
              .seats.map((seat) => (
                <button
                  key={seat}
                  className={`seat ${selectedSeats.includes(seat) ? 'selected-seat' : ''}`}
                  onClick={() => toggleSeatSelection(seat)}
                >
                  {seat}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Confirm Booking Button */}
      {selectedTheater && selectedTime && selectedSeats.length > 0 && (
        <button className="book-now-btn" onClick={handleBooking}>
          Book Now
        </button>
      )}
    </div>
  );
};

export default TicketBooking;
