import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";  

export const showDataOnMap = (data, casesType) =>(

  data.map(country => (
    <Circle 
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4} 
      color={casesTypeColors[casesType].hex} 
      fillColor={casesTypeColors[casesType].hex} 
      radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
    <Popup>
        <div className="map_info_container">
            <div className="map_info_bgImg" style={{backgroundImage: `url(${ country.countryInfo.flag})`}}>
            </div>
            <div className="map_info_name">{country.country}</div>
            <div className="map_info_confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
            <div className="map_info_recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="map_info_deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>
    </Popup>
    </Circle>
  )));

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgb(204, 16, 52, 0.5)",
    multiplier: 800
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgb(125, 215, 29, 0.5)",
    multiplier: 1200
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgb(251, 68, 67, 0.5)",
    multiplier: 2000
  }
};
