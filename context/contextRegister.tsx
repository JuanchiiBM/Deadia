import React, { createContext, useContext } from "react";

interface IContextRegister {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>
    contentTable: any | undefined
    setContentTable: React.Dispatch<React.SetStateAction<any>>
    update: boolean
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    jsonData: any
    jsonIsLoading: boolean
    dataForm: any
    handleInputChange: (field: any, value: any) => void
}


export const ContextRegister = createContext<IContextRegister>({
    refreshData: 2,
    setRefreshData: () => { },
    contentTable: undefined,
    setContentTable: () => {},
    update: false,
    setUpdate: () => {},
    jsonData: undefined,
    jsonIsLoading: false,
    dataForm: {},
    handleInputChange: () => {}
});

export const useContextRegister = () => {
    return useContext(ContextRegister);
};
