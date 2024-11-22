import React, { createContext, useContext } from "react";

interface IUpdateContext {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>;
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}


export const UpdateContext = createContext<IUpdateContext>({
    refreshData: 2,
    setRefreshData: () => { },
    update: false,
    setUpdate: () => { },
});

export const useUpdateContext = () => {
    return useContext(UpdateContext);
};
