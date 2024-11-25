import React, { createContext, useContext } from "react";

interface IRegisterEgressContext {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>;
    jsonData: any
    jsonIsLoading: boolean
}


export const EgressRegisterContext = createContext<IRegisterEgressContext>({
    refreshData: 2,
    setRefreshData: () => { },
    jsonData: undefined,
    jsonIsLoading: false,
});

export const useEgressRegisterContext = () => {
    return useContext(EgressRegisterContext);
};
