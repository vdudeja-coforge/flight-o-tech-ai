import React from 'react';
import { useState, useRef, useEffect } from "react";
import './App.css';
import AirlineComparison from './components/AirlineComparison';
import AirlineComparisonChartView from './components/AirlineComparisonChartView';
import AirlinesDropdown from './components/MultiSelectDropdown';
import ReviewPlatformsDropdown from './components/MultiSelectDropdown';
import ViewDropdown from './components/SingleSelectDropdown';
import { airlinesOptions , reviewPlatformsOptions , viewOptions} from './utils/dropdownData';

function App() {

  const [selectedView, setSelectedView] = useState("TABLE VIEW")
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedReviewPlatforms, setSelectedReviewPlatforms] = useState([]);

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
    setSelectedReviewPlatforms(selected);
  }

  return (
    <div className="App" style={{ display: "flex", flexDirection:"column", justifyContent:"flex-start" }}>


      <div className="header">
        <h1>Airlines Reviews Comparison</h1>
        <p>Compare airlines based on ratings, pricing, and user reviews to make informed travel choices.</p>
      </div>

      <div style={{ paddingBottom:"20px", width:"80%", display: "flex", justifyContent:"space-around" }}>
        
        {/* Dropdown to select one or more airlines */}
        <div style={{display: "flex", justifyContent:"space-around" }}>
            <AirlinesDropdown options={convertOptionsToUppercase(airlinesOptions)} onSelectionChange={getSelectedAirlinesFromDropdown} />
        </div>  

        {/* Dropdown to select one or more review platforms */}
        <div style={{display: "flex", justifyContent:"space-around" }}>
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
            selectedReviewPlatforms = {selectedReviewPlatforms}
          /> 
        : 
          <AirlineComparisonChartView/>
      }
      
    </div>
  );
}

export default App;
