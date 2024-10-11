import React, { useState } from 'react';
import './CityOptions.css'; // Import your CSS file for the modal

const cityOptions = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'
  // Add more cities as needed
];

const CitySelector = ({ show, handleClose, handleCitySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cities based on search query
  const filteredCities = cityOptions.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
