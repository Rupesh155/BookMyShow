


// import React, { useState } from 'react';
// import './Navbar.css'; // Import CSS for styling
// import './Modal.css'; // Import CSS for modal styling
// import CitySelector from '../Components/CitySelector'; // Import CitySelector component

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState(''); // State to hold phone number
//   const [error, setError] = useState('');
//   const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
//   const [selectedCity, setSelectedCity] = useState('Select Location'); // For selected city
//   const [showCitySelector, setShowCitySelector] = useState(false); // For city selector modal

//   // Function to handle opening city modal
//   const handleCitySelectClick = () => {
//     setShowCitySelector(true);
//   };

//   // Function to handle closing city modal
//   const handleCloseCitySelector = () => {
//     setShowCitySelector(false);
//   };

//   // Function to handle city selection
//   const handleCitySelect = (city) => {
//     setSelectedCity(city); // Update selected city
//     setShowCitySelector(false); // Close modal after selecting city
//   };

//   // Function to handle opening modal
//   const handleSignInClick = () => {
//     setShowModal(true);
//   };

//   // Function to handle closing modal
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setOtpSent(false); // Reset OTP status on modal close
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!phoneNumber) {
//       setError('Phone number is required.');
//       return;
//     }


//     // AXOIS.POST('LINK',PHONE)

//     try {
//       const response = await fetch('http://localhost:5000/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phoneNumber }), // Sending phone number to backend
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setOtpSent(true); // OTP sent successfully
//         setError(''); // Clear any previous errors
//         console.log('OTP sent successfully');
//       } else {
//         setError(result.error || 'Failed to send OTP');
//       }
//     } catch (error) {
//       setError('Something went wrong. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src="/logo.png" alt="BookMyShow" className="logo" />
//         </div>
//         <div className="navbar-middle">
//           <div className="location" onClick={handleCitySelectClick}>
//             <span>{selectedCity}</span>
//             <i className="fas fa-chevron-down"></i>
//           </div>
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search for Movies, Events, Plays, Sports and Activities"
//             />
//             <button type="submit">
//               <i className="fas fa-search"></i>
//             </button>
//           </div>
//         </div>
//         <div className="navbar-right">
//           <button className="sign-in" onClick={handleSignInClick}>
//             Sign In
//           </button>
//           <div className="profile">
//             <i className="fas fa-user"></i>
//           </div>
//         </div>
//       </nav>

//       {/* City Selector Modal */}
//       <CitySelector
//         show={showCitySelector}
//         handleClose={handleCloseCitySelector}
//         handleCitySelect={handleCitySelect}
//       />

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <h2>Sign In</h2>
//             {!otpSent ? (
//               <form onSubmit={handleSubmit}>
//                 <label>
//                   Phone Number:
//                   <input
//                     type="text"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     required
//                     placeholder="Enter your phone number"
//                   />
//                 </label>
//                 <button type="submit">Send OTP</button>
//                 {error && <p className="error">{error}</p>}
//               </form>
//             ) : (
//               <p>OTP has been sent to your phone number.</p>
//             )}
//             <div className="google-login">
//               <button type="button" className="google-btn">
//                 Continue with Google
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;









import React, { useState } from 'react';
import './Navbar.css'; // Import CSS for styling
import './Modal.css'; // Import CSS for modal styling
import CitySelector from '../Components/CitySelector'; // Import CitySelector component

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(''); // State to hold phone number
  const [otp, setOtp] = useState(''); // State to hold the OTP
  const [error, setError] = useState('');
  let [verified,SetVerified]=useState(false)
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [selectedCity, setSelectedCity] = useState('Select Location'); // For selected city
  const [showCitySelector, setShowCitySelector] = useState(false); // For city selector modal

  // Function to handle opening city modal
  const handleCitySelectClick = () => {
    setShowCitySelector(true);
  };

  // Function to handle closing city modal
  const handleCloseCitySelector = () => {
    setShowCitySelector(false);
  };

  // Function to handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city); // Update selected city
    setShowCitySelector(false); // Close modal after selecting city
  };

  // Function to handle opening modal
  const handleSignInClick = () => {
    setShowModal(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setOtpSent(false); // Reset OTP status on modal close
    setPhoneNumber(''); // Reset phone number
    setOtp(''); // Reset OTP
    setError(''); // Clear error
  };

  // Function to handle form submission for phone number
  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('Phone number is required.');
      return;
    }

    // API request to send OTP
    try {
      const response = await fetch('http://localhost:8000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }), // Sending phone number to backend
      });

      const result = await response.json();

      if (response.ok) {
        setOtpSent(true); // OTP sent successfully
        setError(''); // Clear any previous errors
        console.log('OTP sent successfully');
      } else {
        setError(result.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  // Function to handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('OTP is required.');
      return;
    }

    // API request to verify OTP
    try {
      const response = await fetch('http://localhost:8000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }), // Sending phone number and OTP for verification
      });

      const result = await response.json();

      if (response.ok) {
        SetVerified(true)
        setError(''); // Clear any previous errors
        console.log('OTP verified successfully');
        // You can proceed to log in the user or navigate to the home page
        handleCloseModal(); // Close modal on successful verification
      } else {
        setError(result.error || 'Failed to verify OTP');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo.png" alt="BookMyShow" className="logo" />
        </div>
        <div className="navbar-middle">
          <div className="location" onClick={handleCitySelectClick}>
            <span>{selectedCity}</span>
            <i className="fas fa-chevron-down"></i>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="navbar-right">
          <button className="sign-in" onClick={handleSignInClick}>
        {    verified?' HiiGuest':'Signup'}
          </button>
          <div className="profile">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </nav>

      {/* City Selector Modal */}
      <CitySelector
        show={showCitySelector}
        handleClose={handleCloseCitySelector}
        handleCitySelect={handleCitySelect}
      />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Sign In</h2>

            {!otpSent ? (
              // Phone Number Input Form
              <form onSubmit={handlePhoneNumberSubmit}>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="Enter your phone number"
                  />
                </label>
                <button type="submit">Send OTP</button>
                {error && <p className="error">{error}</p>}
              </form>
            ) : (
              // OTP Input Form
              <form onSubmit={handleOtpSubmit}>
                <label>
                  Enter OTP:
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter the OTP you received"
                  />
                </label>
                <button type="submit">Verify OTP</button>
                {error && <p className="error">{error}</p>}
              </form>
            )}

            <div className="google-login">
              <button type="button" className="google-btn">
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import './Navbar.css'; // Import CSS for styling
// import './Modal.css'; // Import CSS for modal styling
// import CitySelector from '../Components/CitySelector'; // Import CitySelector component
// import 'swiper/swiper-bundle.min.css';


// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// import 'swiper/css'; // Import default Swiper CSS
// import 'swiper/css/navigation'; // If using navigation
// import 'swiper/css/pagination'; // If using pagination

// // Install Swiper modules
// SwiperCore.use([Navigation, Pagination, Autoplay]);

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState(''); // State to hold phone number
//   const [error, setError] = useState('');
//   const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
//   const [selectedCity, setSelectedCity] = useState('Select Location'); // For selected city
//   const [showCitySelector, setShowCitySelector] = useState(false); // For city selector modal

//   const movies = [
//     { title: 'Movie 1', imageUrl: '/images/movie1.jpg' },
//     { title: 'Movie 2', imageUrl: '/images/movie2.jpg' },
//     { title: 'Movie 3', imageUrl: '/images/movie3.jpg' },
//     { title: 'Movie 4', imageUrl: '/images/movie4.jpg' },
//     { title: 'Movie 5', imageUrl: '/images/movie5.jpg' },
//   ];

//   // Functions for City Selector
//   const handleCitySelectClick = () => {
//     setShowCitySelector(true);
//   };

//   const handleCloseCitySelector = () => {
//     setShowCitySelector(false);
//   };

//   const handleCitySelect = (city) => {
//     setSelectedCity(city); 
//     setShowCitySelector(false);
//   };

//   // Functions for Modal (Sign In)
//   const handleSignInClick = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setOtpSent(false); // Reset OTP status on modal close
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!phoneNumber) {
//       setError('Phone number is required.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phoneNumber }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setOtpSent(true);
//         setError('');
//       } else {
//         setError(result.error || 'Failed to send OTP');
//       }
//     } catch (error) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src="/logo.png" alt="BookMyShow" className="logo" />
//         </div>
//         <div className="navbar-middle">
//           <div className="location" onClick={handleCitySelectClick}>
//             <span>{selectedCity}</span>
//             <i className="fas fa-chevron-down"></i>
//           </div>
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search for Movies, Events, Plays, Sports and Activities"
//             />
//             <button type="submit">
//               <i className="fas fa-search"></i>
//             </button>
//           </div>
//         </div>
//         <div className="navbar-right">
//           <button className="sign-in" onClick={handleSignInClick}>
//             Sign In
//           </button>
//           <div className="profile">
//             <i className="fas fa-user"></i>
//           </div>
//         </div>
//       </nav>

//       {/* City Selector Modal */}
//       <CitySelector
//         show={showCitySelector}
//         handleClose={handleCloseCitySelector}
//         handleCitySelect={handleCitySelect}
//       />

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <h2>Sign In</h2>
//             {!otpSent ? (
//               <form onSubmit={handleSubmit}>
//                 <label>
//                   Phone Number:
//                   <input
//                     type="text"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     required
//                     placeholder="Enter your phone number"
//                   />
//                 </label>
//                 <button type="submit">Send OTP</button>
//                 {error && <p className="error">{error}</p>}
//               </form>
//             ) : (
//               <p>OTP has been sent to your phone number.</p>
//             )}
//             <div className="google-login">
//               <button type="button" className="google-btn">
//                 Continue with Google
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Swiper Carousel - Add below the navbar */}
//       <div className="carousel-container">
//         <Swiper
//           spaceBetween={10}
//           slidesPerView={4}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           loop
//         >
//           {movies.map((movie) => (
//             <SwiperSlide key={movie.title}>
//               <div className="movie-card">
//                 <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
//                 <h3>{movie.title}</h3>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </>
//   );
// };

// export default Navbar;




// let arr=[{
//   id:1,
//   name:'nancyyyy'
// },
// {
//   id:2,
//   name:"anuuu"
// }
// ]
// // includes('nancy')
