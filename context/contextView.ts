import React, { createContext, useContext } from "react";

interface IContextView {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>;
    jsonData: any
    jsonIsLoading: boolean
    chartContent: any
    setChartContent: any
}


export const ContextView = createContext<IContextView>({
    refreshData: 2,
    setRefreshData: () => { },
    jsonData: undefined,
    jsonIsLoading: false,
    chartContent: undefined,
    setChartContent: undefined
});

export const useContextView = () => {
    return useContext(ContextView);
};
