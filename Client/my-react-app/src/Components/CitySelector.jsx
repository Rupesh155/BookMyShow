// import React, { useState } from 'react';
// import './CityOptions.css'; // Import your CSS file for the modal

// const cityOptions = [
//   'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'
//   // Add more cities as needed
// ];

// const CitySelector = ({ show, handleClose, handleCitySelect }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter cities based on search query
//   const filteredCities = cityOptions.filter((city) =>
//     city.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       {show && (
//         <div className="city-modal">
//           <div className="city-modal-content">
//             <span className="close" onClick={handleClose}>
//               &times;
//             </span>
//             <h2>Select City</h2>

//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="Search for a city..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="city-list">
//               {filteredCities.length > 0 ? (
//                 filteredCities.map((city) => (
//                   <div
//                     key={city}
//                     className="city-card"
//                     onClick={() => handleCitySelect(city)}
//                 >
//                     {city}
//                   </div>
//                 ))
//               ) : (
//                 <p>No cities found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CitySelector;


// import React, { useState } from 'react';
// import './CityOptions.css'; // Import your CSS file for the modal

// const cityOptions = [
//   'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'
//   // Add more cities as needed
// ];

// const CitySelector = ({ show, handleClose, handleCitySelect }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter cities based on search query
//   const filteredCities = cityOptions.filter((city) =>
//     city.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       {show && (
//         <div className="city-modal">
//           <div className="city-modal-content">
//             <span className="close" onClick={handleClose}>
//               &times;
//             </span>
//             <h2>Select City</h2>

//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="Search for a city..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="city-list">
//               {filteredCities.length > 0 ? (
//                 filteredCities.map((city) => (
//                   <div
//                     key={city}
//                     className="city-card"
//                     onClick={() => handleCitySelect(city)}
//                   >
//                     {city}
//                   </div>
//                 ))
//               ) : (
//                 <p>No cities found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CitySelector;


// import React, { useState, useContext } from 'react';
// import { MovieContext } from './MovieContext'; // Import the context
// import './CityOptions.css'; // Import your CSS file for the modal

// const CitySelector = ({ show, handleClose, handleCitySelect }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Get movies from MovieContext
//   const { state } = useContext(MovieContext);
//   const { movies } = state;

//   // Extract unique cities from the movie locations
//   const cityOptions = [
//     ...new Set(
//       movies
//         .flatMap((movie) => movie.locations.map((location) => location.city))
//     ),
//   ];

//   // Filter cities based on search query
//   const filteredCities = cityOptions.filter((city) =>
//     city.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       {show && (
//         <div className="city-modal">
//           <div className="city-modal-content">
//             <span className="close" onClick={handleClose}>
//               &times;
//             </span>
//             <h2>Select City</h2>

//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="Search for a city..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="city-list">
//               {filteredCities.length > 0 ? (
//                 filteredCities.map((city) => (
//                   <div
//                     key={city}
//                     className="city-card"
//                     onClick={() => handleCitySelect(city)}
//                   >
//                     {city}
//                   </div>
//                 ))
//               ) : (
//                 <p>No cities found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CitySelector;



// import React, { useContext } from 'react';
// import { MovieContext } from './MovieContext';

// const CitySelector = () => {
//   const { state, dispatch } = useContext(MovieContext);
//   const { movies } = state;

//   // Get unique cities from movie locations
//   const cities = Array.from(new Set(movies.flatMap(movie => movie.locations.map(location => location.city))));

//   // Handle city change
//   const handleCityChange = (event) => {
//     dispatch({
//       type: 'SET_SELECTED_CITY',
//       payload: event.target.value,
//     });
//   };

//   return (
//     <div className="city-select">
//       <label htmlFor="city">Select City:</label>
//       <select id="city" onChange={handleCityChange}>
//         <option value="">--All Cities--</option>
//         {cities.map((city, index) => (
//           <option key={index} value={city}>{city}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default CitySelector;


// import React, { useContext } from 'react';
// import { MovieContext } from './MovieContext';

// const CitySelector = () => {
//   const { state, dispatch } = useContext(MovieContext);
//   const { movies } = state;

//   // Get unique cities from movie locations
//   const cities = Array.from(new Set(movies.flatMap(movie => movie.locations.map(location => location.city))));

//   // Handle city change
//   const handleCityChange = (event) => {
//     dispatch({
//       type: 'SET_SELECTED_CITY',
//       payload: event.target.value,
//     });
//   };

//   return (
//     <div className="city-select">
//       <label htmlFor="city">Select City:</label>
//       <select id="city" onChange={handleCityChange}>
//         <option value="">--All Cities--</option>
//         {cities.map((city, index) => (
//           <option key={index} value={city}>{city}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default CitySelector;



import React, { useState, useContext } from 'react';
import { MovieContext } from './MovieContext'; // Import the context
import './CityOptions.css'; // Import your CSS file for the modal

const CitySelector = ({ show, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get movies from MovieContext
  const { state, dispatch } = useContext(MovieContext);
  const { movies } = state;

  // Extract unique cities from movie locations
  const cityOptions = [
    ...new Set(
      movies
        .flatMap((movie) => movie.locations.map((location) => location.city))
    ),
  ];

  // Filter cities based on search query
  const filteredCities = cityOptions.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle city selection
  const handleCitySelect = (city) => {
    dispatch({ type: 'SET_SELECTED_CITY', payload: city });
    handleClose(); // Close the modal after selection
  };

  return (
    <>
      {show && (
        <div className="city-modal">
          <div className="city-modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <h2>Select City</h2>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="city-list">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city}
                    className="city-card"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))
              ) : (
                <p>No cities found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CitySelector;
