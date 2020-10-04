import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";

const InfoBox = ({ title, cases, total, ...props }) => {
  return (
    <div
      className={`infobox ${props.active && `infobox_selected_${props.type}`}`}
    >
      <Card onClick={props.onClick}>
        <CardContent>
          <Typography className="infobox_total" color="textSecondary">
            <strong>{title}</strong>
          </Typography>
          <Typography variant="h4" className={`infobox_${props.type}`}>
            <CountUp start={0} end={cases || 0} duration={2.75} decimal=","separator="," />
          </Typography>
         
          <Typography className="infobox_total" color="textSecondary">
            <strong>{total} Total</strong>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
