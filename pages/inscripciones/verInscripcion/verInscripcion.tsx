'use client'

import React, { useState } from 'react'
import dynamic from "next/dynamic";
import Options from './options'
import TableVerIngreso from './dataTable';

import { ContextView } from '@/context/contextView';
import useJsonData from '@/hooks/useJsonData';
import { useGetUrl } from './hooks/useGetUrl';
import { useDatePickerInscription } from './hooks/useDatePickerInscription';

const Chart = dynamic(
    () => import("@/pages/inscripciones/verInscripcion/chart").then((mod) => mod.ChartIngresos
    ),
    {
        ssr: false,
    }
);


const verInscripcion = () => {
    const [refreshData, setRefreshData] = useState<number>(0)
    const [chartContent, setChartContent] = useState([{}])
    const [colors, setColors] = useState()
    const { dateSelected, dateRef, selectDateRange } = useDatePickerInscription()
    const [valueOption, setValueOption] = useState({
        value: '0',
        type: 'Deps'
    })
    const { url } = useGetUrl({ dateSelected, value: valueOption})
    const {isLoading, jsonData} = useJsonData({url})

    return (
        <ContextView.Provider value={{
            refreshData: refreshData,
            setRefreshData: setRefreshData,
            jsonData: jsonData,
            jsonIsLoading: isLoading,
            chartContent: chartContent,
            setChartContent: setChartContent,
            setColors: setColors,
            colors: colors
        }}>
            <h1 className='text-4xl'>Inscripciones</h1>
            <Chart chartContent={chartContent} />
            <Options setValueOption={setValueOption} dateRef={dateRef} selectDateRange={selectDateRange} />
            <TableVerIngreso tableLoader={isLoading} dateRef={dateRef} />
        </ContextView.Provider>
    )
}

export default verInscripcion
