import React from 'react';
import { useState, useRef, useEffect } from "react";
import './App.css';
import AirlineComparison from './components/AirlineComparison';
import AirlineComparisonChartView from './components/AirlineComparisonChartView';
import AirlinesDropdown from './components/MultiSelectDropdown';
import ViewDropdown from './components/SingleSelectDropdown';
import { airlinesOptions , reviewPlatformsOptions , viewOptions} from './utils/dropdownData';
import airlinequality from './utils/airlinequality.json';
import tripadvisor from './utils/tripadvisor.json';
import trustpilot from './utils/trustpilot.json';
import Footer from './components/footer';
import Header from './components/Header';


function App() {

  const dataMap = {
    airlinequality: airlinequality,
    tripadvisor: tripadvisor,
    trustpilot: trustpilot
};

  const [selectedView, setSelectedView] = useState("TABLE VIEW")
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedReviewPlatform, setSelectedReviewPlatform] = useState(reviewPlatformsOptions.length > 0 ? reviewPlatformsOptions[0] : "");
  const [finalReviewData, setFinalReviewData] = useState({})


  useEffect(() => {
    setFinalReviewData(dataMap[selectedReviewPlatform.toLowerCase()])
  }, [selectedReviewPlatform]);

  const convertOptionsToUppercase = (options) => {
     let receivedOptions = options;
      if(receivedOptions.length > 0){
        receivedOptions = receivedOptions.map(option => option.toUpperCase());
      }
      return receivedOptions;
  }

  const getSelectedViewFromDropdown = (selected) => {
    setSelectedView(selected);
  }

  const getSelectedAirlinesFromDropdown = (selected) => {
    setSelectedAirlines(selected);
  }

  const getSelectedReviewPlatformsFromDropdown = (selected) => {
    setSelectedReviewPlatform(selected);
  }

  

  return (
    <div className="App">
      <Header />

      <div style={{ display: "flex", flexDirection:"column", justifyContent:"flex-start", width: "90%", paddingTop:"90px" }}>
        <div className="header">
          <h1>Airlines Ratings Comparison</h1>
          <p>Compare airlines based on ratings, pricing, and user reviews to make informed travel choices.</p>
        </div>

        {/*  <div><script src="https://static.elfsight.com/platform/platform.js" async></script></div>
      <div class="elfsight-app-b5b89602-285a-4bcf-ac59-cfd5f1948d66" data-elfsight-app-lazy></div> */}

      <div style={{  display: "flex", justifyContent:"space-around", alignItems:"flex-start" }}>
        
        {/* Dropdown to select one or more airlines */}
        
        <div style={{display: "flex", justifyContent:"space-around", flexDirection:"column" }}>
            {/* <h2 style={{margin:"1px 0" , color:"#004080", fontSize:"1.3rem"}} >Airlines List</h2> */}
            <AirlinesDropdown options={convertOptionsToUppercase(airlinesOptions)} onSelectionChange={getSelectedAirlinesFromDropdown} />
        </div>  

        {/* Dropdown to select one or more review platforms */}
        <div style={{display: "flex", justifyContent:"space-around", flexDirection:"column" }}>
            {/* <h2 style={{margin:"1px 0" , color:"#004080", fontSize:"1.3rem"}} >Review Platforms</h2> */}
            <ViewDropdown options={convertOptionsToUppercase(reviewPlatformsOptions)} onSelectionChange={getSelectedReviewPlatformsFromDropdown} />
        </div> 

        {/* Dropdown to toggle the table or chart view */}  
        <div>
          <ViewDropdown options={convertOptionsToUppercase(viewOptions)} onSelectionChange={getSelectedViewFromDropdown} />
        </div>

      </div>

      { selectedView === "TABLE VIEW" ? 
          <AirlineComparison 
            selectedAirlines={selectedAirlines}
            selectedReviewPlatform = {selectedReviewPlatform}
            finalReviewData = {finalReviewData}
          /> 
        : 
          <AirlineComparisonChartView/>
      }

      </div>
    
      <Footer/>
      
    </div>
  );
}

export default App;
