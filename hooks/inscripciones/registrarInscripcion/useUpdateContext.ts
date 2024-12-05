import React, { createContext, useContext } from "react";

interface IUpdateContext {
    refreshData: number
    setRefreshData: React.Dispatch<React.SetStateAction<number>>;
    contentModal: any
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}


export const UpdateContext = createContext<IUpdateContext>({
    refreshData: 2,
    setRefreshData: () => { },
    contentModal: undefined,
    update: false,
    setUpdate: () => { },
});

export const useUpdateContext = () => {
    return useContext(UpdateContext);
};
