'use client'

import React, { useState } from 'react'
import dynamic from "next/dynamic";
import Options from './options'
import Table from './dataTable';
import { EgressView } from '@/hooks/egresos/verEgreso/useContext';
import { useJsonData } from '@/hooks/useJsonData';
import { useGetUrl } from '@/hooks/egresos/verEgreso/useGetUrl';
import { useDatePicker } from '@/hooks/egresos/verEgreso/useDatePicker';

const Chart = dynamic(
    () => import("@/pages/inventario/verInventario/chart").then((mod) => mod.ChartFinal
    ),
    {
        ssr: false,
    }
);


const verInventario = () => {
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
        <EgressView.Provider value={{
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
        </EgressView.Provider>
    )
}

export default verInventario
