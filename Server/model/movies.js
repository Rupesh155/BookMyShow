const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  locations: [
    {
      city: {
        type: String, // City where the theater is located
        required: true,
      },
      theater: {
        type: String, // Name of the theater
        required: true,
      },
      showtimes: {
        type: [String], // Array of showtimes
        required: true,
      },
      seats: {
        type: [String], // Array of seat labels available in the theater
        required: true,
      },
    },
  ],
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
