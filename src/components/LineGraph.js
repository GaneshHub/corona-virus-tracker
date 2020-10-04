import React, { useState, useEffect } from "react";
import "../css/LineGraph.css";
import { Line } from "react-chartjs-2";
import {
  buildChartData,
  getLineChartOptions,
  getBorderColorByCasesType,
  getBackgroundColorByCasesType,
  getCountryGraph
} from "../Utilities/chartUtils";
import { useStateValue } from "../context/StateProvider";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./Alert";

const LineGraph = () => {
  const [{ casesType, selectedCountry, countryList }, dispatch] = useStateValue();
  const [data, setData] = useState([]);
  const [bgColor, setBgColor] = useState("rgba(204, 16, 52, 0.5)");
  const [brdrColor, setBrdrColor] = useState("#cc1034");
  const [error, setError] = useState(null);
  const [countryName, setCountryName] = useState("Worldwide");
  const [countryGraph, setCountryGraph]= useState(null);

  useEffect(() => {
    const getHistory = async () => {
      const url =
        selectedCountry === "worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all"
          : `https://disease.sh/v3/covid-19/historical/${selectedCountry}`;
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            setError(data.message);
            setData([]);
            setCountryName("");
            setCountryGraph(null);
          } else {
            //setError(null);
            const dataToBulid =
              selectedCountry === "worldwide" ? data : data.timeline;
            const chartData = buildChartData(dataToBulid, casesType);
            if (data.country) {
              setCountryName(data.country);
              setCountryGraph(getCountryGraph(countryList, selectedCountry));
            } else {
              setCountryName("Worldwide");
              setCountryGraph("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGX5s8pTPV7kdLDG4nSCdExAqSiRz096P0AQ&usqp=CAU");
            }
            setData(chartData);
            setBgColor(getBackgroundColorByCasesType(casesType));
            setBrdrColor(getBorderColorByCasesType(casesType));
          }
        });
    };
    getHistory();
  }, [casesType, selectedCountry]);

  const handleAlertClose = event => setError(null);

  return (
    <div className="graph_container">
    <div>
   {countryGraph && (<span
          className="graph_flag"
          style={{
            backgroundImage: `url(${countryGraph})`
          }}
        ></span>)} 
     <span className="fixed_header"> <h2>{countryName} COVID-19 {casesType === "cases" ? "confirmed" : casesType}{" "}Stats</h2></span>
    </div>
  
      <Snackbar
        open={error != null}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity="error" onClose={handleAlertClose}>
          {error}
        </Alert>
      </Snackbar>
      {data.length > 0 && (
        <div className="lineGraph">
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: bgColor,
                  borderColor: brdrColor,
                  data: data
                }
              ]
            }}
            options={getLineChartOptions}
          ></Line>
        </div>
      )}
    </div>
  );
};

export default LineGraph;
