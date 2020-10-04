export const initialState = {
  selectedCountry: "worldwide",
  countryList: [],
  casesType: 'cases'
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COUNTRY":
      return {
        ...state,
        selectedCountry: action.payload.country
      };
    case "GET_COUNTRY_LIST":
      return {
        ...state,
        countryList: action.payload.data
      };
      case "SET_CASES_TYPE":
      return {
        ...state,
        casesType: action.payload.casesType
      };
    default:
      return state;
  }
};
