import React from 'react'
import { Spinner } from '@nextui-org/react'

const SpinnerForModalTables = () => {
    return (
        <div className="w-full h-[200px] bg-background flex justify-around p-5 rounded-xl shadow-md">
            <div className="w-[80%] bg-background flex justify-around rounded-lg shadow-md">
                <Spinner color="current" label="Cargando datos de la tabla" />
            </div>
        </div>
    )
}

export default SpinnerForModalTables
