import React from 'react';
import { useParams } from 'react-router-dom';

const TicketBooking = () => {
  const { id } = useParams(); // Get the movie id from the route

  return (
    <div>
      <h1>Book Tickets for Movie ID: {id}</h1>
      {/* Add your ticket booking form or functionality here */}
    </div>
  );
};

export default TicketBooking;
