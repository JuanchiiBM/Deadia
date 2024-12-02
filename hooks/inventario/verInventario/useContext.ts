import React, { createContext, useContext } from "react";

interface IEgressView {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>;
    jsonData: any
    jsonIsLoading: boolean
    chartContent: any
    setChartContent: any
}


export const EgressView = createContext<IEgressView>({
    refreshData: 2,
    setRefreshData: () => { },
    jsonData: undefined,
    jsonIsLoading: false,
    chartContent: undefined,
    setChartContent: undefined
});

export const useEgressView = () => {
    return useContext(EgressView);
};
