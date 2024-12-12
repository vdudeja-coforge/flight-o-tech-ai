import React from 'react';
import '../styles/AirlineComparison.css';
import planeIcon from '../assets/airplane_1308-28461.png';
import MultiSelectDropdown from './MultiSelectDropdown';
import SingleSelectDropdown from './SingleSelectDropdown';
import { reviewsCategory } from '../utils/reviewsData';
import fullStarIcon from '../assets/star-full-icon.svg';
import halfStarIcon from '../assets/star-half-icon.svg';
import emptyStarIcon from '../assets/star-empty-icon.svg';
import fullstar from '../assets/star-16.png';

const AirlineComparison = ({selectedAirlines,  selectedReviewPlatform, finalReviewData}) => {

  // Function to convert a rating number into stars
function generateStarRating(rating, index) {
  // Ensure the rating is within the 0-5 range
  rating = Math.max(0, Math.min(5, rating));

  let fullStars = Math.floor(rating); // Full stars are the integer part
  let halfStarCount = rating % 1 >= 0.5 ? 1 : 0; // Half star if there's a .5
  let emptyStars = 5 - fullStars - halfStarCount; // Remaining stars are empty
 
  // Create a variable to store the star HTML
  let starRating = [];

  let starColor ;
  
  if(selectedReviewPlatform === "airlinequality" || selectedReviewPlatform === "AIRLINEQUALITY"){
    starColor = "airlinequality-star"
  }

  if(selectedReviewPlatform === "trustpilot" || selectedReviewPlatform === "TRUSTPILOT"){
    starColor = "trustpilot-star"
  }

  if(selectedReviewPlatform === "tripadvisor" || selectedReviewPlatform === "TRIPADVISOR"){
    starColor = "tripadvisor-star"
  }

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    //starRating.push(<img key={`full-${i}`} src={fullStarIcon} alt="Full Star" className='rating-stars tripadvisor-star' />);
    starRating.push(<i className={`icon-star-1 rating-stars ${starColor}`}></i>)
   
  }

  // Add half star
  if (halfStarCount) {
    //starRating.push(<img key="half" src={halfStarIcon} alt="Half Star" className='rating-stars tripadvisor-star'/>);
    starRating.push(<i className={`icon-star-half-alt rating-stars ${starColor}`}></i>)
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    //starRating.push(<img key={`empty-${i}`} src={emptyStarIcon} alt="Empty Star" className='rating-stars tripadvisor-star'/>);
    starRating.push(<i className={`icon-star-empty rating-stars ${starColor}`}></i>)
  }

  return starRating;

}


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
                    (finalReviewData?.reviews.map((eachData, index) =>{
                        if(selectedAirlines && selectedAirlines.length > 0){
                            if(selectedAirlines.includes(eachData.airline.toUpperCase())){
                              //console.log("selectedAirlines", selectedAirlines)
                                return (
                                    <tr key={eachData.airline}>
                                        <td>{eachData.airline.toUpperCase()}</td>
                                        {
                                            reviewsCategory.map((category, index) =>{
                                                return category === "overall" ? <td key={index}>{eachData.categories[category]} <span class="side-number">({eachData.total_reviews})</span> </td> :  <td key={index}>{generateStarRating(eachData.categories[category])}</td>
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
