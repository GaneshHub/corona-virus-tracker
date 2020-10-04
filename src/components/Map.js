import React, { useState, useEffect } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "../css/Map.css";
import { useStateValue } from "../context/StateProvider";
import { showDataOnMap } from "../Utilities/mapUtils";
import { findCountryByCode } from "../Utilities/utils";

const Map = () => {
  const [center, SetCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, SetZoom] = useState(3);
  const [
    { selectedCountry, countryList, casesType },
    dispatch
  ] = useStateValue();

  useEffect(() => {
    if (selectedCountry !== "worldwide" && countryList.length > 0) {
      const country = findCountryByCode(countryList, selectedCountry);
        SetCenter({
          lat: country.countryInfo.lat,
          lng: country.countryInfo.long
        });
        SetZoom(4);
    } else {
      SetCenter({ lat: 34.80746, lng: -40.4796 });
      SetZoom(2);
    }
  }, [selectedCountry, casesType]);

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Contributors'
        />
        {showDataOnMap(countryList, casesType)}
      </LeafletMap>
    </div>
  );
};

export default Map;
