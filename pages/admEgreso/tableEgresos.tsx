"use client"

import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { GETFunction } from '@/utils/globals';

DataTable.use(DT);

interface IRegisters {
    type: string
    article: string
    date: string
    amount: string
    ingress: string
}

const DataTableEgresos = () => {
    const [tableData, setTableData] = useState<any>()
    const [tableColumns, setTableColumns] = useState([
        { data: 'type', title: 'Articulo' },
        { data: 'article', title: 'Articulo' },
        { data: 'date', title: 'Fecha' },
        { data: 'amount', title: 'Cantidad' },
        { data: 'ingress', title: 'Monto' }
      ]);

    const initializeDataTable = async () => {
        /*
        const jsonData = await GETFunction('incomeRegister') as Array<IRegisters>
        const nextTableData = jsonData.map((dato) => ({
            dni: dato.article,
            nombre: dato.type,
            mail: dato.date,
            aula: dato.amount,
            curso: dato.ingress
        }))
        setTableData(nextTableData)
        */
    }

    useEffect(() => {
        initializeDataTable()
    }, [])
    
    return (
        <DataTable data={tableData} className='order-column' columns={tableColumns} options={{
            destroy: true,
            responsive: true,
            language: {
                url: '../dataTableLanguaje.json',
            },
        }} >
            <thead>
                <tr>
                    {tableColumns.map((col, index) => (
                        <th className='truncate' key={index}>{col.data}</th>
                    ))}
                </tr>
            </thead>
        </DataTable>
    )
}

export default DataTableEgresos