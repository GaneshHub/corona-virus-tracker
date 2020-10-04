import React from "react";
import "./App.css";
import Header from "./components/Header";
import AppStats from "./components/AppStats";
import Map from "./components/Map";
import { Card, CardContent } from "@material-ui/core";
import ListByCountry from "./components/ListByCountry";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div className="app">
      <div className="app_left">
        <Header />
        <AppStats />
        <Map/>
      </div>
      <Card className="app_right">
        <CardContent>
          <ListByCountry/>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
