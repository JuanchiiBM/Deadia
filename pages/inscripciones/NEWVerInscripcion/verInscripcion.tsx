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

const LineChart = dynamic(
    () => import("@/components/charts/lineChart").then((mod) => mod.LineChart
    ),
    {
        ssr: false,
    }
);

const verInscripcion = () => {
    const [refreshData, setRefreshData] = useState<number>(0)
    const [chartContent, setChartContent] = useState([{}])
    const { dateSelected, dateRef, selectDateRange } = useDatePickerInscription()
    const [valueOption, setValueOption] = useState({
        value: '0',
        type: 'Deps'
    })
    const { url } = useGetUrl({ dateSelected, value: valueOption })
    const { isLoading, jsonData } = useJsonData({ url })

    const contentLineChart = {
        series: [{
            name: 'Alumnito',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Alumnaso',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        colors: ['#7000e4', '#00E396'],
        dates: {
            minDate: new Date('2025-01-01').getTime(),
            maxDate: new Date('2025-01-07').getTime(),
            intervalMin: 1440
        }
    }

    return (
        <ContextView.Provider value={{
            refreshData: refreshData,
            setRefreshData: setRefreshData,
            jsonData: jsonData,
            jsonIsLoading: isLoading,
            chartContent: chartContent,
            setChartContent: setChartContent
        }}>
            <h1 className='text-4xl'>Inscripciones</h1>
            <Chart chartContent={chartContent} />
            <div className='bg-background-200 p-5 rounded-lg my-[25px] shadow-md overflow-hidden'>
                <LineChart content={contentLineChart} />
            </div>
            <Options setValueOption={setValueOption} dateRef={dateRef} selectDateRange={selectDateRange} />
            <TableVerIngreso tableLoader={isLoading} dateRef={dateRef} />
        </ContextView.Provider>
    )
}

export default verInscripcion
