import numeral from "numeral";

export const sortData = (data) =>{
    const sortedData = [...data];
    sortedData.sort((a,b) => (a.cases  > b.cases ? -1 : 1));
    return sortedData;
}

export const prettyPrintStats = (stats) => stats ? `+${numeral(stats).format("0.0a")}` : "+0";

export const findCountryByCode = (countryList,selectedCountry) => {
    const countryIndex = countryList.findIndex(
        country => country.countryInfo.iso2 === selectedCountry
      );
      if (countryIndex >= 0) {
        return countryList[countryIndex];
      }
      return null;
}