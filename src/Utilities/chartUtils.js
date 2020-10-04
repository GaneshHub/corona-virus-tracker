import numeral from "numeral";

export const buildChartData = (data, casesType) => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

export const getBorderColorByCasesType = casesType => {
  return casesType === "recovered"
    ? "#7dd71d"
    : casesType === "deaths"
    ? "#fb4443"
    : "#cc1034";
};

export const getBackgroundColorByCasesType = casesType => {
  return casesType === "recovered"
    ? "rgb(125, 215, 29, 0.5)"
    : casesType === "deaths"
    ? "rgb(251, 68, 67, 0.5)"
    : "rgba(204, 16, 52, 0.5)";
};

export const getCountryGraph = (countryList,selectedCountry) => {
  const countryIndex = countryList.findIndex(
      country => country.countryInfo.iso2 === selectedCountry
    );
    if (countryIndex >= 0) {
      return countryList[countryIndex].countryInfo.flag;
    }
    return null;
}

export const getLineChartOptions = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRation: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function(tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      }
    }
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll"
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          callback: function(value, index, values) {
            return numeral(value).format("0a");
          }
        }
      }
    ]
  }
};
