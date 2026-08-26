'use client'

import {createContext, useContext, useReducer} from "react";

const initialState = {
    firstName: "Martin",
    email: "martin@mail.com"
}

export const testAction = {
    CHANGE_EMAIL: "CHANGE_EMAIL",
    CHANGE_FIRST_NAME: "CHANGE_FIRST_NAME",
};

const testContext = createContext(initialState);

const testReducer = (state, action) => {
    switch (action.type) {
        case testAction.CHANGE_EMAIL:
            return {...state, email: action.payload};

        case testAction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload};

        default:
            return state;
    }
};

const TestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = {state, dispatch};

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    )
}


const useTestActions = () => {
    const context = useContext(testContext);
    if(context === undefined) {
        throw new Error('testActoins must be used within a TestProvider');
    }
    return context;
}

export{TestProvider, useTestActions};

