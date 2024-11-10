// const express = require('express');
// const sendOtp = require('./twillioService'); 
// const app = express();
// app.use(express.json());

// app.post('/send-otp', async (req, res) => {
//   const { phoneNumber } = req.body;


//   const otp = Math.floor(100000 + Math.random() * 900000);

//   try {
//     await sendOtp(phoneNumber, otp);
//     res.status(200).send({ message: 'OTP sent successfully', otp });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to send OTP' });
//   }
// });

// app.listen(1000, () => {
//   console.log('Server is running on port 1000');
// });


const express = require('express');
const mongoose = require('mongoose');
const sendOtp = require('./twillioService'); // Twilio service to send OTP
const Otp = require('./model/otp'); // OTP model
let cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const Movie = require('./model/movies');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/otp', {
});

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber,"hewheh");
  

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set expiration time for the OTP (1 minute from now)
  const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

  try {
    // Send OTP via Twilio
    await sendOtp(phoneNumber, otp);

    // Save OTP and phone number in the database
    const newOtp = new Otp({
      phoneNumber,
      otp,
      expiresAt,
    });
    await newOtp.save();

    res.status(200).send({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to send OTP' });
  }
});
app.post('/verify', async (req, res) => {
  const { otp } = req.body;

  try {

    const otpRecord = await Otp.findOne({ otp });

    if (!otpRecord) {
      return res.status(400).send({ error: 'Invalid OTP' });
    }

    const currentTime = new Date();
    if (currentTime > otpRecord.expiresAt) {
      return res.status(400).send({ error: 'OTP has expired' });
    }


    res.status(200).send({ message: 'OTP verified successfully' });


    await Otp.deleteOne({ _id: otpRecord._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to verify OTP' });
  }
});




// Route to add dummy movie data
app.post('/add-movies', async (req, res) => {
  try {
    const movies = req.body; // Expecting movie data in the request body
    await Movie.insertMany(movies);
    res.status(200).send('Movies added successfully');
  } catch (error) {
    res.status(500).send('Error adding movies: ' + error.message);
  }
});

// Route to get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send('Error fetching movies: ' + error.message);
  }
});




// routes/paymentRoutes.js

const stripe = require('stripe')('sk_test_51Os8E4SEhF2ghQp3hf7N5NJAQn2DceXv7fuYaVIPtkP97tOxwXPbg1Fe9enZfhx4Px5XirD0v7aFrb4iS8SMxHC200z1EES8ji');

app.post('/payment', async (req, res) => {
  const { movieId, theater, time, seats, totalAmount } = req.body;

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `Booking for ${seats.length} seats - ${theater} at ${time}`,
              description: `Movie ID: ${movieId}`,
            },
            unit_amount: totalAmount * 100, // Stripe expects amount in the smallest currency unit (e.g., paise)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    // Send the session ID to the frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: 'Unable to create payment session' });
  }
});






app.listen(8000, () => {
  console.log('Server is running on port 8000');
});




 let movies=  [
  {
    "title": "Inception",
    "description": "A mind-bending thriller by Christopher Nolan.",
    "releaseDate": "2010-07-16",
    "image": "https://images.unsplash.com/photo-1613679074971-91fc27180061?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "locations": [
      {
        "city": "Delhi",
        "theater": "PVR Cinemas",
        "showtimes": ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2", "B3"]
      },
      {
        "city": "Delhi",
        "theater": "INOX",
        "showtimes": ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2", "B3", "C1"]
      },
      {
        "city": "Mumbai",
        "theater": "PVR Cinemas",
        "showtimes": ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2"]
      }
    ]
  },
  {
    "title": "Interstellar",
    "description": "A journey beyond the stars by Christopher Nolan.",
    "releaseDate": "2014-11-07",
    "image": "https://images.unsplash.com/photo-1525463072426-4d65f1df37b2?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "locations": [
      {
        "city": "Mumbai",
        "theater": "Cinepolis",
        "showtimes": ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2", "B3"]
      },
      {
        "city": "Delhi",
        "theater": "PVR Cinemas",
        "showtimes": ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2", "B3"]
      }
    ]
  }
]


const moviesInMumbai = movies
  .map(movie => ({
    // ...movie, 
    locations: movie.locations.filter(location => location.city === "Mumbai") 
  }))


  console.log(JSON.stringify(moviesInMumbai,null,2)); 

