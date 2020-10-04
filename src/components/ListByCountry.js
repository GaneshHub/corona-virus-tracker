import React from "react";
import { useStateValue } from "../context/StateProvider";
import "../css/ListByCountry.css";
import { sortData } from "../Utilities/utils";
import numeral from "numeral";

const ListByCountry = () => {
  const [{ countryList }, dispatch] = useStateValue();
  const sortedCountryList = sortData(countryList);
  return (
    <div className="listByCountry">
      <h2>Live Cases By Country</h2>
      <div className="table">
        {sortedCountryList.map(({ country, countryInfo, cases }) => (
          <tr>
            <td>
              <span
                className="list_flag"
                style={{
                  backgroundImage: `url(${countryInfo.flag})`,
                }}
              ></span>
              {country}
            </td>
            <td>
              <strong>{numeral(cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
};

export default ListByCountry;
