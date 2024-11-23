import React, { createContext, useContext } from "react";

interface IInscriptionContext {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>;
    jsonData: any
}


export const InscriptionContext = createContext<IInscriptionContext>({
    refreshData: 2,
    setRefreshData: () => { },
    jsonData: undefined
});

export const useInscriptionContext = () => {
    return useContext(InscriptionContext);
};
