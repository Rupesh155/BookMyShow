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
      expiresAt:expiresAt.toString(),
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

    const otpRecord =       await Otp.findOne({ otp });

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


let movieData = [
  {
      name: 'Vicky Aur Vidya',
      thumbnail: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny8xMCAgMjkuNEsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00395211-skkujsczwy-portrait.jpg',
      cover: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny8xMCAgMjkuNEsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00395211-skkujsczwy-portrait.jpg',
      type: 'Comedy/Drama/Period',
      about: 'Set in a quaint village, Vicky and Vidya find themselves entangled in a chaotic series of events when an unexpected video leaks. Hilarity ensues as they attempt to control the chaos and save their reputations.',
      language: 'Hindi',
      time: '2h 12m',
      date: '11 Oct 2022',
      votes: '7/10 (25.7k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rajkummar-rao-1043890-20-12-2017-03-34-28.jpg', act_name: 'Rajkumar Rao' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tripti-dimri-1093177-01-06-2018-03-16-40.jpg', act_name: 'Tripti Dimri' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/vijay-raaz-2465-04-07-2018-12-40-58.jpg', act_name: 'Vijay Raz' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/mallika-sherawat-1335-24-03-2017-17-58-54.jpg', act_name: 'Mallika Sherawat' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/mast-ali-1412-1669786645.jpg', act_name: 'Mast Ali' },

      ]
  },
  {
      name: 'Bhool Bhulaiyaa 3',
      thumbnail: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-NzA1LjZLIExpa2Vz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00353996-qhqgafrfxu-portrait.jpg',
      cover: 'https://english.mathrubhumi.com/image/contentid/policy:1.9972752:1728471991/GZbyQR5asAETEKa.jfif?$p=7f870bb&f=16x10&w=852&q=0.8',
      type: 'Comedy/Horror',
      about: 'A young man faces supernatural occurrences in an old mansion as secrets from the past unravel. With humor and horror intertwined, he navigates ghostly apparitions and a mysterious curse to solve an age-old mystery.',
      language: 'Hindi',
      time: '2h 12m',
      date: '11 Nov 2019',
      votes: '7/10 (25.7k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kartik-aaryan-1045198-1685968467.jpg', act_name: 'Kartik Aryan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/vidya-balan-2457-14-09-2017-12-33-54.jpg', act_name: 'Vidya Balan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tripti-dimri-1093177-01-06-2018-03-16-40.jpg', act_name: 'Tripti Dimri' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/madhuri-dixit-1318-29-09-2016-01-48-46.jpg', act_name: 'Madhuri Dixit' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rajpal-yadav-1802-24-03-2017-12-33-13.jpg', act_name: 'Rajpal Yadav' }
      ]
  },
  {
      name: 'Venom: The Last Dance',
      thumbnail: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC8xMCAgNDQuMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00383474-meegdfjgax-portrait.jpg',
      cover: 'https://i.ytimg.com/vi/LIVg_UAfN0g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC-lWOay0TZ_ebJtd6hZ_Lzu_QFWA',
      type: 'Sci-Fi/Thriller',
      about: 'A skilled thief, who can infiltrate people’s dreams and steal secrets from their subconscious, is given a chance to have his past crimes forgiven. His mission: plant an idea in someone’s mind, but the task proves riskier than expected.',
      language: 'English',
      time: '2h 28m',
      date: '16 Jul 2010',
      votes: '8.8/10 (2.1M Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tom-hardy-8994-24-03-2017-12-37-04.jpg', act_name: 'Leonardo DiCaprio' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/juno-temple-15557-24-03-2017-15-54-53.jpg', act_name: 'Juno Gordon-Levitt' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rhys-ifans-24003-24-03-2017-14-00-02.jpg', act_name: 'Ellen Page' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/chiwetel-ejiofor-3505-24-03-2017-15-46-20.jpg', act_name: 'Tom Hardy' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/peggy-lu-2037675-1717458960.jpg', act_name: 'Tom Hardy' }
      ]
  },
  {
      name: '3 Idiots',
      thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/3-idiots-et00001611-1696834910.jpg',
      cover: 'https://i.ytimg.com/vi/is4ZkFNLnnk/maxresdefault.jpg',
      type: 'Comedy/Drama',
      about: 'Three college friends navigate the pressures of India’s intense education system while pursuing their dreams. Along the way, they redefine success, confront their fears, and learn invaluable life lessons in this comedic yet thought-provoking film.',
      language: 'Hindi',
      time: '2h 51m',
      date: '25 Dec 2009',
      votes: '8.4/10 (366k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aamir-khan-42-20-12-2017-04-51-55.jpg', act_name: 'Aamir Khan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/r-madhavan-6790-1657260233.jpg', act_name: 'R. Madhavan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sharman-joshi-2113-1710756117.jpg', act_name: 'Sharman Joshi' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kareena-kapoor-khan-1151-26-07-2018-11-14-31.jpg', act_name: 'Kareena Kapoor' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/boman-irani-339-24-11-2017-07-48-52.jpg', act_name: 'Boman Irani' },
      ]
  },
  {
      name: 'The Dark Knight',
      thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/the-dark-knight-et00001549-17-03-2021-06-39-49.jpg',
      cover: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/09/the-dark-knight-poster-joker-harvey-two-face.jpg',
      type: 'Action/Crime/Drama',
      about: 'In Gotham City, Batman faces his greatest adversary, the Joker, who seeks to plunge the city into anarchy. With intense action and complex characters, the story explores the thin line between heroism and chaos.',
      language: 'English',
      time: '2h 32m',
      date: '18 Jul 2008',
      votes: '9.0/10 (2.7M Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/christian-bale-440-24-03-2017-12-31-22.jpg', act_name: 'Christian Bale' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/heath-ledger-805-08-07-2020-02-43-56.jpg', act_name: 'Heath Ledger' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aaron-eckhart-2754-1667969179.jpg', act_name: 'Aaron Eckhart' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/maggie-gyllenhaal-1321-24-03-2017-17-32-17.jpg', act_name: 'Maggie Gyllenhaal' }
      ]
  },
  {
      name: 'Dangal',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg',
      cover: 'https://i.ytimg.com/vi/x_7YlGv9u1g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAHHaAuxANTlzzY1eiV11Q-rha2JA',
      type: 'Biography/Drama/Sport',
      about: 'Based on a true story, this inspiring drama follows a father’s dream to make his daughters world-class wrestlers. Despite societal barriers, they rise against all odds to achieve fame and national pride.',
      language: 'Hindi',
      time: '2h 41m',
      date: '23 Dec 2016',
      votes: '8.3/10 (192k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aamir-khan-42-20-12-2017-04-51-55.jpg', act_name: 'Aamir Khan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/fatima-sana-shaikh-1057789-11-01-2021-05-20-38.jpg', act_name: 'Fatima Sana Shaikh' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sanya-malhotra-1057788-19-09-2018-12-19-26.jpg', act_name: 'Sanya Malhotra' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sakshi-tanwar-38113-24-03-2017-13-47-41.jpg', act_name: 'Sakshi Tanwar' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/zaira-wasim-1077008-26-12-2016-11-40-17.jpg', act_name: 'Zaira Wasim' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aparshakti-khurana-1077032-1705845871.jpg', act_name: 'Aparshakti Khurana' },
      ]
  },
  {
      name: 'Martin',
      thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/martin-et00328827-1677137256.jpg',
      cover: 'https://i.ytimg.com/vi/459AVFyzXps/maxresdefault.jpg',
      type: 'Action/Drama',
      about: 'An intense story of grit and resilience as Martin, a soldier, battles personal and external challenges in the quest to protect his homeland.',
      language: 'Kannada',
      time: '2h 30m',
      date: '2024',
      votes: '8.1/10 (50k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/dhruva-sarja-1072800-10-05-2017-15-07-39.jpg', act_name: 'Dhruva Sarja' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/vaibhavi-shandilya-1047074-24-03-2017-16-11-10.jpg', act_name: 'Vaibhavi Shandilya' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/anveshi-jain-2001372-23-09-2019-02-17-17.jpg', act_name: 'Anveshi Jain ' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nawab-shah-1048518-02-12-2019-03-29-52.jpg', act_name: 'Nawab Shah' },
      ]
  },
  {
      name: 'KGF Cheper-2',
      thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg',
      cover: 'https://i.ytimg.com/vi/ppiybaxojUw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLASQw7-ODKhmrjWw_vh6QS3hlVLSg',
      type: 'Action/Drama/Thriller',
      about: 'The journey of Rocky, an ambitious young man, who rises from poverty to become the ruler of Kolar Gold Fields.',
      language: 'Kannada',
      time: '2h 48m',
      date: '21 Dec 2018',
      votes: '8.4/10 (150k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/yash-2537-1649749519.jpg', act_name: 'Yash' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/yash-2537-1649749519.jpg', act_name: 'Srinidhi Shetty' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg', act_name: 'Ravina Tandon' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg', act_name: 'Sanjay Datt ' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prakash-raj-1713-1653648505.jpg', act_name: 'Prakash Raj ' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/anant-nag-2942-1660823702.jpg', act_name: 'Anant Nag' }
      ]
  },
  {
      name: 'Spider Man 2',
      thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/spider-man-et00300238-25-01-2021-04-28-37.jpg',
      cover: 'https://image.api.playstation.com/vulcan/ap/rnd/202009/3021/5ayReKkz8RaBVuTvrxgA3rvh.png',
      type: 'Action/Adventure/Sci-Fi',
      about: 'Peter Parker gains superpowers and battles villains in New York City while managing his responsibilities as a young adult.',
      language: 'English',
      time: '2h 1m',
      date: '3 May 2002',
      votes: '7.3/10 (500k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tobey-maguire-2379-24-03-2017-17-29-53.jpg', act_name: 'Tobey Maguire' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kirsten-dunst-1213-1711619964.jpg', act_name: 'Kirsten Dunst' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/willem-dafoe-2526-1659523287.jpg', act_name: 'Willem Dafoe' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/james-franco-906-24-03-2017-13-58-27.jpg', act_name: 'James Franco' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/cliff-robertson-iein001721-24-03-2017-12-39-39.jpg', act_name: 'Cliff rebertson' },
      ]
  },
  {
      name: 'Kabhi Khushi Kabhie Gham',
      thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kabhi-khushi-kabhi-gham-et00003004-30-08-2016-03-49-06.jpg',
      cover: 'https://cdn.colorsrishtey.com/wp-content/uploads/2019/09/09064824/Kabhi-Khushi-Kabhie-Gham.jpg',
      type: 'Drama/Family/Romance',
      about: 'An emotional tale of family values, tradition, and love, following a wealthy family dealing with conflicts and reconciliations.',
      language: 'Hindi',
      time: '3h 30m',
      date: '14 Dec 2001',
      votes: '7.4/10 (220k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/shah-rukh-khan-2092-12-09-2017-02-10-43.jpg', act_name: 'Shah Rukh Khan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kajol-1130-20-09-2017-11-31-53.jpg', act_name: 'Kajol' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/hrithik-roshan-833-1705302956.jpg', act_name: 'Hrithik Roshan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/amitabh-bachchan-138-12-09-2017-02-34-37.jpg', act_name: 'Amitabh Bachchan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/jaya-bachchan-949-26-09-2017-04-20-20.jpg', act_name: 'Jaya Bachchan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kareena-kapoor-khan-1151-26-07-2018-11-14-31.jpg', act_name: 'Kareena Kapur' },
      ]
  },
  {
      name: 'Dhoom 3',
      thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/dhoom-3-et00007674-11-11-2020-04-45-27.jpg',
      cover: 'https://m.media-amazon.com/images/M/MV5BYmZlNDAzNTctYzFkZC00Y2VjLWE3MDItNWZkNjI2MmJhMmZmXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg',
      type: 'Action/Thriller',
      about: 'A vengeful young man with a troubled past becomes a master thief, pulling off high-profile heists in Chicago.',
      language: 'Hindi',
      time: '2h 52m',
      date: '20 Dec 2013',
      votes: '5.4/10 (100k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aamir-khan-42-20-12-2017-04-51-55.jpg', act_name: 'Aamir Khan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/katrina-kaif-1171-1664880958.jpg', act_name: 'Katrina Kaif' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/abhishek-bachchan-52-19-09-2017-04-16-54.jpg', act_name: 'Abhishek Bachchan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/uday-chopra-2414-24-01-2017-12-50-21.jpg', act_name: 'Uday Chopra' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/jackie-shroff-882-19-09-2017-05-13-08.jpg', act_name: 'Jackie Shroff' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/andrew-bicknell-iein029642-10-04-2017-16-29-18.jpg', act_name: 'Andriew Bocnell' },
      ]
  },
  {
      name: 'Krish 3',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BMjI0MzU3MTM1Ml5BMl5BanBnXkFtZTgwOTk2MjQ0MDE@._V1_.jpg',
      cover: 'https://i.ytimg.com/vi/0a2wL07yOq8/maxresdefault.jpg',
      type: 'Action/Sci-Fi/Adventure',
      about: 'Krrish, a superhero, must thwart a dangerous villain’s plans, while facing personal challenges and the responsibility of protecting humanity.',
      language: 'Hindi',
      time: '2h 32m',
      date: '1 Nov 2013',
      votes: '5.3/10 (110k Votes)',
      actors: [
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/hrithik-roshan-833-1705302956.jpg', act_name: 'Hrithik Roshan' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/priyanka-chopra-1739-26-08-2016-01-01-58.jpg', act_name: 'Priyanka Chopra' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/vivek-oberoi-2511-19-09-2017-05-19-17.jpg', act_name: 'Vivek Oberoi' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kangana-ranaut-1142-24-03-2017-17-32-38.jpg', act_name: 'Kangna Ranaut' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/arif-zakaria-13551-23-03-2021-01-00-28.jpg', act_name: 'Arif Zakaria' },
          { act_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/naseeruddin-shah-1554-24-03-2017-12-31-15.jpg', act_name: 'Naseeruddin Shah' },
      ]
  }
];


// Route to add dummy movie data
app.post('/add-movies', async (req, res) => {
  try {
    const movies = req.body; // Expecting movie data in the request body
    await Movie.insertMany(movieData);
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
  console.log('Server is running on port 1000');
});



[
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
  },
  {
    "title": "The Dark Knight",
    "description": "Batman faces his greatest nemesis in this thrilling action film.",
    "releaseDate": "2008-07-18",
    "image": "https://images.unsplash.com/photo-1550802992-9d2ff4937387?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
    "locations": [
      {
        "city": "Mumbai",
        "theater": "PVR Cinemas",
        "showtimes": ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2", "B3"]
      },
      {
        "city": "Delhi",
        "theater": "INOX",
        "showtimes": ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2", "B3", "C1"]
      }
    ]
  },
  {
    "title": "The Matrix",
    "description": "A computer hacker learns about the true nature of reality.",
    "releaseDate": "1999-03-31",
    "image": "https://images.unsplash.com/photo-1606395619914-34eae3b149fb?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3",
    "locations": [
      {
        "city": "Delhi",
        "theater": "INOX",
        "showtimes": ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
        "seats": ["A1", "A2", "B1", "B2"]
      },
      {
        "city": "Bangalore",
        "theater": "Cinepolis",
        "showtimes": ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"],
        "seats": ["A1", "A2", "A3", "B1"]
      }
    ]
  },
  {
    "title": "The Godfather",
    "description": "The story of a powerful crime family headed by Don Vito Corleone.",
    "releaseDate": "1972-03-24",
    "image": "https://images.unsplash.com/photo-1581091010841-50725f5d5b9b?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3",
    "locations": [
      {
        "city": "Mumbai",
        "theater": "Cinepolis",
        "showtimes": ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        "seats": ["A1", "A2", "A3", "B1"]
      },
      {
        "city": "Delhi",
        "theater": "PVR Cinemas",
        "showtimes": ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"],
        "seats": ["A1", "A2", "A3", "B1", "C1"]
      }
    ]
  },
  {
    "title": "Gladiator",
    "description": "A betrayed Roman general seeks revenge against the emperor.",
    "releaseDate": "2000-05-05",
    "image": "https://images.unsplash.com/photo-1600805383656-e3ef72e0c9fc?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3",
    "locations": [
      {
        "city": "Delhi",
        "theater": "INOX",
        "showtimes": ["1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
        "seats": ["A1", "A2", "A3", "B1"]
      },
      {
        "city": "Mumbai",
        "theater": "PVR Cinemas",
        "showtimes": ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        "seats": ["A1", "A2", "B1", "C1"]
      }
    ]
  },
  {
    "title": "Titanic",
    "description": "A romance blooms between two passengers on the ill-fated RMS Titanic.",
    "releaseDate": "1997-12-19",
    "image": "https://images.unsplash.com/photo-1548897183-8ffb4f70bfe1?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3",
    "locations": [
      {
        "city": "Mumbai",
        "theater": "PVR Cinemas",
        "showtimes": ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        "seats": ["A1", "A2", "A3", "B1"]
      },
      {
        "city": "Delhi",
        "theater": "INOX",
        "showtimes": ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"],
        "seats": ["A1", "A2", "B1", "C1"]
      }
    ]
  },
  {
    "title": "Avatar",
    "description": "A paraplegic former Marine dispatched to the moon Pandora on a unique mission.",
    "releaseDate": "2009-12-18",
    "image": "https://images.unsplash.com/photo-1603201025637-0d7a6eb4a5ab?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3",
    "locations": [
      {
        "city": "Delhi",
        "theater": "Cinepolis",
        "showtimes": ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
        "seats": ["A1", "A2", "B1", "B2"]
      },
      {
        "city": "Mumbai",
        "theater": "PVR Cinemas",
        "showtimes": ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"],
        "seats": ["A1", "A2", "A3", "B1", "B2"]
      }
    ]
  },
  {
    "title": "Forrest Gump",
    "description": "The life story of a slow-witted but kind-hearted man from Alabama.",
    "releaseDate": "1994-07-06",
    "image": "https://images.unsplash.com/photo-1588433548013-687d7261a63a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3",
    "locations": [
      {
        "city": "Mumbai",
        "theater": "INOX",
        "showtimes": ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"],
        "seats": ["A1", "A2", "B1", "B2"]
      },
      {
        "city": "Delhi",
        "theater": "PVR Cinemas",
        "showtimes": ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"],
        "seats": ["A1", "A2", "A3", "B1"]
      }
    ]
  }
]
