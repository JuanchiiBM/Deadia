'use client'

import React, { useState } from 'react'
import dynamic from "next/dynamic";
import Options from './options'
import Table from './dataTable';
import { ContextView } from '@/context/contextView';
import useJsonData from '@/hooks/useJsonData';
import { useGetUrl } from './hooks/useGetUrl';
import { useDatePicker } from './hooks/useDatePicker';

const Chart = dynamic(
    () => import("@/pages/egresos/verEgreso/chart").then((mod) => mod.ChartFinal
    ),
    {
        ssr: false,
    }
);


const verEgreso = () => {
    const [refreshData, setRefreshData] = useState<number>(0)
    const [chartContent, setChartContent] = useState([{}])
    const { dateSelected, dateRef, selectDateRange } = useDatePicker()
    const [valueOption, setValueOption] = useState({
        value: '0',
        type: 'Categories'
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
            setChartContent: setChartContent
        }}>
            <h1 className='text-4xl'>Egresos</h1>
            <Chart chartContent={chartContent} />
            <Options setValueOption={setValueOption} dateRef={dateRef} selectDateRange={selectDateRange} />
            <Table tableLoader={isLoading} dateRef={dateRef} />
        </ContextView.Provider>
    )
}

export default verEgreso
