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



import React, { useState } from 'react';
import './TicketBooking.css'; // Import the CSS for styling

const TicketBooking = () => {
  // Dummy data for locations, showtimes, and seats
  const showtimes = [
    {
      theater: { id: 1, name: 'PVR Cinemas' },
      times: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
      seats: generateSeats(40), // 40 seats as an example
    },
    {
      theater: { id: 2, name: 'INOX' },
      times: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
      seats: generateSeats(50), // 50 seats as an example
    },
    {
      theater: { id: 3, name: 'Cinepolis' },
      times: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM'],
      seats: generateSeats(60), // 60 seats as an example
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Handle time slot and seat selection
  const handleTimeSelect = (location, time) => {
    setSelectedLocation(location);
    setSelectedTime(time);
    setSelectedSeats([]); // Reset selected seats
  };

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat) // Deselect seat
        : [...prevSeats, seat] // Select seat
    );
  };

  const handleBooking = () => {
    if (selectedLocation && selectedTime && selectedSeats.length > 0) {
      alert(
        `Booking confirmed for Location: ${selectedLocation}, Time: ${selectedTime}, Seats: ${selectedSeats.join(
          ', '
        )}`
      );
    } else {
      alert('Please select a location, time slot, and seats');
    }
  };

  // Find the current theater's showtime and seats based on selected location and time
  const currentShow = showtimes.find(
    (showtime) =>
      showtime.theater.name === selectedLocation && showtime.times.includes(selectedTime)
  );

  return (
    <div className="ticket-booking">
      <h1>Book Tickets for Your Movie</h1>

      {/* Showtime Cards */}
      <div className="showtime-cards">
        {showtimes.map((showtime) => (
          <div key={showtime.theater.id} className="showtime-card">
            <h3>{showtime.theater.name}</h3>
            <div className="time-slots">
              {showtime.times.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${
                    selectedTime === time && selectedLocation === showtime.theater.name ? 'selected' : ''
                  }`}
                  onClick={() => handleTimeSelect(showtime.theater.name, time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Seat Selection */}
      {currentShow && (
        <div className="seat-selection">
          <h2>Select Your Seats</h2>
          <div className="seat-grid">
            {currentShow.seats.map((seat) => (
              <button
                key={seat}
                className={`seat ${selectedSeats.includes(seat) ? 'selected-seat' : ''}`}
                onClick={() => toggleSeatSelection(seat)}
                disabled={Math.random() < 0.1} // Randomly disable some seats as already booked (for demo purposes)
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Booking Button */}
      {selectedLocation && selectedTime && (
        <button className="book-now-btn" onClick={handleBooking}>
          Book Now
        </button>
      )}
    </div>
  );
};

// Helper function to generate seats (A1, A2, B1, B2, etc.)
function generateSeats(numSeats) {
  const rows = Math.ceil(numSeats / 10);
  const seats = [];
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= 10; col++) {
      seats.push(String.fromCharCode(64 + row) + col);
    }
  }
  return seats;
}

export default TicketBooking;

