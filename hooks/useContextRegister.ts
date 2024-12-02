import React, { createContext, useContext } from "react";

interface IContextRegister {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>
    contentModal: any | undefined
    setContentModal: React.Dispatch<React.SetStateAction<any>>
    update: boolean
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    jsonData: any
    jsonIsLoading: boolean
}


export const ContextRegister = createContext<IContextRegister>({
    refreshData: 2,
    setRefreshData: () => { },
    contentModal: undefined,
    setContentModal: () => {},
    update: false,
    setUpdate: () => {},
    jsonData: undefined,
    jsonIsLoading: false,
});

export const useContextRegister = () => {
    return useContext(ContextRegister);
};
