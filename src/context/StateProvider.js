import React, {useContext, useReducer, createContext} from "react";

export const stateContext = createContext();
//warap our app and provides the data layer
export const StateProvider = ({reducer, initialState, children}) =>(
    <stateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </stateContext.Provider>
    );
    
    //pull info from data layer
    export const useStateValue = () => useContext(stateContext);