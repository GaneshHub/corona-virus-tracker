import React, { useEffect, useState } from "react";
import "../css/AppStats.css";
import InfoBox from "./InfoBox";
import { useStateValue } from "../context/StateProvider";
import { prettyPrintStats } from "../Utilities/utils";

const AppStats = () => {
  const [{ selectedCountry,casesType }, dispatch] = useStateValue();
  const [countryInfo, setCountryInfo] = useState({});
  useEffect(() => {
    const url =
      selectedCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    const getStatsData = async () => {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setCountryInfo(data);
        });
    };

    getStatsData();
  }, [selectedCountry]);

  const dispatchCasesType = casesType => {
    dispatch({
      type: "SET_CASES_TYPE",
      payload: { casesType: casesType }
    });
  };

  return (
    <div className="app_stats">
      <InfoBox active= {(casesType === "cases")}
        type="confirmed"
        onClick={() => dispatchCasesType("cases")}
        title="Today Confirmed cases"
       // cases={prettyPrintStats(countryInfo.todayCases)}
        cases={countryInfo.todayCases} 
        total={prettyPrintStats(countryInfo.cases)}
      />
      <InfoBox active= {(casesType === "recovered")}
        type="recovered"
        onClick={() => dispatchCasesType("recovered")}
        title="Today Recovered" 
       // cases={prettyPrintStats(countryInfo.todayRecovered)}
        cases={countryInfo.todayRecovered}
        total={prettyPrintStats(countryInfo.recovered)}
      />
      <InfoBox active= {(casesType === "deaths")}
        type="deaths"
        onClick={() => dispatchCasesType("deaths")}
        title="Today Deaths" 
       // cases={prettyPrintStats(countryInfo.todayDeaths)}
        cases={countryInfo.todayDeaths}
        total={prettyPrintStats(countryInfo.deaths)}
      />
    </div>
  );
};

export default AppStats;
