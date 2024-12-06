// twilioService.js
const twilio = require('twilio');

const accountSid = 'ACdc793fa8d3863de168a371a541ca057a'; // Your Account SID from Twilio Console
const authToken = '563d0988ab1e99f5b8c78de92bc04097';   // Your Auth Token from Twilio Console

const client = new twilio(accountSid, authToken);

const sendOtp = (phoneNumber, otp) => {
  return client.messages.create({
    body: `Your OTP is ${otp}`,  // The message content
    from: '+19514195099', // Your Twilio Phone Number
    to: phoneNumber                // Recipient's Phone Number
  });
};

module.exports = sendOtp;




