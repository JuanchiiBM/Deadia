import { ITableDataEgressInside } from "@/helpers/interfaces";
import React, { createContext, useContext } from "react";

interface IRegisterEgressContext {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>
    contentModal: ITableDataEgressInside | undefined
    setContentModal: React.Dispatch<React.SetStateAction<any>>
    update: boolean
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    jsonData: any
    jsonIsLoading: boolean
}


export const EgressRegisterContext = createContext<IRegisterEgressContext>({
    refreshData: 2,
    setRefreshData: () => { },
    contentModal: undefined,
    setContentModal: () => {},
    update: false,
    setUpdate: () => {},
    jsonData: undefined,
    jsonIsLoading: false,
});

export const useEgressRegisterContext = () => {
    return useContext(EgressRegisterContext);
};
