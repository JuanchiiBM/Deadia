"use client"

import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { GETFunction } from '@/utils/globals';

DataTable.use(DT);

interface IDataTable {
    setData: React.Dispatch<React.SetStateAction<any>>
    data: any
}

interface IRegisters {
    type: string
    article: string
    date: string
    amount: string
    ingress: string
}

const DataTableEgresos: React.FC<IDataTable> = ({ setData, data}) => {
    const [tableColumns, setTableColumns] = useState([
        { data: 'type', title: 'Tipo' },
        { data: 'article', title: 'Articulo' },
        { data: 'date', title: 'Fecha' },
        { data: 'amount', title: 'Cantidad' },
        { data: 'ingress', title: 'Monto' }
      ]);
      // USAR TABLE LOADER CUANDO SE CONECTE CON EL BACK const [tableLoader, setTableLoader] = useState(true);
    const initializeDataTable = async () => {
        const jsonData = await GETFunction('egress') as Array<IRegisters>
        const nextTableData = jsonData.map((dato) => ({
            type: dato.type,
            article: dato.article,
            date: dato.date,
            amount: dato.amount,
            ingress: dato.ingress
        }))
        setData(nextTableData)
    }

    useEffect(() => {
        initializeDataTable()
    }, [])
    
    return (
        <DataTable data={data} className='order-column text-sm' columns={tableColumns} options={{
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