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

// app.listen(5000, () => {
//   console.log('Server is running on port 3000');
// });


const express = require('express');
const mongoose = require('mongoose');
const sendOtp = require('./twillioService'); // Twilio service to send OTP
const Otp = require('./model/otp'); // OTP model
let cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json());

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


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
