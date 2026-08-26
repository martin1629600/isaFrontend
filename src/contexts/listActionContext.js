'use client'

import {createContext, useContext, useReducer} from "react";
import listAction from "../core/listAction";

const initialState = {
    type: null,
    row: {},
    reload: false,
}


const listActionContext = createContext();

const listActionReducer = (state, action) => {
    switch (action.type) {

        case listAction.RELOAD:
            return {
                ...state,
                reload: action.payload
            };

        case listAction.UPDATE:
            return {
                ...state,
                type: listAction.UPDATE,
                row: action.payload
            };

        case listAction.DELETE:
            return {
                ...state,
                type: listAction.DELETE,
                row: action.payload
            };

        case listAction.RESET:
            return initialState;

        default:
            return state;
    }
};

const ListActionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(listActionReducer, initialState);

    const value = {state, dispatch};

    return (
        <listActionContext.Provider value={value}>
            {children}
        </listActionContext.Provider>
    )
}


const useListActions = () => {
    const context = useContext(listActionContext);
    if(context === undefined) {
        throw new Error('listActoins must be used within a ListActionProvider');
    }
    return context;
}

export{ ListActionProvider, useListActions};

