import React from 'react';
import '../styles/AirlineComparison.css';
import planeIcon from '../assets/airplane_1308-28461.png';
import MultiSelectDropdown from './MultiSelectDropdown';
import SingleSelectDropdown from './SingleSelectDropdown';

const AirlineComparison = (props) => {

  return (
    <div className="airline-comparison">
      
{/*       <div className="dashboard">
        <div className="ratings-chart">
          <div className="chart-title">
            <h2>Overall Ratings</h2>
            <div className="rating-score">
              <span>50</span>
              <img src={planeIcon} alt="Plane Icon" />
            </div>
          </div>
          <div className="bar-chart">
            <div className="bar" style={{ height: '80%' }}></div>
            <div className="bar" style={{ height: '60%' }}></div>
            <div className="bar" style={{ height: '70%' }}></div>
            <div className="bar" style={{ height: '90%' }}></div>
          </div>
        </div>
        <div className="reviews-section">
          <div className="ratings">
            <h3>Airline Ratings</h3>
            <div className="stars">★★★★★</div>
          </div>
          <div className="reviews">
            <h3>User Reviews</h3>
            <p>What people are saying...</p>
          </div>
          <div className="services">
            <h3>In-Flight Services</h3>
            <div className="stars">★★★★☆</div>
          </div>
        </div>
      </div> */}
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Rating</th>
              <th>Profiles</th>
              <th>Pricing</th>
              <th>Destinations</th>
              <th>Leg Reviews</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Airline A</td>
              <td>★★★★★</td>
              <td>50</td>
              <td>$$$</td>
              <td>Global</td>
              <td>Comfortable</td>
            </tr>
            <tr>
              <td>Airline B</td>
              <td>★★★★☆</td>
              <td>45</td>
              <td>$$</td>
              <td>Domestic</td>
              <td>Spacious</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AirlineComparison;
