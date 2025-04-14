import React from "react";
import { Spinner } from "@nextui-org/react";

const SpinnerForTables = () => {
    return (
        <div className="w-full h-full bg-background-200 flex justify-around p-5 rounded-lg shadow-md">
            <div className="w-[80%] bg-background-100 flex justify-around rounded-lg shadow-md">
                <Spinner color="current" label="Cargando datos de la tabla" />
            </div>
        </div>
    );
};

export default SpinnerForTables;
