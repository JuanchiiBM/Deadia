'use client'

import React, { useState } from 'react'
import dynamic from "next/dynamic";
import Options from './options'
import TableVerIngreso from './dataTable';

import { InscriptionContext } from '@/hooks/inscripciones/verInscripcion/useInscriptionContext';
import { useJsonData } from '@/hooks/useJsonData';
import { useGetUrl } from '@/hooks/inscripciones/verInscripcion/useGetUrl';
import { useDatePickerInscription } from '@/hooks/inscripciones/verInscripcion/useDatePickerInscription';

const Chart = dynamic(
    () => import("@/pages/inscripciones/verInscripcion2/chart").then((mod) => mod.ChartIngresos
    ),
    {
        ssr: false,
    }
);


const verInscripcion = () => {
    const [refreshData, setRefreshData] = useState<number>(0)
    const { dateSelected, dateRef, selectDateRange } = useDatePickerInscription()
    const [valueOption, setValueOption] = useState('0')
    const { url } = useGetUrl({ dateSelected, value: valueOption})
    const {isLoading, jsonData} = useJsonData({url})

    return (
        <InscriptionContext.Provider value={{
            refreshData: refreshData,
            setRefreshData: setRefreshData,
            jsonData: jsonData
        }}>
            <h1 className='text-4xl'>Inscripciones</h1>
            <Options dateRef={dateRef} selectDateRange={selectDateRange} />
            <TableVerIngreso tableLoader={isLoading} dateRef={dateRef} />
        </InscriptionContext.Provider>
    )
}

export default verInscripcion
