"use client"

import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { GETFunctionFake } from '@/utils/globals';
import { useDT } from '@/hooks/egresos/registrarEgreso/useDT';

DataTable.use(DT);

const DataTableEgresos = () => {
    const { tableData, columns } = useDT()

    return (
        <div className='bg-background-200 rounded-lg'>
            <DataTable data={tableData} className='order-column text-sm' columns={columns} options={{
                destroy: true,
                responsive: true,
                language: {
                    url: '../dataTableLanguaje.json',
                },
            }} >
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th className='truncate' key={index}>{col.data}</th>
                        ))}
                    </tr>
                </thead>
            </DataTable>
        </div>
    )
}

export default DataTableEgresos