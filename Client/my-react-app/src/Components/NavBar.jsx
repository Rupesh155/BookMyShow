// import React, { useState } from 'react';
// import './Navbar.css'; // Import CSS for styling
// import './Modal.css'; // Import CSS for modal styling

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);

//   const handleSignInClick = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src="/logo.png" alt="BookMyShow" className="logo" />
//         </div>
//         <div className="navbar-middle">
//           <div className="location">
//             <span>Select Location</span>
//             <i className="fas fa-chevron-down"></i>
//           </div>
//           <div className="search-bar">
//             <input type="text" placeholder="Search for Movies, Events, Plays, Sports and Activities" />
//             <button type="submit"><i className="fas fa-search"></i></button>
//           </div>
//         </div>
//         <div className="navbar-right">
//           <button className="sign-in" onClick={handleSignInClick}>Sign In</button>
//           <div className="profile">
//             <i className="fas fa-user"></i>
//           </div>
//         </div>
//       </nav>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>&times;</span>
//             <h2>Sign In</h2>
//             <form>
//   <label>
//     Phone Number:
//     <input type="number" required placeholder="Enter your phone number" />
//   </label>

//   <button type="submit">Login</button>
//   <div className="google-login">
//     <button type="button" className="google-btn">
//       Continue with Google
//     </button>
//   </div>
// </form>

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

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(''); // State to hold phone number
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent

  // Function to handle opening modal
  const handleSignInClick = () => {
    setShowModal(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setOtpSent(false); // Reset OTP status on modal close
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('Phone number is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/send-otp', {
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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo.png" alt="BookMyShow" className="logo" />
        </div>
        <div className="navbar-middle">
          <div className="location">
            <span>Select Location</span>
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
            Sign In
          </button>
          <div className="profile">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Sign In</h2>
            {!otpSent ? (
              <form onSubmit={handleSubmit}>
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
              <p>OTP has been sent to your phone number.</p>
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

