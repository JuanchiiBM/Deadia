"use client"

import React from 'react'
import DataTable from 'datatables.net-react';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { useDT } from '@/hooks/sistema/usuarios/useDT';
import { useContextRegister } from '@/hooks/useContextRegister';
import { useDTA } from '@/hooks/sistema/usuarios/useDTA';

DataTable.use(DT);

interface ITableData {
    onOpen: () => void,
}

const TableData: React.FC<ITableData> = ({ onOpen}) => {
    const { jsonIsLoading, setContentModal } = useContextRegister()
    const { tableData, columns } = useDT()
    const {} = useDTA({ tableData, setContentModal, onOpen})

    return (
        <div className='w-[75%] bg-background-200 rounded-lg'>
            {jsonIsLoading == true ?
                <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columns} options={{
                    destroy: true,
                     
                    order: [[0, 'desc']],
                    columnDefs: [
                        { "width": "5%", "targets": 0 },
                        { "width": "20%", "targets": 1 },
                        { "width": "20%", "targets": 2 },
                        { "width": "20%", "targets": 3 },
                        { "width": "20%", "targets": 4 },
                        { "width": "5%", "targets": 5 },
                        { "width": "10%", "targets": 6 },
                    ],
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
            }
        </div>
    )
}

export default TableData