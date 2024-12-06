import React from 'react';
import '../styles/AirlineComparison.css';
import planeIcon from '../assets/airplane_1308-28461.png';
import MultiSelectDropdown from './MultiSelectDropdown';
import SingleSelectDropdown from './SingleSelectDropdown';
import { reviewsCategory } from '../utils/reviewsData';
import { airlineReviewsData } from '../utils/reviewsData';

const AirlineComparison = ({selectedAirlines,  selectedReviewPlatforms}) => {

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
              <th>AIRLINES</th>
              {reviewsCategory.map((category, index) =>{
                return <th key={index}>{category.toUpperCase()}</th>
              })}
            </tr>
          </thead>
          <tbody>
              {
                // Displaying the data of selected airlines
                (selectedAirlines && selectedAirlines.length > 0) ?
                    (airlineReviewsData.map((eachData) =>{
                        if(selectedAirlines && selectedAirlines.length > 0){
                            if(selectedAirlines.includes(eachData.airline)){
                                return (
                                    <tr key={eachData.airline}>
                                        <td>{eachData.airline}</td>
                                        {
                                            reviewsCategory.map((category, index) =>{
                                                return <td key={index}>{eachData.categories[category]}</td>
                                        })
                                        }  
                                    </tr>        
                                )
                            }
                        }  /* else {
                                
                            TO show the data of all airlines when no airline is selected
                            return (
                                <tr key={eachData.airline}>
                                    <td>{eachData.airline}</td>
                                    {
                                    reviewsCategory.map((category, index) =>{
                                        return <td key={index}>{eachData.categories[category]}</td>
                                    })
                                    }  
                                </tr>        
                            ) 
                   
                        }*/
                    }))
                :               
                  // Displaying a message when no airline is selected 
                  <tr>
                      <td colspan={reviewsCategory?.length > 0 ? reviewsCategory.length + 1 : 3 } style={{paddingTop:"50px", paddingBottom:"50px", textAlign: "center"}}>Select an Airline to start with...</td>
                  </tr>            
        }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AirlineComparison;
